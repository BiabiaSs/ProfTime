const jwt = require('jsonwebtoken');
const conexao = require('../banco/conexaoBanco');

function login(req, res) {
  console.log('REQ BODY:', req.body);
  const { email, senha, tipo } = req.body;

  if (!email || !senha || !tipo) {
    return res.status(400).json({
      erro: 'Email, senha e tipo são obrigatórios'
    });
  }

  const sqlBusca = `
    SELECT id_usuarios, nome, tipo
    FROM usuarios
    WHERE email = ?
      AND senha = ?
      AND tipo = ?
  `;

  conexao.query(sqlBusca, [email, senha, tipo], (erro, resultados) => {
    if (erro) {
      return res.status(500).json({ erro: erro.message });
    }

    if (resultados.length === 0) {
      return res.status(401).json({
        erro: 'Email, senha ou tipo inválidos'
      });
    }

    const usuario = resultados[0];

    const token = jwt.sign(
      {
        id: usuario.id_usuarios,
        nome: usuario.nome,
        tipo: usuario.tipo
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      mensagem: 'Login realizado com sucesso',
      token: token,
      usuario: {
        id: usuario.id_usuarios,
        nome: usuario.nome,
        tipo: usuario.tipo
      }
    });
  });
}

module.exports = { login };