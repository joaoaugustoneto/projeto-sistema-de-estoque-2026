<div align="center">

<h6>TRABALHO FINAL — CONSTRUÇÃO DE FRONTEND & DEVOPS/SRE</h6>

# 📦 StockManager

### Sistema de Gestão de Estoque Full Stack

Aplicação completa para controle de inventário com autenticação JWT, CRUD de produtos, interface moderna com design *Glassmorphism* e infraestrutura 100% containerizada com CI/CD automatizado.

<br/>

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=20232A)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=white&labelColor=1a1a2e)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat-square&logo=postgresql&logoColor=white&labelColor=1a1a2e)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white&labelColor=1d3557)
![JWT](https://img.shields.io/badge/Auth-JWT-F7B731?style=flat-square&logo=jsonwebtokens&logoColor=white&labelColor=1a1a2e)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white&labelColor=1a1a2e)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=1a1a2e)

<br/>

### 👥 Equipe de Desenvolvimento

| [André](https://github.com/zsilly) | [Guilherme Miranda](https://github.com/Huzume) | [João Augusto](https://github.com/joaoaugustoneto) |
|:---:|:---:|:---:|
| 🎨 **Frontend Lead** | ⚙️ **Backend** | 🚀 **DevOps & SRE** |
| React · UI/UX · Componentização | Node.js · API REST · JWT · Testes | Docker · CI/CD · Infraestrutura |

> 💡 **Responsabilidade Compartilhada:** Todo o time contribui com o Frontend. André lidera essa frente como principal responsável.

</div>

---

## ✨ Funcionalidades

- 🔐 **Autenticação completa** — Cadastro e Login com hash `bcrypt` e tokens `JWT`
- 🛡️ **Rotas protegidas** — Todas as operações de inventário exigem autenticação
- 📦 **CRUD de Produtos** — Criar, listar, editar e excluir produtos do estoque
- 🎨 **UI Premium** — Design *Glassmorphism* em Dark Mode com animações fluidas
- 📱 **Responsivo** — Interface adaptada para desktop e mobile
- 🧪 **Testes Automatizados** — Cobertura com Jest + Supertest para autenticação e produtos
- 🐳 **Containerizado** — Toda a stack roda com um único comando Docker
- ⚡ **CI/CD** — Pipeline no GitHub Actions: testa → builda → publica no Docker Hub

---

## 🚀 Início Rápido

> **Pré-requisitos:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução.

```bash
# 1. Clone o repositório
git clone https://github.com/joaoaugustoneto/projeto-sistema-de-estoque-2026.git
cd projeto-sistema-de-estoque-2026

# 2. Suba toda a infraestrutura (DB + Backend + Frontend)
docker compose up --build -d
```

| Serviço | URL |
|---|---|
| 🌐 **Frontend (UI)** | http://localhost:8080 |
| ⚙️ **Backend (API)** | http://localhost:3000 |
| 🩺 **Healthcheck** | http://localhost:3000/health |

> Na primeira execução, cadastre um novo usuário em **/register** para acessar o sistema.

---

## 🛠️ Stack Tecnológica

### Frontend
| Tecnologia | Versão | Função |
|---|---|---|
| React | 18 | Biblioteca de UI |
| Vite | 5 | Bundler e dev server |
| React Router DOM | 6 | Roteamento client-side |
| Vanilla CSS | — | Design System (sem frameworks externos) |
| Nginx | alpine | Servidor de produção |

### Backend
| Tecnologia | Versão | Função |
|---|---|---|
| Node.js | 20 | Runtime JavaScript |
| Express | 4 | Framework HTTP |
| bcrypt | 6 | Hash seguro de senhas |
| jsonwebtoken | 9 | Geração e validação de JWT |
| pg (node-postgres) | 8 | Conexão com PostgreSQL |
| Jest + Supertest | 29 / 7 | Testes automatizados |

### Infraestrutura
| Tecnologia | Função |
|---|---|
| PostgreSQL 15 | Banco de dados relacional |
| Docker + Docker Compose | Orquestração de containers |
| GitHub Actions | Pipeline de CI/CD |
| Docker Hub | Registro de imagens |

---

## 📁 Estrutura do Projeto

```text
projeto-sistema-de-estoque-2026/
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline CI/CD (test → build → push)
│
├── frontend/                   # React + Vite (build via Nginx)
│   ├── src/
│   │   ├── components/         # Componentes reutilizáveis
│   │   │   ├── Navbar.jsx      # Barra de navegação com logout
│   │   │   ├── ProductForm.jsx # Formulário de criação/edição
│   │   │   └── ProductList.jsx # Tabela de inventário
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Estado global de autenticação
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx   # Página principal (CRUD)
│   │   │   ├── Login.jsx       # Tela de login
│   │   │   └── Register.jsx    # Tela de cadastro
│   │   ├── services/
│   │   │   └── api.js          # Serviço HTTP com injeção de JWT
│   │   ├── App.jsx             # Roteamento com rotas protegidas
│   │   └── index.css           # Design System (Dark + Glassmorphism)
│   └── Dockerfile              # Multi-stage build (Node → Nginx)
│
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # Pool de conexão PostgreSQL
│   │   ├── controllers/
│   │   │   ├── authController.js    # Registro e Login
│   │   │   └── productController.js # CRUD de Produtos
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js    # Validação de token JWT
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # POST /auth/register|login
│   │   │   └── productRoutes.js     # GET|POST|PUT|DELETE /produtos
│   │   └── server.js           # Entry point da aplicação
│   └── tests/
│       ├── auth.test.js        # Testes de autenticação
│       └── produtos.test.js    # Testes de CRUD de produtos
│
├── database/
│   └── init.sql                # Criação de tabelas e seed inicial
│
├── .env.example                # Template de variáveis de ambiente
├── docker-compose.yml          # Orquestração: DB + Backend + Frontend
├── deploy.sh                   # Script de deploy com rollback automático
└── README.md
```

---

## 🌿 Padrão de Branches & Commits

```
main              ← Branch de produção (protegida)
develop/backend   ← Desenvolvimento do backend (Guilherme)
develop/frontend  ← Desenvolvimento do frontend (André)
devops            ← Infraestrutura e CI/CD (João)
```

| Prefixo | Uso | Exemplo |
|---|---|---|
| `feat` | Nova funcionalidade | `feat(backend): adiciona autenticacao jwt` |
| `fix` | Correção de bug | `fix(frontend): corrige redirect apos login` |
| `chore` | Infra, configs, CI | `chore(devops): adiciona dockerignore` |
| `test` | Testes | `test(backend): adiciona suite de autenticacao` |
| `docs` | Documentação | `docs: atualiza readme com nova estrutura` |
| `merge` | Integração de branches | `merge(main): integra frontend com autenticacao` |

---

## 🔧 Variáveis de Ambiente

Copie o `.env.example` para `.env` e ajuste conforme necessário:

```bash
cp .env.example .env
```

```env
# Banco de Dados
DB_HOST=db
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=adminpassword
DB_NAME=stock_db

# Backend
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui

# Frontend
VITE_API_URL=http://localhost:3000
```

---

## 🧪 Testes

```bash
cd backend
npm install
npm test
```

Os testes cobrem:
- ✅ Registro de usuário
- ✅ Login e geração de token
- ✅ Rejeição de email duplicado
- ✅ Rejeição de senha incorreta
- ✅ CRUD completo de produtos (com autenticação)
- ✅ Respostas 404 para recursos inexistentes

---

## ⚙️ CI/CD Pipeline

A pipeline no GitHub Actions é acionada a cada `push` ou `pull_request` para `main`:

```
push para main
    │
    ▼
┌─────────────────────────────┐
│  JOB 1: test-and-validate   │
│  ─────────────────────────  │
│  • Sobe PostgreSQL via Docker│
│  • npm install (backend)    │
│  • npm test (Jest)          │
│  • npm install (frontend)   │
│  • npm run build (Vite)     │
└────────────┬────────────────┘
             │ (somente se ✅)
             ▼
┌─────────────────────────────┐
│  JOB 2: build-docker-images │
│  ─────────────────────────  │
│  • Docker login (secrets)   │
│  • Build + Push Backend     │
│  • Build + Push Frontend    │
└─────────────────────────────┘
```

---

## 🔐 Arquitetura de Autenticação

```
Cliente (Browser)
      │
      │ POST /auth/register { nome, email, senha }
      │ POST /auth/login    { email, senha }
      ▼
  Backend API
      │
      ├─ Valida dados de entrada
      ├─ Hash de senha com bcrypt (salt rounds: 10)
      ├─ Gera JWT assinado com JWT_SECRET (expira em 24h)
      └─ Retorna { token, user }
      
      Requisições protegidas:
      Authorization: Bearer <token>
            │
            ▼
      authMiddleware.js
            │
            ├─ Verifica assinatura do token
            ├─ Verifica expiração
            └─ Injeta req.user → controller
```

---

## 📄 Licença

Distribuído sob a licença **MIT**.

Desenvolvido para fins acadêmicos — **Disciplinas de Construção de Frontend e DevOps/SRE** · 2026