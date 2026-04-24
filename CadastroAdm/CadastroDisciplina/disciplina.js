// 🔥 CARREGAR TUDO
document.addEventListener("DOMContentLoaded", function () {

    let tabela = document.getElementById("tabelaDisciplina");
    let selectCurso = document.getElementById("Curso");
    let selectCursoEditar = document.getElementById("cursoEditar");

    let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    let disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];

    // CARREGAR CURSOS NO SELECT
    cursos.forEach(curso => {
        let option = document.createElement("option");
        option.value = curso;
        option.textContent = curso;

        selectCurso.appendChild(option);
        selectCursoEditar.appendChild(option.cloneNode(true));
    });

    // CARREGAR DISCIPLINAS NA TABELA
    tabela.innerHTML = "";

    disciplinas.forEach((disc, index) => {
        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${disc.nome}</td>
            <td>${disc.curso}</td>
            <td>
                <button class="btnEditar">Editar</button>
                <button class="btnExcluir">Excluir</button>
            </td>
        `;

        linha.dataset.index = index;

        tabela.appendChild(linha);
    });
});


// CADASTRAR DISCIPLINA
document.getElementById("formDisciplina").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("Disciplina").value;
    let curso = document.getElementById("Curso").value;

    if (nome === "" || curso === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];

    disciplinas.push({ nome, curso });

    localStorage.setItem("disciplinas", JSON.stringify(disciplinas));

    location.reload();
});


// EXCLUIR
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btnExcluir")) {

        let linha = event.target.closest("tr");
        let index = linha.dataset.index;

        let disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];

        disciplinas.splice(index, 1);

        localStorage.setItem("disciplinas", JSON.stringify(disciplinas));

        location.reload();
    }
});


// EDITAR
let indexEditando = null;

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btnEditar")) {

        let linha = event.target.closest("tr");
        indexEditando = linha.dataset.index;

        let disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];
        let disciplina = disciplinas[indexEditando];

        document.getElementById("disciplinaEditar").value = disciplina.nome;
        document.getElementById("cursoEditar").value = disciplina.curso;

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

    let nome = document.getElementById("disciplinaEditar").value;
    let curso = document.getElementById("cursoEditar").value;

    let disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];

    disciplinas[indexEditando] = { nome, curso };

    localStorage.setItem("disciplinas", JSON.stringify(disciplinas));

    location.reload();
});