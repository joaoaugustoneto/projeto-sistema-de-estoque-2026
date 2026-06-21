const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Controller responsável pelo Registro de novos usuários
 */
const register = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Validação básica
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Verifica se o usuário já existe
        const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(409).json({ error: 'Email já cadastrado no sistema' });
        }

        // Hash da senha para segurança
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        // Insere o usuário no banco de dados
        const result = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email, criado_em',
            [nome, email, hashedPassword]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro no registro:', err);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

/**
 * Controller responsável pelo Login e geração do Token JWT
 */
const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Busca o usuário pelo e-mail
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const user = result.rows[0];

        // Compara a senha informada com o hash salvo
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Gera o token JWT (expira em 24 horas)
        const token = jwt.sign(
            { id: user.id, nome: user.nome, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login bem-sucedido',
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

module.exports = {
    register,
    login
};
