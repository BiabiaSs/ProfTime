// 🔥 CARREGAR USUÁRIOS
document.addEventListener("DOMContentLoaded", function () {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let tabela = document.getElementById("tabelaUsuarios");

    tabela.innerHTML = "";

    usuarios.forEach(user => {
        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.senha}</td>
            <td>${user.tipo}</td>
            <td>
                <button class="btnExcluir">Excluir</button>
            </td>
        `;

        tabela.appendChild(linha);
    });
});


// ➕ CADASTRAR USUÁRIO
document.getElementById("formUsuario").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("Nome").value;
    let email = document.getElementById("Email").value;
    let senha = document.getElementById("Senha").value;
    let tipo = document.getElementById("Usuario").value;

    if (nome === "" || email === "" || senha === "" || tipo === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let tabela = document.getElementById("tabelaUsuarios");

    let novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td>${nome}</td>
        <td>${email}</td>
        <td>${senha}</td>
        <td>${tipo}</td>
        <td>
            <button class="btnExcluir">Excluir</button>
        </td>
    `;

    tabela.appendChild(novaLinha);

    // 💾 SALVAR NO LOCALSTORAGE
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push({ nome, email, senha, tipo });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    document.getElementById("formUsuario").reset();
});


// ❌ EXCLUIR USUÁRIO
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btnExcluir")) {

        let linha = event.target.closest("tr");
        let nome = linha.children[0].innerText;

        linha.remove();

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios = usuarios.filter(u => u.nome !== nome);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
});