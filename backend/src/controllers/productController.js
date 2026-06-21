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

// Atualiza os dados de um produto existente
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, quantidade, preco } = req.body;

    if (!nome || quantidade < 0 || preco < 0) {
        return res.status(400).json({ 
            error: 'Dados inválidos. O nome é obrigatório e os valores não podem ser negativos.' 
        });
    }

    try {
        const query = 'UPDATE produtos SET nome = $1, descricao = $2, quantidade = $3, preco = $4 WHERE id = $5 RETURNING *';
        const values = [nome, descricao, quantidade, preco, id];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto no banco de dados.' });
    }
};

// Remove um produto do banco de dados
// Retorna 204 No Content conforme padrão REST (exclusão não tem corpo de resposta)
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM produtos WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
        
        // 204 No Content: exclusão bem-sucedida, sem corpo de resposta
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar produto no banco de dados.' });
    }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };