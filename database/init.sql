-- database/init.sql

-- Criação da tabela de usuários para autenticação
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de produtos para o sistema de estoque
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    quantidade INT NOT NULL DEFAULT 0,
    preco DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de dados iniciais (Seed) para testes de integração
INSERT INTO produtos (nome, descricao, quantidade, preco) VALUES
('Notebook Pro 15', 'Notebook corporativo com 16GB RAM e 512GB SSD', 10, 4500.00),
('Monitor UltraWide 29', 'Monitor IPS com resolução 2560x1080 e 75Hz', 15, 1200.00),
('Teclado Mecânico RGB', 'Teclado switch blue padrão ABNT2', 30, 250.50)
ON CONFLICT DO NOTHING;