document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formRedefinir");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 🔑 Token da URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      alert("Token inválido ou ausente");
      return;
    }

    const senha = document.getElementById("NovaSenha").value;
    const confirmar = document.getElementById("ConfirmarSenha").value;

    // 🔒 validações
    if (!senha || senha.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (senha !== confirmar) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3006/auth/redefinir-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token,
          novaSenha: senha
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || "Erro ao redefinir senha");
      }

      alert("Senha redefinida com sucesso!");

      // 🔁 redireciona pro login
      setTimeout(() => {
        window.location.href = "../TelaLogin/index.html";
      }, 1000);

    } catch (erro) {
      console.error("Erro:", erro);

      if (erro.message.includes("Failed to fetch")) {
        alert("Servidor não está rodando ou URL incorreta");
      } else {
        alert(erro.message);
      }
    }

  });

});