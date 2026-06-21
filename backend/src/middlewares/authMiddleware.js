const jwt = require('jsonwebtoken');

/**
 * Middleware para proteger rotas. Verifica a existência e validade do token JWT.
 * O token deve ser enviado no cabeçalho Authorization: Bearer <token>.
 */
const authenticateToken = (req, res, next) => {
    // Busca o header de autorização
    const authHeader = req.headers['authorization'];
    // Extrai apenas o token (Bearer TOKEN)
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    // Verifica a assinatura e validade do token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido ou expirado.' });
        }
        // Anexa os dados do usuário na requisição para uso nos controllers
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateToken
};
