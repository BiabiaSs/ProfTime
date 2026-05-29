// CARREGAR PROFESSORES
document.addEventListener("DOMContentLoaded", function () {
    let professores = JSON.parse(localStorage.getItem("professores")) || [];
    let tabela = document.getElementById("tabelaProfessor");

    tabela.innerHTML = "";

    professores.forEach(nome => {
        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${nome}</td>
            <td>
                <button class="btnExcluir">Excluir</button>
            </td>
        `;

        tabela.appendChild(linha);
    });
});


// CADASTRAR
document.getElementById("formProfessor").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("Professor").value;

    if (nome === "") {
        alert("Digite o nome do professor!");
        return;
    }

    let tabela = document.getElementById("tabelaProfessor");

    let novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td>${nome}</td>
        <td>
            <button class="btnExcluir">Excluir</button>
        </td>
    `;

    tabela.appendChild(novaLinha);

    // SALVAR
    let professores = JSON.parse(localStorage.getItem("professores")) || [];
    professores.push(nome);
    localStorage.setItem("professores", JSON.stringify(professores));

    document.getElementById("Professor").value = "";
});


// EXCLUIR
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btnExcluir")) {

        let linha = event.target.closest("tr");
        let nome = linha.children[0].innerText;

        linha.remove();

        let professores = JSON.parse(localStorage.getItem("professores")) || [];
        professores = professores.filter(p => p !== nome);

        localStorage.setItem("professores", JSON.stringify(professores));
    }
});

let indexEditando = null;

// ABRIR MODAL
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btnEditar")) {

        let linha = event.target.closest("tr");
        let nome = linha.children[0].innerText;

        indexEditando = linha.rowIndex - 1;

        document.getElementById("professorEditar").value = nome;

        document.getElementById("modalEditar").style.display = "block";
    }
});


// FECHAR MODAL
document.querySelector("#modalEditar .BtnVoltar").addEventListener("click", () => {
    document.getElementById("modalEditar").style.display = "none";
});


// SALVAR EDIÇÃO
document.getElementById("formEditar").addEventListener("submit", function(event) {
    event.preventDefault();

    let novoNome = document.getElementById("professorEditar").value;

    let professores = JSON.parse(localStorage.getItem("professores")) || [];

    if (indexEditando !== null) {
        professores[indexEditando] = novoNome;
    }

    localStorage.setItem("professores", JSON.stringify(professores));

    location.reload();
});