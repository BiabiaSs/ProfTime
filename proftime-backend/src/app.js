require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const { recuperarSenha } = require('./controllers/RecuperarSenha');

app.post('/recuperar-senha', recuperarSenha);

/*const testeRota = require('./rotas/rotaTeste');
app.use('/teste', testeRota);*/


const rotasLogin = require('./rotas/rotasLogin');
const rotasUsuarios = require('./rotas/rotasUsuarios');

app.use('/login', rotasLogin);
app.use('/usuarios', rotasUsuarios);  
    
module.exports = app;