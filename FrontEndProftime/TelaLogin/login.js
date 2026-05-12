document.addEventListener('DOMContentLoaded', () => {

  console.log('Iniciando login...'); //teste

  window.fazerLogin = function (event) {

    event.preventDefault();

    const email = document.getElementById('Usuario').value.trim();
    const senha = document.getElementById('Senha').value.trim();
    const tipo = document.getElementById('TipoUsuario').value;

    if (!email || !senha || !tipo) {
      alert('Preencha todos os campos');
      return;
    }

    fetch('http://localhost:3006/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        senha,
        tipo: tipo
      })
    })
    .then(resposta => {

      console.log('Enviando dados para o backend');

      if (!resposta.ok) {
        return resposta.json().then(err => {
          throw new Error(err.erro || 'Erro no login');
        });
      }

      return resposta.json();
    })
    .then(dados => {

      console.log("DADOS RECEBIDOS:", dados);

      if (!dados.token) {
        alert("Token não recebido do servidor");
        return;
      }

      if (!dados.usuario || !dados.usuario.tipo) {
        alert("Tipo de usuário não recebido do servidor");
        console.error("Objeto recebido:", dados);
        return;
      }

      // salvando JWT
      localStorage.setItem('token', dados.token);
      localStorage.setItem('tipo', dados.usuario.tipo);

      const tipoUsuario = dados.usuario.tipo.toLowerCase().trim();

      if (tipoUsuario === 'administrador') {
        window.location.href = '/TelasHome/TelaPrinciaplaAdm/index.html';
      }
      else if (tipoUsuario === 'coordenador') {
        window.location.href = '/TelasHome/TelaPrincipalCoordenador/index.html';
      }
      else if (tipoUsuario === 'professor') {
        window.location.href = '/TelasHome/TelaPrincipalProfessor/index.html';
      }
      else {
        alert("Tipo de usuário desconhecido");
      }

    })
    .catch(erro => {
      console.error('Erro:', erro);
      alert(erro.message || "Usuário inválido");
    });

  };

});