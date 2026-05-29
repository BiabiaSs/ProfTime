const jwt = require('jsonwebtoken');
const conexao = require('../banco/conexaoBanco');

async function login(req, res) {
    try {
        const { email, senha, tipo } = req.body;
        
        // Logs para você ver no terminal do VS Code
        console.log("----------------------------");
        console.log("📡 Requisição de login recebida");
        console.log("Dados vindos do formulário:", { email, senha, tipo });

        // Busca no banco de dados
        const sqlBusca = 'SELECT * FROM usuarios WHERE email = ? AND senha = ? AND tipo = ?';
        const [resultados] = await conexao.query(sqlBusca, [email, senha, tipo]);

        // Se não encontrar ninguém
        if (resultados.length === 0) {
            console.log("❌ Falha: Usuário não encontrado ou dados incorretos.");
            return res.status(401).json({ erro: "Email, senha ou tipo incorretos" });
        }

        const usuario = resultados[0];
        console.log("✅ Sucesso: Usuário autenticado:", usuario.email);

        // Gera o token JWT
        const token = jwt.sign(
            { id: usuario.id_usuarios, tipo: usuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Resposta final para o frontend (login.js)
        return res.json({
            mensagem: "Login realizado com sucesso",
            token,
            usuario: {
                id: usuario.id_usuarios,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });

    } catch (error) {
        console.error("🔥 Erro interno no Controller:", error);
        return res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

module.exports = { login };