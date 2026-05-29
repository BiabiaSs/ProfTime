document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById("formRecuperar");

  if (!form) {
    console.error("Formulário não encontrado!");
    return;
  }

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById('email')?.value.trim();

    if (!email) {
      alert('Digite o email');
      return;
    }

    if (!email.includes('@')) {
      alert('Email inválido');
      return;
    }

    try {
      const resposta = await fetch('http://localhost:3000/recuperarSenha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      let dados;

      try {
        dados = await resposta.json();
      } catch {
        throw new Error("Erro na resposta do servidor");
      }

      // 🔥 tratamento do erro personalizado
      if (!resposta.ok) {

        if (dados.erro === 'EMAIL_NAO_ENCONTRADO') {
          alert('Tente novamente, email não identificado ❌');
          return;
        }

        throw new Error(dados.erro || 'Erro ao recuperar senha');
      }

      alert('Enviamos um link para seu email 📩');

      // opcional
      localStorage.setItem('emailRecuperacao', email);

      // ❌ NÃO redireciona mais!
      // usuário vai pelo email

    } catch (erro) {

      console.error('Erro:', erro);

      if (erro.message.includes("Failed to fetch")) {
        alert("Servidor não está rodando");
      } else {
        alert(erro.message);
      }
    }

  });

});