// Carrega .env
require('dotenv').config();

// Importa app
const app = require('./src/app');

// Define porta
const PORT = process.env.PORT || 3000;

// Sobe servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});