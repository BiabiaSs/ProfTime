const express = require('express');
const cors = require('cors');
// Cria aplicação
const app = express();
app.use(cors());

// Permite receber JSON
app.use(express.json());

// 🔥 LOG GLOBAL (pra ver se chega requisição)
app.use((req, res, next) => {
  console.log("📡", req.method, req.url);
  next();
});

// Importa rotas
const loginRoutes = require('./routes/loginRoutes');
const recuperarRoutes = require('./routes/recuperarRoutes');
const redefinirRoutes = require('./routes/redefinirRoutes');
const cursoRoutes = require('./routes/cursoRoutes');


// Usa rotas (todas começam com /)
app.use('/login', loginRoutes);
app.use('/recuperarSenha', recuperarRoutes);
app.use('/redefinirSenha', redefinirRoutes);
app.use('/curso', cursoRoutes);


// Exporta app
module.exports = app;