function verificarAdmin(req, res, next) {
  if (req.usuario.tipo_usuario !== 'administrador') {
    return res.status(403).json({
      erro: 'Apenas administradores podem acessar'
    });
  }

  next();
}

module.exports = verificarAdmin;