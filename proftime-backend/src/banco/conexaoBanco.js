const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: '108.179.193.125',
  user: 'marcos12_proftime',
  password: 'always_us_br@7',
  database: 'marcos12_etec_cronograma'
});

conexao.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar no banco:', erro);
    return;
  }
  console.log('Banco de dados conectado com sucesso');
});

module.exports = conexao;