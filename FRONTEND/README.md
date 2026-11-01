# Frontend React — Sistema de Ordens de Serviço

Projeto React + Vite preparado especificamente para o `main.py` do backend enviado (FastAPI + MySQL).
Visual inspirado no antigo sistema de funcionários do Desvendando o Código, com o `background.jpg` original fornecido.

## Iniciar

**1. Backend:** mantenha MySQL e FastAPI executando (normalmente em `http://127.0.0.1:8000`).

**2. Frontend:** abra um terminal na pasta `frontend`:

```bash
npm install
npm run dev
```

Acesse o endereço que o Vite mostrar no terminal (normalmente `http://localhost:5173`).

## IMPORTANTE: configurar CORS no backend (para fazer ao vivo)

O projeto não utiliza proxy para esconder o CORS, pois a ideia é ensinar por que precisamos autorizá-lo. Antes da configuração, a requisição a partir do React poderá falhar no navegador. Dentro de `main.py`, coloque o import:

```python
from fastapi.middleware.cors import CORSMiddleware
```

E **depois** de `app = FastAPI(...)`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type"],
)
```

Se o Vite iniciar em outra porta, ajuste o endereço na lista `allow_origins`. O navegador compara protocolo + host + porta.

## Correção necessária no DELETE do backend enviado

Na função `excluir`, a chamada atual é:

```python
cursor.execute("DELETE FROM ordens_servico WHERE id = %s",(id),)
```

Para o PyMySQL receber uma **tupla de um elemento** corretamente, use:

```python
cursor.execute("DELETE FROM ordens_servico WHERE id = %s", (id,))
```

Sem essa correção, o DELETE pode falhar porque `(id)` é só um inteiro entre parênteses, não uma tupla.

## Endpoints utilizados pelo frontend

- `GET /ordens` — carregar listagem
- `POST /ordens` — cadastrar cliente, equipamento, descricao, prioridade
- `PATCH /ordens/{id}/status` — alterar status
- `DELETE /ordens/{id}` — excluir com confirmação

Os campos `status` aceitos pelo backend são: `aberta`, `em_andamento`, `concluida`, `cancelada`.
O React envia exatamente esses valores. A API não possui endpoint para editar os outros campos, então essa função não foi inventada no frontend.

O React inclui busca e filtro locais (sobre os dados já carregados), feedback de erros, responsividade e validação básica por campos obrigatórios.

## URL da API

Padrão: `http://127.0.0.1:8000`. Se mudar a porta da API, copie `.env.example` para `.env` em `frontend` e atualize `VITE_API_URL`. Reinicie o Vite.

## Segurança antes do GitHub

O ZIP original do backend contém uma credencial fixa no `conexao.py`. **Não publique essa credencial**. Mova credenciais para variáveis de ambiente ou mantenha configurações locais fora do Git; rotacione qualquer senha que já tenha sido publicada, se for usada em outro ambiente. Este pacote contém **somente o frontend** e não replica o arquivo de credenciais.

## Sequência didática sugerida

1. Abrir React e observar erro de conexão no navegador, se o CORS ainda estiver ausente.
2. Investigar DevTools -> Console / Network e habilitar CORS no FastAPI.
3. Validar GET e listar ordens do MySQL na tela.
4. Fazer POST pelo formulário; conferir no Swagger e MySQL.
5. Fazer PATCH para alterar status e conferir no banco.
6. Corrigir o DELETE no backend, testar exclusão e atualizar a lista.
