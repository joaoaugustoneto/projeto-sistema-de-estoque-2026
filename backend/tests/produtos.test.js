// backend/tests/produtos.test.js
const request = require('supertest');
const app = require('../src/server');
const pool = require('../src/config/db');

// Antes dos testes, garante que o ambiente entenda que é um teste
beforeAll(() => {
    process.env.NODE_ENV = 'test';
});

// Fecha a conexão com o banco de dados após a execução dos testes para não travar o Jest
afterAll(async () => {
    await pool.end();
});

describe('🧪 Testes da API de Gerenciamento de Estoque', () => {
    
    // REQUISITO: Testar endpoint /health
    describe('GET /health', () => {
        it('Deve retornar status 200 e indicar que o sistema está UP', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('status', 'UP');
        });
    });

    // REQUISITO: Testar endpoint principal da API (Listagem e Cadastro)
    describe('Endpoints de Produtos', () => {
        it('GET /produtos - Deve retornar a lista de produtos com sucesso', async () => {
            const res = await request(app).get('/produtos');
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('POST /produtos - Não deve permitir o cadastro de produtos com preço negativo', async () => {
            const novoProdutoInvalido = {
                nome: "Produto Teste Negativo",
                descricao: "Teste de falha",
                quantidade: 5,
                preco: -10.00 // Valor inválido
            };

            const res = await request(app)
                .post('/produtos')
                .send(novoProdutoInvalido);

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error');
        });
    });
});