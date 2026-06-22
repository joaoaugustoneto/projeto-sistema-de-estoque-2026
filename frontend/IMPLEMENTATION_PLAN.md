# Plano de Implementação: Refatoração Frontend (Requisitos Avaliativos)

O objetivo é reestruturar o frontend para cumprir rigorosamente os requisitos da atividade, mantendo o design Premium (Glassmorphism + Dark Mode) e a autenticação.

## Alterações Propostas

### 1. Novo Contexto de Produtos (`ProductContext.jsx`)
Para cumprir a exigência de **Gerenciamento de estado compartilhado entre páginas**, criaremos um `ProductContext`. 
Ele fará as requisições à API e manterá a lista de produtos em um estado global (React Context). Assim, o que for salvo na página de Cadastro será imediatamente refletido na Listagem através do estado.

### 2. Separação de Páginas (Roteamento)
O `Dashboard.jsx` será substituído por três novas páginas para cumprir a exigência de no mínimo três páginas:
- **`Home.jsx` (Início)**: Dashboard com resumo do estoque (quantidade de itens, valor total).
- **`Cadastro.jsx` (Cadastro)**: Formulário isolado para cadastrar e editar produtos.
- **`Estoque.jsx` (Listagem)**: Listagem completa do estoque, com opções de editar e excluir.

### 3. Atualização da Barra de Navegação (`Navbar.jsx`)
O componente `Navbar` receberá links (usando `react-router-dom`) para as 3 páginas (`/`, `/cadastro`, `/estoque`), garantindo a navegação fluida exigida.

### 4. Limpeza de Código Inútil
- O antigo `Dashboard.jsx` será removido, já que suas funções foram delegadas para as páginas específicas.

### 5. Revisão Minuciosa e Execução Local
- As páginas e contextos serão revisados.
- Testarei a aplicação para garantir o funcionamento.
- No final, encerrarei o ambiente com `docker compose down` conforme solicitado.

## Ação Necessária
Aguardando a aprovação do usuário para iniciar a escrita dos componentes.
