// Importa o mysql2 já com suporte a promises (pra usar async/await)
const mysql = require('mysql2/promise');

// Carrega variáveis do .env (tipo senha do banco, host, etc)
require('dotenv').config();

// Cria um POOL de conexões (várias conexões reutilizáveis)
// Isso evita erro tipo: "connection closed"
const pool = mysql.createPool({
  host: process.env.DB_HOST,        // endereço do banco
  user: process.env.DB_USER,        // usuário
  password: process.env.DB_PASSWORD,// senha
  database: process.env.DB_NAME,    // nome do banco
  waitForConnections: true,         // espera conexão disponível
  connectionLimit: 10,              // máximo de conexões simultâneas
  queueLimit: 0                     // fila ilimitada
});

// Função só pra testar se conectou
async function testarConexao() {
  try {
    // Tenta pegar uma conexão do pool
    const conexao = await pool.getConnection();

    console.log('✅ Banco conectado com sucesso!');

    // IMPORTANTE: libera a conexão pro pool de novo
    conexao.release();

  } catch (erro) {
    console.error('❌ Erro ao conectar no banco:', erro);
  }
}

// Executa o teste quando o arquivo é carregado
testarConexao();

// Exporta o pool pra usar em outros arquivos
module.exports = pool;