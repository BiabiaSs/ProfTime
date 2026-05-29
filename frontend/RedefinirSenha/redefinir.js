document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById("formRedefinir");

  if (!form) {
    console.error("Formulário não encontrado");
    return;
  }

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    // pega valores
    const email = document.getElementById('Email').value.trim();
    const senha = document.getElementById('NovaSenha').value.trim();
    const confirmar = document.getElementById('ConfirmarSenha').value.trim();

    // validações
    if (!email || !senha || !confirmar) {
      alert("Preencha todos os campos");
      return;
    }

    if (!email.includes('@')) {
      alert("Email inválido");
      return;
    }

    if (senha.length < 6) {
      alert("Senha muito curta");
      return;
    }

    if (senha !== confirmar) {
      alert("As senhas não coincidem");
      return;
    }

    try {

      const resposta = await fetch('http://localhost:3000/redefinirSenha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          novaSenha: senha
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || "Erro ao redefinir senha");
      }

      alert("Senha redefinida com sucesso 🔐");

      window.location.href = '../TelaLogin/index.html';

    } catch (erro) {

      console.error("ERRO:", erro);

      if (erro.message.includes("Failed to fetch")) {
        alert("Servidor não está rodando");
      } else {
        alert(erro.message);
      }

    }

  });

});