const usuario = JSON.parse(localStorage.getItem('usuario'));

console.log("Token salvo:", localStorage.getItem('token'));
console.log("Tipo salvo:", localStorage.getItem('tipo'));

const tipo = localStorage.getItem('tipo');

if (!tipo || tipo.toLowerCase().trim() !== 'professor') {
  window.location.href = '/TelasHome/TelaPrincipalProfessor/index.html';
}

