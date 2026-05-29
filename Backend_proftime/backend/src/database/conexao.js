require('dotenv').config();
console.log("TESTE ENV:", process.env.DB_USER);
const mysql = require('mysql2/promise');

// Criando pool
const conexao = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Teste de conexão
async function testarConexao() {
    try {
        const connection = await conexao.getConnection();
        console.log('Banco de dados conectado com sucesso');
        connection.release();
    } catch (erro) {
        console.error('Erro ao conectar no banco:', erro);
    }
}

testarConexao();

module.exports = conexao;