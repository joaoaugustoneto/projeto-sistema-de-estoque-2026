<div align="center">

<h6>TRABALHO FINAL — CONSTRUÇÃO DE FRONTEND & DEVOPS/SRE</h6>

# 📦 StockManager - Sistema de Gestão de Estoque

Aplicação Full Stack para controle de inventário.
Cadastre produtos, acompanhe a listagem em tempo real e conte com uma infraestrutura 100% automatizada com CI/CD, testes e orquestração de containers.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=20232A)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=white&labelColor=1a1a2e)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat-square&logo=postgresql&logoColor=white&labelColor=1a1a2e)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white&labelColor=1d3557)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white&labelColor=1a1a2e)

### 👥 Equipe

| [André](https://github.com/zsilly) | [Guilherme Miranda](https://github.com/Huzume) | [João Augusto](https://github.com/joaoaugustoneto) |
|:---:|:---:|:---:|
| Frontend | Backend | DevOps & QA |

</div>

---

## ⚡ Início rápido (Como executar e subir containers)

A aplicação foi construída visando facilidade de execução através de containers, garantindo que o ambiente funcione de forma idêntica em qualquer máquina. 

> Necessário: **Docker** e **Docker Compose** instalados.

```bash
# Clone o repositório
git clone [https://github.com/seu-usuario/stock-manager.git](https://github.com/seu-usuario/stock-manager.git)

# Entre na pasta do projeto
cd stock-manager

# Suba toda a infraestrutura (Frontend, Backend e Banco de Dados)
docker compose up --build -d

```

✅ **Frontend (React + Nginx):** Acesse em **http://localhost:8080**
✅ **Backend (API):** Acesse em **http://localhost:3000**
✅ **Healthcheck API:** Acesse em **http://localhost:3000/health**

---

## 🧪 Como testar

Foram implementados testes automatizados com **Jest** e **Supertest** para garantir a fiabilidade da API, cobrindo cenários de sucesso e erro.

Para rodar os testes localmente:

```bash
cd backend
npm install
npm test

```

---

## ⚙️ Como executar a pipeline CI/CD

A pipeline foi construída utilizando o **GitHub Actions** (`.github/workflows/ci.yml`). Ela executa automaticamente sempre que um desenvolvedor faz um `push` ou `pull_request` para a branch `main`.

Não é necessária intervenção manual para iniciar a pipeline. No entanto, para acompanhar a sua execução:

1. Abra o repositório no GitHub.
2. Clique no separador **"Actions"**.
3. Clique no último workflow executado para ver os passos (Checkout, Validação Node.js, Testes Jest, Build do Frontend e Build/Push seguro das Imagens Docker para o Docker Hub).

---

## 🛠️ Explicação das correções realizadas (Diagnóstico DevOps)

O projeto foi entregue inicialmente com falhas arquiteturais propositais. Abaixo estão detalhados os problemas e como a equipa solucionou cada um:

### 1. Backend não conectava ao banco (ECONNREFUSED)

**Causa:** Os containers subiam em redes diferentes isoladas.
**Solução:** Criámos uma rede interna (`stock-network`) no `docker-compose.yml` para garantir que o Backend e a Base de Dados estivessem na mesma ponte de comunicação, e configurámos as credenciais via variáveis de ambiente (`DB_HOST=db`).

### 2. Frontend não acessava a API

**Causa:** O Frontend possuía uma URL fixa para o `localhost` que não funcionava dentro da rede dos containers.
**Solução:** Passámos a variável de ambiente `VITE_API_URL` para injetar a rota correta dinamicamente, permitindo a comunicação correta entre a interface (agora servida por Nginx) e a API.

### 3. Containers iniciavam fora de ordem

**Causa:** O Backend tentava conectar-se ao PostgreSQL antes do banco estar pronto para receber conexões.
**Solução:** Implementámos um `healthcheck` usando `pg_isready` no banco de dados e adicionámos a cláusula `depends_on: condition: service_healthy` no Backend. Agora a API aguarda a estabilização total do banco antes de iniciar.

### 4. Banco perdia dados após reinicialização

**Causa:** O container do PostgreSQL gravava dados num sistema de ficheiros efémero.
**Solução:** Criámos um volume persistente Docker (`pgdata`) e mapeámo-lo para `/var/lib/postgresql/data`. Assim, os dados sobrevivem aos comandos `docker compose down`.

### 5. Build do projeto a quebrar e Falta de Testes

**Causa:** Ausência de cobertura de testes e pipelines CI frágeis.
**Solução:** Criámos testes automatizados com Jest no backend. A pipeline no GitHub Actions foi refatorada para rodar testes obrigatoriamente antes do build das imagens, interrompendo o processo (Fail-fast) caso algum erro ocorra.

### 6. Variáveis sensíveis expostas e Falta de Rollback

**Causa:** Credenciais visíveis no código e processos de deploy perigosos.
**Solução:** - Configuração de **Secrets no GitHub** (`DOCKER_USERNAME` e `DOCKER_PASSWORD`) para ocultar credenciais no workflow.

* Criação de um script `deploy.sh` que faz backup da versão atual, puxa as novas atualizações, verifica o `/health` e **desfaz automaticamente a atualização (Rollback Ativo)** voltando para as imagens anteriores em caso de falha no deploy.

---

## 📁 Estrutura do projeto

```text
stock-manager/
├── 📂 .github/workflows/       # Pipeline de CI/CD (GitHub Actions)
├── 📂 frontend/                # Aplicação React + Vite (Dockerfile Multi-stage com Nginx)
├── 📂 backend/                 # API Node.js + Express (Testes Jest)
├── 📂 database/                # Scripts do banco de dados (init.sql)
├── docker-compose.yml          # Orquestração dos containers, redes e volumes
├── deploy.sh                   # Script de Deploy Automatizado com Rollback
└── README.md                   # Documentação do projeto

```

---

## 🌿 Padrão de branches & Commits

> Mensagens de commit devem ser **curtas, no imperativo e com um prefixo de tipo**.

| Tipo | Quando usar | Exemplo |
| --- | --- | --- |
| `feat` | Nova funcionalidade (telas, rotas, etc) | `feat: cria rota POST /produtos` |
| `fix` | Corrigiu um bug | `fix: resolve falha na ordem dos containers` |
| `test` | Adição ou refatoração de testes | `test: adiciona teste para endpoint /health` |
| `chore` | Configurações, infraestrutura e CI | `chore: configura action de deploy` |

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

Desenvolvido para fins acadêmicos.
**Disciplinas de Construção de Frontend e DevOps** · 2026