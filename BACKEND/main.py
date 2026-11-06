from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from conexao import conectar
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Ordens de Serviço")

app.add_middleware(

    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class Ordem(BaseModel):
    cliente: str
    equipamento: str
    descricao: str
    prioridade: str = "media"

class AtualizacaoStatus(BaseModel):
    status: str

class EdicaoOrdem(Ordem):
    status: str= "aberta"

@app.put("/ordens/{id}")
def editar_ordem(id: int, dados: EdicaoOrdem):
    if dados.status not in {"aberta", "em_andamento", "concluida", "cancelada"}:
        raise HTTPException(status_code=400, detail="Status inválido")
    
    if dados.prioridade not in {"baixa", "media", "alta"}:
        raise HTTPException(status_code=400, detail="Prioridade inválida")
    
    if not all([dados.cliente.strip(), dados.equipamento.strip(), dados.descricao.strip()]):
        raise HTTPException(status_code=400, detail="Preencha todos os campos")
    
    conexao = conectar()
    try:
        with conexao.cursor() as cursor:
            cursor.execute("SELECT id FROM ordens_servico WHERE id = %s", (id,))
            if cursor.fetchone() is None:

                raise HTTPException(status_code=404, detail="Ordem não encontrada")
            
            cursor.execute(
                """UPDATE ordens_servico
                SET cliente = %s, equipamento = %s, descricao = %s,
                        prioridade = %s, status = %s 
                WHERE id = %s""",

                (dados.cliente.strip(), dados.equipamento.strip(), dados.descricao.strip(),
                 dados.prioridade.strip(), dados.status, id),
            )            
        conexao.commit()
        return {"mensagem": "Ordem atualizada"}        
    finally:
        conexao.close()
    

@app.post("/ordens", status_code=201)
def cadastrar(ordem: Ordem):
    conexao = conectar()
    try:
        with conexao.cursor() as cursor:
            cursor.execute(
                """INSERT INTO ordens_servico
                    (cliente, equipamento, descricao, prioridade)
                    VALUES(%s, %s, %s, %s)""",
                (ordem.cliente, ordem.equipamento, ordem.descricao, ordem.prioridade),
            )
            novo_id = cursor.lastrowid
        conexao.commit()
        return {"mensagem": "Ordem cadastrada", "id": novo_id}
    finally:
        conexao.close()



@app.get("/ordens")
def listar():
    conexao = conectar()
    try:
        with conexao.cursor() as cursor:
            cursor.execute("SELECT * FROM ordens_servico ORDER BY id DESC")
            return cursor.fetchall()
    finally:
        conexao.close()


@app.get("/ordens/{id}")
def consultar(id: int):
    conexao = conectar()
    try:
        with conexao.cursor() as cursor:
            cursor.execute("SELECT * FROM ordens_servico WHERE id = %s",(id))
            ordem = cursor.fetchone()
        if ordem is None:
            raise HTTPException(status_code=404, detail="Ordem não encontrada")
        return ordem
    finally:
        conexao.close()


@app.patch("/ordens/{id}/status")
def alterar_status(id: int, dados: AtualizacaoStatus):
    if dados.status not in {"aberta", "em_andamento", "concluida", "cancelada"}:
        raise HTTPException(status_code=400, detail="Status inválido")

    conexao = conectar()
    try:
        with conexao.cursor() as cursor:
            cursor.execute(
                "UPDATE ordens_servico SET status = %s WHERE id = %s",
                (dados.status, id),
            )
            alteradas = cursor.rowcount
        conexao.commit()
        if alteradas == 0:
            raise HTTPException(status_code=404, detail="Ordem não encontrada")
        return {"mensagem": "Status atualizado"}
    finally:
        conexao.close()


@app.delete("/ordens/{id}")
def excluir(id: int):
    conexao = conectar()
    try:
        with conexao.cursor() as cursor:                    
            cursor.execute("DELETE FROM ordens_servico WHERE id = %s",(id,)) 
            excluidas = cursor.rowcount
        conexao.commit()
        if excluidas ==0:
            raise HTTPException(status_code=404, detail="Odem não encontrada")
        return{"mensagem": "Ordem excluída"}
    finally:
        conexao.close()
