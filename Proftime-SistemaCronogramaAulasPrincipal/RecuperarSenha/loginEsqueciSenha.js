const form = document.getElementById("formRecuperar");

const botao = document.getElementById("Btn");

botao.addEventListener("click", recuperar);

async function recuperar(e) {

    if (e) e.preventDefault();

    const email = document.getElementById("email").value.trim();

    if (!email) {
        alert("Digite seu email");
        return;
    }

    botao.disabled = true;

    try {

        const resposta = await fetch("http://localhost:3006/recuperar-senha", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email
            })

        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro || "Erro no servidor");
        }

        alert(dados.mensagem || "Email enviado com sucesso");

        form.reset();

    } catch (error) {

        console.error(error);
        alert(error.message);

    } finally {

        botao.disabled = false;

    }

}