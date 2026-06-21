const request = require('supertest');
const app = require('../src/server');
const pool = require('../src/config/db');

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'testsecret';
    await pool.query('CREATE TABLE IF NOT EXISTS usuarios (id SERIAL PRIMARY KEY, nome VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, senha VARCHAR(255) NOT NULL, criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
    await pool.query('DELETE FROM usuarios WHERE email = $1', ['testauth@example.com']);
});

afterAll(async () => {
    await pool.end();
});

describe('🧪 Testes de Autenticação', () => {
    it('deve registrar um novo usuário', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                nome: 'Test Auth',
                email: 'testauth@example.com',
                senha: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toBe('testauth@example.com');
    });

    it('não deve permitir registro com email duplicado', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                nome: 'Test Auth 2',
                email: 'testauth@example.com',
                senha: 'password123'
            });
        expect(res.statusCode).toEqual(409);
        expect(res.body).toHaveProperty('error');
    });

    it('deve fazer login e retornar o token', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'testauth@example.com',
                senha: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user.email).toBe('testauth@example.com');
    });

    it('deve rejeitar login com senha incorreta', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'testauth@example.com',
                senha: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
    });
});
