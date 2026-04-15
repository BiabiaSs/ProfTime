const express = require('express');
const router = express.Router();
const banco = require('../banco/conexaoBanco');

// rota de teste
router.get('/teste', (req, res) => {
  res.send('Rota usuários funcionando');
});

// criar usuário (admin, professor, coordenador)
router.post('/criar', (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  if (!nome || !email || !senha || !tipo) {
    return res.status(400).json({ erro: 'Preencha tudo' });
  }

  const sql = `
    INSERT INTO usuarios (nome, email, senha, tipo)
    VALUES (?, ?, ?, ?)
  `;

  banco.query(sql, [nome, email, senha, tipo], (erro) => {
    if (erro) {
      return res.status(500).json({ erro: erro.message });
    }

    res.json({ msg: 'Usuário criado com sucesso' });
  });
});

//excluir usuario

router.delete('/excluir/:id', (req, res) => {
  const { id_usuarios } = req.params;

  const sql = 'DELETE FROM usuarios WHERE id_usuarios = ?';

  banco.query(sql, [id_usuarios], (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ erro: erro.message });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json({ msg: 'Usuário excluído com sucesso' });
  });
});

module.exports = router;