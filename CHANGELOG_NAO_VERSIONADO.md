# Changelog de Evolução do StockManager

Este documento registra as implementações detalhadas realizadas para aperfeiçoar o sistema.

## Etapa 1: DevOps & Infra (João)
- Criação de `.env.example` centralizando configuração.
- Atualização do `.gitignore` garantindo exclusão do CHANGELOG e `.env`.

## Etapa 2: Backend (Guilherme)
- Implementação dos endpoints `updateProduct` (PUT) e `deleteProduct` (DELETE) no `productController.js`.
- Mapeamento das novas rotas em `productRoutes.js` para garantir o ciclo CRUD completo.
- Atualização da suíte de testes (Jest) incluindo cobertura para deleção e edição de produtos inexistentes (404).

## Etapa 3: Frontend (André)
- Criação e estruturação do projeto React com Vite (criação de `index.html`, `vite.config.js`, `main.jsx`, `App.jsx`).
- Implementação do design system em `index.css` com tema dark premium e "glassmorphism".
- Construção da página principal `Dashboard.jsx` (Listagem, Criação, Atualização e Deleção).
- Criação do serviço `api.js` para consumo integrado do Backend Node.js.
