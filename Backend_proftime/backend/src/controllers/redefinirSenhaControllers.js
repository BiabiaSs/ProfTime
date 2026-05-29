const pool = require('../banco/conexaoBanco');

async function redefinirSenha(req, res) {

  try {

    const { email, novaSenha } = req.body;

    // validações
    if (!email || !novaSenha) {
      return res.status(400).json({
        erro: 'Email e senha obrigatórios'
      });
    }

    if (novaSenha.length < 6) {
      return res.status(400).json({
        erro: 'Senha muito curta'
      });
    }

    // verifica se usuário existe
    const [rows] = await pool.query(
      'SELECT id_usuarios FROM usuarios WHERE email = ?',
      [email]
    );

    // usuário não encontrado
    if (rows.length === 0) {
      return res.status(404).json({
        erro: 'Usuário não encontrado'
      });
    }

    // atualiza senha
    await pool.query(
      'UPDATE usuarios SET senha = ? WHERE email = ?',
      [novaSenha, email]
    );

    return res.json({
      mensagem: 'Senha redefinida com sucesso 🔐'
    });

  } catch (erro) {

    console.error("ERRO REDEFINIR:", erro);

    return res.status(500).json({
      erro: 'Erro no servidor'
    });

  }

}

module.exports = { redefinirSenha };