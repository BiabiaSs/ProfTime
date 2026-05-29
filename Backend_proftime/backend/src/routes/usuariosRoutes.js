const express = require('express');
const router = express.Router();
const banco = require('../database/conexao');

// rota de teste
router.get('/teste', (req, res) => {
  res.send('Rota usuários funcionando');
});

// criar usuário
router.post('/criar', async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body || {};

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ erro: 'Preencha todos os campos' });
    }

    const sql = `
      INSERT INTO usuarios (nome, email, senha, tipo)
      VALUES (?, ?, ?, ?)
    `;

    await banco.query(sql, [
      nome,
      email.toLowerCase().trim(),
      senha,
      tipo
    ]);

    res.json({ msg: 'Usuário criado com sucesso' });

  } catch (erro) {
    console.error('Erro ao criar usuário:', erro);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

// excluir usuário
router.delete('/excluir/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'DELETE FROM usuarios WHERE id_usuarios = ?';

    const [resultado] = await banco.query(sql, [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json({ msg: 'Usuário excluído com sucesso' });

  } catch (erro) {
    console.error('Erro ao excluir usuário:', erro);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

module.exports = router;