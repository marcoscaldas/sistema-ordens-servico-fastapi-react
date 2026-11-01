# Sistema de Ordens de Serviço — FastAPI + MySQL

Projeto educacional de uma **API REST desenvolvida em Python com FastAPI e MySQL**, para gerenciar ordens de serviço.

O sistema permite cadastrar, consultar, atualizar o status e excluir ordens de serviço, utilizando o **Swagger UI** para testar os endpoints.

Este projeto faz parte da série prática do canal **Desvendando o Código**, em que construímos uma aplicação progressivamente, entendendo o funcionamento de cada etapa antes de adicionar novas funcionalidades.

## Tecnologias utilizadas

- Python
- FastAPI
- MySQL
- PyMySQL
- Pydantic
- Swagger UI
- Uvicorn

## Funcionalidades implementadas

- Cadastro de ordens de serviço
- Listagem de ordens cadastradas
- Consulta de ordem de serviço por ID
- Atualização do status
- Exclusão de ordens de serviço
- Persistência de dados no MySQL
- Validação dos dados de entrada com Pydantic
- Testes dos endpoints com Swagger UI

## Endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/ordens` | Cadastra uma ordem de serviço |
| GET | `/ordens` | Lista as ordens de serviço |
| GET | `/ordens/{id}` | Consulta uma ordem pelo ID |
| PATCH | `/ordens/{id}/status` | Atualiza o status de uma ordem |
| DELETE | `/ordens/{id}` | Exclui uma ordem |

## Estrutura do projeto

```text
sistema-ordens-servico/
├── main.py
├── conexao.py
├── requirements.txt
├── .gitignore
└── README.md
```

**main.py:** definição da aplicação FastAPI, modelos de dados e endpoints.

**conexao.py:** configuração da conexão com o banco MySQL.

**requirements.txt:** dependências Python necessárias para executar o projeto.

## Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/marcoscaldas/sistema-ordens-servico-fastapi-react.git
```



### 2. Crie um ambiente virtual

No Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

No Linux ou macOS:

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Configure o banco MySQL

Crie o banco e a tabela utilizando um cliente MySQL, como o MySQL Workbench:

```sql
CREATE DATABASE IF NOT EXISTS ordens_servico;

USE ordens_servico;

CREATE TABLE IF NOT EXISTS ordens_servico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(100) NOT NULL,
    equipamento VARCHAR(100) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    prioridade VARCHAR(20) NOT NULL DEFAULT 'media',
    status VARCHAR(20) NOT NULL DEFAULT 'aberta',
    data_abertura DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Configure a conexão

O arquivo `conexao.py` é responsável por estabelecer a conexão com o MySQL.

Configure o host, a porta, o usuário, a senha e o nome do banco de acordo com seu ambiente local.

**Importante:** não publique senhas reais ou credenciais de produção no GitHub. Esta versão inicial utiliza uma conexão local simplificada. A configuração por variáveis de ambiente será abordada em uma próxima evolução do projeto.

### 6. Execute a API

```bash
python -m uvicorn main:app --reload
```

Acesse:

- API: http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs
- OpenAPI: http://127.0.0.1:8000/openapi.json

## Exemplo de cadastro

Envie uma requisição POST para `/ordens`:

```json
{
  "cliente": "Carlos Souza",
  "equipamento": "Notebook",
  "descricao": "Equipamento não liga",
  "prioridade": "alta"
}
```

O registro será armazenado no MySQL e poderá ser consultado pelos endpoints GET.

## Próximas evoluções

Este projeto será atualizado progressivamente, incluindo:

- [ ] Frontend com React
- [ ] Integração React com FastAPI
- [ ] Variáveis de ambiente e proteção de credenciais
- [ ] Backup e restauração do MySQL
- [ ] Banco de dados MySQL na nuvem
- [ ] Organização do backend em módulos
- [ ] Validações e regras de negócio adicionais
- [ ] Autenticação e segurança
- [ ] Deploy da aplicação

Cada atualização do projeto será acompanhada de melhorias no código e na documentação.

## Acompanhe o projeto

Este sistema é desenvolvido como material didático do canal **Desvendando o Código**.

Vídeo da implementação inicial:

https://youtube.com/live/Fexno8Mo4bw

Site oficial:

https://desvendandoocodigo.com.br/

## Objetivo educacional

Mais importante do que decorar comandos é compreender o problema, organizar o raciocínio e desenvolver uma solução.

**Programação é processo.**

---

Desenvolvido para fins educacionais pelo **Desvendando o Código®**.