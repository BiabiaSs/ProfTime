document.addEventListener("DOMContentLoaded", function () {
    let tabela = document.getElementById("tabelaGrupo");
    let grupos = JSON.parse(localStorage.getItem("grupos")) || [];

    tabela.innerHTML = "";

    grupos.forEach((grupo, index) => {
        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${grupo.nome_grupo}</td>
            <td>
                <button class="btnEditar">Editar</button>
                <button class="btnExcluir">Excluir</button>
            </td>
        `;

        linha.dataset.index = index;
        tabela.appendChild(linha);
    });
});

// CADASTRAR GRUPO
document.getElementById("formGrupo").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome_grupo = document.getElementById("Grupo").value;

    if (nome_grupo === "") {
        alert("Preencha o campo Grupo!");
        return;
    }

    let grupos = JSON.parse(localStorage.getItem("grupos")) || [];
    grupos.push({ nome_grupo });

    localStorage.setItem("grupos", JSON.stringify(grupos));
    location.reload();
});

// EXCLUIR GRUPO
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

// ABRIR MODAL DE EDIÇÃO
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btnEditar")) {
        let linha = event.target.closest("tr");
        indexEditando = linha.dataset.index;

        let grupos = JSON.parse(localStorage.getItem("grupos")) || [];
        let grupo = grupos[indexEditando];

        document.getElementById("grupoEditar").value = grupo.nome_grupo;
        document.getElementById("modalEditar").style.display = "block";
    }
});

// CANCELAR EDIÇÃO
document.querySelector("#modalEditar .BtnVoltar").addEventListener("click", () => {
    document.getElementById("modalEditar").style.display = "none";
});

// SALVAR EDIÇÃO
document.getElementById("formEditar").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome_grupo = document.getElementById("grupoEditar").value;
    let grupos = JSON.parse(localStorage.getItem("grupos")) || [];

    grupos[indexEditando] = { nome_grupo };
    localStorage.setItem("grupos", JSON.stringify(grupos));

    location.reload();
});
