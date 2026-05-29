// ELEMENTOS
const form = document.querySelector("form");
const inputSala = document.getElementById("SalaLab");
const tabela = document.querySelector(".TabelaSalaLab tbody");

const modal = document.getElementById("modalEditar");
const formEditar = document.getElementById("formEditar");
const inputEditar = document.getElementById("salaLabEditar");

const btnCancelar = document.querySelector("#formEditar .BtnVoltar");

let indexEditar = null;


// CARREGAR DADOS
document.addEventListener("DOMContentLoaded", carregarSalas);

function carregarSalas() {

    tabela.innerHTML = "";

    let salas = JSON.parse(localStorage.getItem("salas")) || [];

    salas.forEach((sala, index) => {

        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${sala}</td>
            <td>
                <button class="BtnEditar" data-index="${index}">
                    Editar
                </button>

                <button class="btnExcluir" data-index="${index}">
                    Excluir
                </button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}


//  CADASTRAR
form.addEventListener("submit", function(e) {

    e.preventDefault();

    let valorSala = inputSala.value.trim();

    if(valorSala === "") {
        alert("Preencha o campo!");
        return;
    }

    let salas = JSON.parse(localStorage.getItem("salas")) || [];

    salas.push(valorSala);

    localStorage.setItem("salas", JSON.stringify(salas));

    inputSala.value = "";

    carregarSalas();
});


// EXCLUIR
document.addEventListener("click", function(e) {

    if(e.target.classList.contains("btnExcluir")) {

        let index = e.target.dataset.index;

        let salas = JSON.parse(localStorage.getItem("salas")) || [];

        salas.splice(index, 1);

        localStorage.setItem("salas", JSON.stringify(salas));

        carregarSalas();
    }
});


// ABRIR MODAL EDITAR
document.addEventListener("click", function(e) {

    if(e.target.classList.contains("BtnEditar")) {

        e.preventDefault();

        indexEditar = e.target.dataset.index;

        let salas = JSON.parse(localStorage.getItem("salas")) || [];

        inputEditar.value = salas[indexEditar];

        modal.style.display = "flex";
    }
});


// SALVAR EDIÇÃO
formEditar.addEventListener("submit", function(e) {

    e.preventDefault();

    let salas = JSON.parse(localStorage.getItem("salas")) || [];

    salas[indexEditar] = inputEditar.value;

    localStorage.setItem("salas", JSON.stringify(salas));

    modal.style.display = "none";

    carregarSalas();
});


//  FECHAR MODAL
btnCancelar.addEventListener("click", function() {

    modal.style.display = "none";
});