const pool = require('../banco/conexaoBanco');
const { enviarEmail } = require('../services/emailService');

async function recuperarSenha(req, res) {
  try {

    const { email } = req.body;

    // validação
    if (!email) {
      return res.status(400).json({
        erro: 'Email obrigatório'
      });
    }

    // verifica usuário
    const [rows] = await pool.query(
      'SELECT id_usuarios FROM usuarios WHERE email = ?',
      [email]
    );

    // email não encontrado
    if (rows.length === 0) {
      return res.status(404).json({
        erro: 'EMAIL_NAO_ENCONTRADO'
      });
    }

    // 🔗 link simples SEM token
    const link = `http://127.0.0.1:5503/frontend/RedefinirSenha/index.html`;

    // 📧 envia email
    await enviarEmail(
      email,
      '🔐 Recuperação de senha - ProfTime',
      `Olá!

Recebemos uma solicitação para redefinir sua senha.

Clique no link abaixo para continuar:

"${link}"

Se você não solicitou essa alteração, ignore este email.`
    );
    

    return res.json({
      mensagem: 'Email enviado 📩'
    });

  } catch (erro) {

    console.error("ERRO RECUPERAR:", erro);

    return res.status(500).json({
      erro: 'Erro no servidor'
    });

  }
}

module.exports = { recuperarSenha };