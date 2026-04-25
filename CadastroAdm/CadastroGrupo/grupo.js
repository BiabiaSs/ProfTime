document.addEventListener("DOMContentLoaded", function () {

    let tabela = document.getElementById("tabelaGrupo");
    
    let grupos = JSON.parse(localStorage.getItem("grupos")) || [];

    tabela.innerHTML = "";

    grupos.forEach((grupo, index) => {
        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${grupo.nome}</td>
            <td>
                <button class="btnEditar">Editar</button>
                <button class="btnExcluir">Excluir</button>
            </td>
        `;

        linha.dataset.index = index;

        tabela.appendChild(linha);
    });
});

document.getElementById("formGrupo").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("Grupo").value;

    if (nome === "") {
        alert("Preencha o campo Grupo!");
        return;
    }

    let grupos = JSON.parse(localStorage.getItem("grupos")) || [];

    grupos.push({ nome });

    localStorage.setItem("grupos", JSON.stringify(grupos));

    location.reload();
});

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btnExcluir")) {

        let linha = event.target.closest("tr");
        let index = linha.dataset.index;

        let grupos = JSON.parse(localStorage.getItem("grupos")) || [];

        grupos.splice(index, 1);

        localStorage.setItem("grupos", JSON.stringify(grupos));

        location.reload();
    }
});

let indexEditando = null;

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btnEditar")) {

        let linha = event.target.closest("tr");
        indexEditando = linha.dataset.index;

        let grupos = JSON.parse(localStorage.getItem("grupos")) || [];
        let grupo = grupos[indexEditando];

        document.getElementById("grupoEditar").value = grupo.nome;

        document.getElementById("modalEditar").style.display = "block";
    }
});

document.querySelector("#modalEditar .BtnVoltar").addEventListener("click", () => {
    document.getElementById("modalEditar").style.display = "none";
});

document.getElementById("formEditar").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("grupoEditar").value;

    let grupos = JSON.parse(localStorage.getItem("grupos")) || [];

    grupos[indexEditando] = { nome };

    localStorage.setItem("grupos", JSON.stringify(grupos));

    location.reload();
});
