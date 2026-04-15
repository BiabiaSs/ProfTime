const conexao = require("../database/conexao");

async function redefinirSenha(req, res) {
  try {
    const { token, novaSenha } = req.body || {};

    // Validação
    if (!token || !novaSenha) {
      return res.status(400).json({ erro: "Dados obrigatórios" });
    }

    if (novaSenha.length < 6) {
      return res.status(400).json({ erro: "Senha muito curta" });
    }

    // Verificar token
    const sql = `
      SELECT id_usuarios 
      FROM usuarios 
      WHERE reset_token = ? 
      AND reset_expires > NOW()
    `;

    const [resultados] = await conexao.query(sql, [token]);

    if (resultados.length === 0) {
      return res.status(400).json({
        erro: "Token inválido ou expirado"
      });
    }

    const usuario = resultados[0];

    // Atualizar senha e limpar token
    const update = `
      UPDATE usuarios 
      SET senha = ?, reset_token = NULL, reset_expires = NULL
      WHERE id_usuarios = ?
    `;

    await conexao.query(update, [
      novaSenha,
      usuario.id_usuarios
    ]);

    return res.json({
      mensagem: "Senha redefinida com sucesso"
    });

  } catch (erro) {
    console.error("Erro ao redefinir senha:", erro);
    return res.status(500).json({
      erro: "Erro no servidor"
    });
  }
}

module.exports = { redefinirSenha };