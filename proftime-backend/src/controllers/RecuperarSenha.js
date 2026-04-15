const conexao = require("../banco/conexaoBanco");
const crypto = require("crypto");
const transporter = require("../services/email");

async function recuperarSenha(req, res) {

  const { email } = req.body;

  try {

    const token = crypto.randomBytes(20).toString("hex");

    const sql = "UPDATE usuarios SET reset_token = ? WHERE email = ?";
    conexao.query(sql, [token, email]);

    const link = `http://127.0.0.1:5502/RedefinirSenha/index.html?token=${token}`;

    await transporter.sendMail({
      from: "Proftime",
      to: email,
      subject: "Recuperação de senha",
      html: `
        <h2>Recuperar senha</h2>
        <p>Clique no link abaixo:</p>
        <a href="${link}">Redefinir senha</a>
      `
    });

    res.json({ mensagem: "Email enviado" });

  } catch (erro) {

    res.status(500).json({ erro: erro.message });

  }
}

module.exports = { recuperarSenha };