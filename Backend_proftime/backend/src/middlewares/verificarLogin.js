const jwt = require('jsonwebtoken');

// Middleware = função que roda antes da rota
function verificarLogin(req, res, next) {

  // Pega token do header
  const token = req.headers.authorization;

  // Se não tiver token
  if (!token) {
    return res.status(401).json({ erro: 'Sem token' });
  }

  try {
    // Verifica se token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Salva dados do usuário na requisição
    req.usuario = decoded;

    // Continua para próxima etapa
    next();

  } catch (erro) {
    res.status(401).json({ erro: 'Token inválido' });
  }
}

module.exports = verificarLogin;