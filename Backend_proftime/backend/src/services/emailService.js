// Importa biblioteca de envio de email
const nodemailer = require('nodemailer');

// Cria o "transportador" (quem envia o email)
const transporter = nodemailer.createTransport({
  service: 'gmail', // pode trocar por outro depois
  auth: {
    user: process.env.EMAIL_USER, // email
    pass: process.env.EMAIL_PASS  // senha ou app password
  }
});

// Função que envia email
async function enviarEmail(destino, assunto, texto) {
  try {
    // Envia o email com os dados
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // quem envia
      to: destino,                  // quem recebe
      subject: assunto,             // título
      text: texto                   // conteúdo
    });

    console.log('📧 Email enviado!');

  } catch (erro) {
    console.error('Erro ao enviar email:', erro);
  }
}

// Exporta função
module.exports = { enviarEmail };