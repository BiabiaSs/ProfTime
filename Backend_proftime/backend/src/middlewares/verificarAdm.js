function verificarAdmin(req, res, next) {
  try {
    if (!req.usuario) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    if (req.usuario.tipo !== "administrador") {
      return res.status(403).json({
        erro: "Apenas administradores podem acessar"
      });
    }

    next();

  } catch (erro) {
    return res.status(500).json({ erro: "Erro no servidor" });
  }
}

module.exports = verificarAdmin;