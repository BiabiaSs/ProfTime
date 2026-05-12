//  CARREGAR AO ABRIR A PÁGINA
document.addEventListener("DOMContentLoaded", function () {
    let cursosSalvos = JSON.parse(localStorage.getItem("cursos")) || [];
    let tabela = document.getElementById("tabelaCursos");

    cursosSalvos.forEach(curso => {
        let novaLinha = document.createElement("tr");

        novaLinha.innerHTML = `
            <td>${curso}</td>
            <td>
                <button class="btnExcluir">Excluir</button>
            </td>
        `;

        tabela.appendChild(novaLinha);
    });
});


//  CADASTRAR + SALVAR
document.getElementById("formCurso").addEventListener("submit", function(event) {
    event.preventDefault();

    let curso = document.getElementById("Curso").value;

    if (curso === "") {
        alert("Digite um curso!");
        return;
    }

    let tabela = document.getElementById("tabelaCursos");

    let novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td>${curso}</td>
        <td>
            <button class="btnExcluir">Excluir</button>
        </td>
    `;

    tabela.appendChild(novaLinha);

    // SALVAR NO LOCALSTORAGE
    let cursosSalvos = JSON.parse(localStorage.getItem("cursos")) || [];
    cursosSalvos.push(curso);
    localStorage.setItem("cursos", JSON.stringify(cursosSalvos));

    document.getElementById("Curso").value = "";
});


// EXCLUIR + ATUALIZAR STORAGE
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btnExcluir")) {

        let linha = event.target.closest("tr");
        let curso = linha.children[0].innerText;

        linha.remove();

        // ATUALIZA O LOCALSTORAGE
        let cursosSalvos = JSON.parse(localStorage.getItem("cursos")) || [];
        cursosSalvos = cursosSalvos.filter(c => c !== curso);

        localStorage.setItem("cursos", JSON.stringify(cursosSalvos));
    }
});