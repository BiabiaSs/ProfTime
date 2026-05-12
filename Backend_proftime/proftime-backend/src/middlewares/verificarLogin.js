const jwt = require('jsonwebtoken');

function verificarLogin(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ erro: 'Token não enviado' });
  }

  const tokenLimpo = token.replace('Bearer ', '');

  try {
    const dados = jwt.verify(tokenLimpo, 'segredo');

    req.usuario = dados; // salva quem é o usuário
    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
}

module.exports = verificarLogin;