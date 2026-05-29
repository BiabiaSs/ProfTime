//Seleção de elementos do DOM
const formCadastro = document.querySelector('form');
const tabelaCorpo = document.querySelector('.TabelaHorario tbody');
const modalEditar = document.getElementById('modalEditar');
const formEditar = document.getElementById('formEditar');
const btnCancelarModal = document.querySelector('#modalEditar .BtnVoltar');

let listaHorarios = JSON.parse(localStorage.getItem('horarios')) || [];
let indexEdicao = null;

//FUNÇÕES DE CARREGAMENTO E EXIBIÇÃO

function renderizarTabela() {
    tabelaCorpo.innerHTML = ''; // Limpa a tabela

    listaHorarios.forEach((item, index) => { //forEach(percorre todos os dados da lista)
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.semana}</td>
            <td>${item.inicio}</td>
            <td>${item.fim}</td>
            <td>${item.disciplina}</td>
            <td>${item.professor}</td>
            <td>${item.curso}</td>
            <td>${item.turma}</td>
            <td>${item.grupo}</td>
            <td>${item.sala}</td>
            <td>
                <button class="BtnEditar" onclick="abrirEdicao(${index})">Editar</button>
                <button class="btnExcluir" onclick="excluirHorario(${index})">Excluir</button>
            </td>
        `;
        tabelaCorpo.appendChild(tr);
    });
}

//OPERAÇÕES COM O CRUD 

//Cadastrar novo horário
formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    const novoHorario = {
        semana: document.getElementById('Semana').value,
        inicio: document.getElementById('HorarioInicio').value,
        fim: document.getElementById('HorarioFim').value,
        disciplina: document.getElementById('Disciplina').selectedOptions[0].text,
        professor: document.getElementById('Professor').selectedOptions[0].text,
        curso: document.getElementById('Curso').selectedOptions[0].text,
        turma: document.getElementById('Turma').selectedOptions[0].text,
        grupo: document.getElementById('Grupo').selectedOptions[0].text,
        sala: document.getElementById('Sala').selectedOptions[0].text
    };

    listaHorarios.push(novoHorario);
    atualizarStorage(); //É o que faz a tabela editada ser salva
    formCadastro.reset();
});

//Excluir horário
window.excluirHorario = (index) => {
    if (confirm('Tem certeza que deseja excluir este horário?')) {
        listaHorarios.splice(index, 1); //splice(index,1) ele vai até a informação e a muda conforme o comando
        atualizarStorage();
    }
};

//EDIÇÃO  

window.abrirEdicao = (index) => {
    indexEdicao = index;
    const h = listaHorarios[index];

    document.getElementById('semanaEditar').value = h.semana;
    document.getElementById('inicioEditar').value = h.inicio;
    document.getElementById('fimEditar').value = h.fim;
    
    modalEditar.style.display = 'flex';
};

formEditar.addEventListener('submit', (e) => {
    e.preventDefault();

    listaHorarios[indexEdicao] = {
        semana: document.getElementById('semanaEditar').value,
        inicio: document.getElementById('inicioEditar').value,
        fim: document.getElementById('fimEditar').value,
        disciplina: document.getElementById('disciplinaEditar').value,
        professor: document.getElementById('professorEditar').value,
        curso: document.getElementById('cursoEditar').value,
        turma: document.getElementById('turmaEditar').value,
        grupo: document.getElementById('grupoEditar').value,
        sala: document.getElementById('salaEditar').value
    };

    atualizarStorage();
    fecharModal();
});

//UTILITÁRIOS 

function atualizarStorage() {
    localStorage.setItem('horarios', JSON.stringify(listaHorarios)); 
    renderizarTabela();
}

function fecharModal() {
    modalEditar.style.display = 'none';
    indexEdicao = null;
}

btnCancelarModal.onclick = fecharModal;

//Inicialização
renderizarTabela();