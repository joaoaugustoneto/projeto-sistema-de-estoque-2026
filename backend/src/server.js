const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); // ← Importado corretamente
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint de verificação de integridade e saúde do sistema (Healthcheck)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'UP', 
        timestamp: new Date() 
    });
});

// Rotas principais para gerenciamento de estoque
app.use('/produtos', productRoutes);
app.use('/auth', authRoutes);

// ✅ ROTA DE AUTENTICAÇÃO ADICIONADA: Mapeia as endpoints de login e registro
app.use('/auth', authRoutes);

// Impede que o servidor dispute portas de escuta em ambiente de testes isolados
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor da API de estoque rodando na porta ${PORT}`);
    });
}

module.exports = app;