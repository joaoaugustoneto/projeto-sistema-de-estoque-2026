// backend/tests/produtos.test.js
// Testa os endpoints CRUD da API de produtos com autenticação JWT

const request = require('supertest');
const app = require('../src/server');
const pool = require('../src/config/db');
const jwt = require('jsonwebtoken');

let token;
let productId;

// Prepara o ambiente de teste antes de todos os casos
beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'testsecret';

    // Gera um token de teste válido para autenticar as requisições
    token = jwt.sign({ id: 1, nome: 'Test', email: 'test@test.com' }, process.env.JWT_SECRET);

    // Garante que a tabela existe no banco de teste
    await pool.query(`
        CREATE TABLE IF NOT EXISTS produtos (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            descricao TEXT,
            quantidade INT NOT NULL DEFAULT 0,
            preco DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

// Encerra a conexão com o banco após todos os testes
afterAll(async () => {
    await pool.end();
});

describe('🧪 Testes da API de Gerenciamento de Estoque', () => {

    // --- Healthcheck ---
    describe('GET /health', () => {
        it('Deve retornar status 200 e indicar que o sistema está UP', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('status', 'UP');
        });
    });

    // --- CRUD de Produtos ---
    describe('Endpoints de Produtos', () => {

        // GET /produtos — deve retornar array com autenticação
        it('deve listar os produtos', async () => {
            const response = await request(app)
                .get('/produtos')
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toEqual(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        // POST /produtos — deve criar e retornar 201
        it('deve criar um novo produto', async () => {
            const response = await request(app)
                .post('/produtos')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    nome: 'Produto Teste CI',
                    descricao: 'Descrição para teste automatizado',
                    quantidade: 10,
                    preco: 100.00
                });
            expect(response.statusCode).toEqual(201);
            expect(response.body).toHaveProperty('id');
            productId = response.body.id; // Salva o ID para os próximos testes
        });

        // PUT /produtos/:id — deve atualizar e retornar 200
        it('deve atualizar um produto existente', async () => {
            const response = await request(app)
                .put(`/produtos/${productId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    nome: 'Produto Editado CI',
                    descricao: 'Editado pelo teste',
                    quantidade: 5,
                    preco: 50.00
                });
            expect(response.statusCode).toEqual(200);
            expect(response.body.nome).toBe('Produto Editado CI');
        });

        // PUT /produtos/999999 — deve retornar 404 para ID inexistente
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
            expect(response.statusCode).toEqual(404);
        });

        // DELETE /produtos/:id — deve retornar 204 No Content (padrão REST)
        it('deve excluir um produto e retornar 204', async () => {
            const response = await request(app)
                .delete(`/produtos/${productId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toEqual(204);
        });

        // DELETE /produtos/999999 — deve retornar 404 para ID inexistente
        it('deve retornar 404 ao excluir produto inexistente', async () => {
            const response = await request(app)
                .delete('/produtos/999999')
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toEqual(404);
        });

        // POST /produtos sem autenticação — deve retornar 401
        it('deve rejeitar requisição sem token de autenticação', async () => {
            const response = await request(app)
                .get('/produtos'); // sem header Authorization
            expect(response.statusCode).toEqual(401);
        });
    });
});