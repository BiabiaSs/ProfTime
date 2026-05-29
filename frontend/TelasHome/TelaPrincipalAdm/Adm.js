document.addEventListener("DOMContentLoaded", () => {

  // pega dados salvos
  const token = localStorage.getItem('token');
  const tipo = localStorage.getItem('tipo');
  const usuario = JSON.parse(
    localStorage.getItem('usuario') || '{}'
  );

  console.log("Token:", token);
  console.log("Tipo:", tipo);
  console.log("Usuário:", usuario);

  // 🔒 não logado
  if (!token || !tipo) {

    alert("Você precisa fazer login");

    window.location.href = "../../TelaLogin/index.html";

    return;
  }

  // 🔒 verifica tipo
  if (tipo.toLowerCase().trim() !== 'administrador') {

    alert("Acesso permitido apenas para administradores");

    window.location.href = "../../TelaLogin/index.html";

    return;
  }

  // 🟢 mostra nome
  const el = document.getElementById("nomeUsuario");

  if (el && usuario.nome) {
    el.textContent = usuario.nome;
  }

// 🔥 FUNÇÃO LOGOUT
function logout() {

  // limpa sessão
  localStorage.clear();

  // volta login
  window.location.href =
    "../../TelaLogin/index.html";
}

// 🔥 deixa global
window.logout = logout;

});