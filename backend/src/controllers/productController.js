const pool = require('../config/db');

// Busca todos os produtos cadastrados no banco
const getProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM produtos ORDER BY id DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos no banco de dados.' });
    }
};

// Cadastra um novo produto após realizar validações sanitárias básicas
const createProduct = async (req, res) => {
    const { nome, descricao, quantidade, preco } = req.body;

    // Impede o cadastro se os dados forem inválidos ou contiverem valores negativos
    if (!nome || quantidade < 0 || preco < 0) {
        return res.status(400).json({ 
            error: 'Dados inválidos. O nome é obrigatório e os valores não podem ser negativos.' 
        });
    }

    try {
        const query = 'INSERT INTO produtos (nome, descricao, quantidade, preco) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [nome, descricao, quantidade, preco];
        const result = await pool.query(query, values);
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar produto no banco de dados.' });
    }
};

module.exports = { getProducts, createProduct };