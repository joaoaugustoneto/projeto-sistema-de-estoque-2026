const { Pool } = require('pg');
require('dotenv').config();

// Configura o pool de conexão sem expor senhas de forma rígida (hardcoded)
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

module.exports = pool;