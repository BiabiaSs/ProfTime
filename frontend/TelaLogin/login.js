document.addEventListener('DOMContentLoaded', () => {

  // pega formulário
  const form = document.getElementById("Login");

  // segurança
  if (!form) {
    console.error("Formulário não encontrado!");
    return;
  }

  // submit login
  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    // pega dados
    const email = document.getElementById('Usuario').value.trim();

    const senha = document.getElementById('Senha').value;

    const tipo = document.getElementById('TipoUsuario').value;

    // validação
    if (!email || !senha || !tipo) {

      alert('Preencha todos os campos');

      return;
    }

    try {

      // envia login
      const resposta = await fetch('http://localhost:3000/login', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          email,
          senha,
          tipo
        })

      });

      // converte resposta
      const dados = await resposta.json();

      console.log("RESPOSTA LOGIN:", dados);

      // erro backend
      if (!resposta.ok) {

        alert(dados.erro || 'Erro no login');

        return;
      }

      // segurança
      if (!dados.token || !dados.usuario) {

        console.error("Resposta inválida:", dados);

        alert("Erro interno do servidor");

        return;
      }

      // limpa sessões antigas
      localStorage.clear();

      // salva token
      localStorage.setItem(
        'token',
        dados.token
      );

      // salva tipo REAL do banco
      localStorage.setItem(
        'tipo',
        (dados.usuario.tipo || '')
          .toLowerCase()
          .trim()
      );

      // salva usuário
      localStorage.setItem(
        'usuario',
        JSON.stringify(dados.usuario)
      );

      console.log("LOCALSTORAGE:", localStorage);

      // normaliza tipo
      const tipoUsuario = (
        dados.usuario.tipo || ''
      )
        .toLowerCase()
        .trim();

      // rotas
      const rotas = {

        administrador:
          '../TelasHome/TelaPrincipalAdm/index.html',

        coordenador:
          '../TelasHome/TelaPrincipalCoor/index.html',

        professor:
          '../TelasHome/TelaPrincipalProf/index.html'

      };

      // pega rota
      const rota = rotas[tipoUsuario];

      // segurança
      if (!rota) {

        alert("Tipo de usuário inválido");

        return;
      }

      // redireciona
      window.location.href = rota;

    } catch (erro) {

      console.error("ERRO LOGIN:", erro);

      // backend offline
      if (
        erro.message.includes("Failed to fetch")
      ) {

        alert("Servidor não está rodando");

      } else {

        alert("Erro ao conectar com servidor");

      }

    }

  });

});