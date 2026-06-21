// backend/tests/auth.test.js
// Testa os endpoints de autenticação: registro, login e validações

const request = require('supertest');
const app = require('../src/server');
const pool = require('../src/config/db');

const TEST_EMAIL = 'testauth@example.com';

// Prepara o banco para os testes de autenticação
beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'testsecret';

    // Garante que a tabela de usuários existe
    await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            senha VARCHAR(255) NOT NULL,
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Limpa o usuário de teste para garantir estado inicial consistente
    await pool.query('DELETE FROM usuarios WHERE email = $1', [TEST_EMAIL]);
});

// Encerra a conexão após os testes
afterAll(async () => {
    // Limpa o usuário criado no teste
    await pool.query('DELETE FROM usuarios WHERE email = $1', [TEST_EMAIL]);
    await pool.end();
});

describe('🔐 Testes de Autenticação', () => {

    // POST /auth/register — deve criar usuário e retornar 201
    it('deve registrar um novo usuário com sucesso', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                nome: 'Test Auth User',
                email: TEST_EMAIL,
                senha: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email', TEST_EMAIL);
        // Garante que a senha não é exposta na resposta
        expect(res.body).not.toHaveProperty('senha');
    });

    // POST /auth/register com email duplicado — deve retornar 409 Conflict
    it('não deve permitir registro com email já cadastrado', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                nome: 'Outro Usuário',
                email: TEST_EMAIL, // mesmo email do teste anterior
                senha: 'outrasenha'
            });
        expect(res.statusCode).toEqual(409);
        expect(res.body).toHaveProperty('error');
    });

    // POST /auth/register com campos faltando — deve retornar 400
    it('deve rejeitar registro sem campos obrigatórios', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ email: TEST_EMAIL }); // sem nome e senha
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });

    // POST /auth/login — deve retornar token e dados do usuário
    it('deve fazer login com credenciais corretas e retornar token JWT', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: TEST_EMAIL,
                senha: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toBe(TEST_EMAIL);
    });

    // POST /auth/login com senha errada — deve retornar 401 Unauthorized
    it('deve rejeitar login com senha incorreta', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: TEST_EMAIL,
                senha: 'senhaerrada123'
            });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
    });

    // POST /auth/login com email não cadastrado — deve retornar 401
    it('deve rejeitar login com email não cadastrado', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'naoexiste@example.com',
                senha: 'qualquersenha'
            });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
    });
});
