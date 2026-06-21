// backend/tests/produtos.test.js
const request = require('supertest');
const app = require('../src/server');
const pool = require('../src/config/db');
const jwt = require('jsonwebtoken');

let token;
let productId;

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'testsecret';
    token = jwt.sign({ id: 1, nome: 'Test', email: 'test@test.com' }, process.env.JWT_SECRET);
    
    await pool.query('CREATE TABLE IF NOT EXISTS produtos (id SERIAL PRIMARY KEY, nome VARCHAR(255) NOT NULL, descricao TEXT, quantidade INT NOT NULL DEFAULT 0, preco DECIMAL(10, 2) NOT NULL DEFAULT 0.00, criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
});

afterAll(async () => {
    await pool.end();
});

describe('🧪 Testes da API de Gerenciamento de Estoque', () => {
    
    describe('GET /health', () => {
        it('Deve retornar status 200 e indicar que o sistema está UP', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('status', 'UP');
        });
    });

    describe('Endpoints de Produtos', () => {
        it('deve listar os produtos', async () => {
            const response = await request(app)
                .get('/produtos')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('deve criar um novo produto', async () => {
            const response = await request(app)
                .post('/produtos')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    nome: "Produto Teste",
                    descricao: "Descricao teste",
                    quantidade: 10,
                    preco: 100.00
                });
            expect(response.status).toBe(201);
            productId = response.body.id;
        });

        it('deve atualizar um produto', async () => {
            const response = await request(app)
                .put(`/produtos/${productId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    nome: 'Produto Editado',
                    descricao: 'Editado',
                    quantidade: 5,
                    preco: 50.00
                });
            expect(response.status).toBe(200);
            expect(response.body.nome).toBe('Produto Editado');
        });

        it('deve retornar 404 ao atualizar produto inexistente', async () => {
            const response = await request(app)
                .put('/produtos/999999')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    nome: 'Inexistente',
                    descricao: 'Inexistente',
                    quantidade: 0,
                    preco: 0.00
                });
            expect(response.status).toBe(404);
        });

        it('deve excluir um produto', async () => {
            const response = await request(app)
                .delete(`/produtos/${productId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(204);
        });

        it('deve retornar 404 ao excluir produto inexistente', async () => {
            const response = await request(app)
                .delete('/produtos/999999')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(404);
        });
    });
});