<div align="center">

<h6>TRABALHO FINAL — CONSTRUÇÃO DE FRONTEND & DEVOPS/SRE</h6>

# 📦 StockManager - Sistema de Gestão de Estoque

Aplicação Full Stack para controle de inventário.
Cadastre produtos, acompanhe a listagem em tempo real e conte com uma infraestrutura 100% automatizada com CI/CD e containers.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=20232A)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=white&labelColor=1a1a2e)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat-square&logo=postgresql&logoColor=white&labelColor=1a1a2e)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white&labelColor=1d3557)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white&labelColor=1a1a2e)

### 👥 Equipe

| [Nome Pessoa 1](https://github.com/usuario1) | [Nome Pessoa 2](https://github.com/usuario2) | [Nome Pessoa 3](https://github.com/usuario3) |
|:---:|:---:|:---:|
| Frontend | Backend | DevOps & QA |

</div>

---

## ⚡ Início rápido

A aplicação foi construída visando facilidade de execução através de containers. 

> Precisa de: **Docker** e **Docker Compose** instalados na sua máquina.

```bash
# Clone o repositório
git clone [https://github.com/seu-usuario/stock-manager.git](https://github.com/seu-usuario/stock-manager.git)

# Entre na pasta do projeto
cd stock-manager

# Suba toda a infraestrutura (Frontend, Backend e Banco de Dados)
docker compose up --build

```

✅ **Frontend (React):** Acesse em **http://localhost:5173**
✅ **Backend (API):** Acesse em **http://localhost:3000**
✅ **Healthcheck API:** Acesse em **http://localhost:3000/health**

Para rodar a suíte de testes do Jest:

```bash
cd backend
npm install
npm run test

```

---

## 📁 Estrutura do projeto

O repositório segue uma arquitetura de monorepo, separando as responsabilidades em diretórios específicos:

```text
stock-manager/
│
├── 📂 .github/workflows/       # Pipeline de CI/CD (GitHub Actions)
│   └── ci.yml                  # Rotina de testes, build e lint
│
├── 📂 frontend/                # Aplicação React + Vite
│   ├── 📂 src/
│   │   ├── 📂 components/      # Componentes de interface
│   │   ├── 📂 pages/           # Telas (Início, Cadastro, Listagem)
│   │   └── 📂 services/        # Integração com a API
│   ├── Dockerfile              # Imagem do frontend
│   └── package.json
│
├── 📂 backend/                 # API Node.js + Express
│   ├── 📂 src/
│   │   ├── 📂 controllers/     # Regras de negócio do estoque
│   │   ├── 📂 routes/          # Definição dos endpoints REST
│   │   └── 📂 config/          # Conexão com o banco via .env
│   ├── 📂 tests/               # Testes com Jest e Supertest
│   ├── Dockerfile              # Imagem do backend
│   └── package.json
│
├── 📂 database/                # Scripts do banco de dados
│   └── init.sql                # Criação das tabelas do PostgreSQL
│
├── docker-compose.yml          # Orquestração dos containers e volumes
└── README.md                   # Documentação do projeto

```

---

## 🌿 Padrão de branches

> Cada desenvolvedor cria sua branch de acordo com a **tarefa ou camada** que está construindo.

### Formato

```text
<tipo>/<descricao-curta>

```

### Exemplos práticos

| Branch | O que é |
| --- | --- |
| `feature/tela-cadastro` | Nova tela de cadastro no Frontend |
| `feature/api-produtos` | Novas rotas no Backend |
| `fix/conexao-banco` | Correção no acesso ao PostgreSQL |
| `infra/docker-compose` | Configuração do orquestrador |
| `ci/github-actions` | Criação do workflow de pipeline |

### Como criar sua branch

```bash
# 1. Sempre parta da main atualizada
git checkout main
git pull origin main

# 2. Crie e acesse a nova branch
git checkout -b feature/api-produtos

```

---

## ✅ Padrão de commits

> Mensagens de commit devem ser **curtas, no imperativo e com um prefixo de tipo**.

### Formato

```text
<tipo>: mensagem curta descrevendo o que foi feito

```

### Tipos disponíveis

| Tipo | Quando usar | Exemplo |
| --- | --- | --- |
| `feat` | Nova funcionalidade (telas, rotas, etc) | `feat: cria rota POST /produtos` |
| `fix` | Corrigiu um bug | `fix: resolve falha na ordem dos containers` |
| `style` | Mudança visual sem afetar lógica | `style: ajusta responsividade da tabela` |
| `test` | Adição ou refatoração de testes | `test: adiciona teste para endpoint /health` |
| `chore` | Configurações, infraestrutura e CI | `chore: configura action de deploy` |
| `docs` | Alterou documentação | `docs: adiciona instruções de teste no README` |

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* **[React 18](https://react.dev/) + [Vite**](https://vitejs.dev/): Interface de usuário e bundler.
* **[React Router](https://reactrouter.com/)**: Navegação Single Page Application (SPA).

### Backend & Dados

* **[Node.js](https://nodejs.org/) + [Express**](https://expressjs.com/): Construção da API RESTful.
* **[PostgreSQL](https://www.postgresql.org/)**: Banco de dados relacional persistente.
* **[Jest](https://jestjs.io/) + [Supertest**](https://github.com/ladjs/supertest): Testes automatizados de integração.

### DevOps & Infraestrutura

* **[Docker](https://www.docker.com/) + [Docker Compose**](https://docs.docker.com/compose/): Containerização, rede interna e orquestração.
* **[GitHub Actions](https://github.com/features/actions)**: Automação de CI/CD (Instalação, Testes e Build).

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido para fins acadêmicos.
**Disciplinas de Construção de Frontend e DevOps** · 2026
