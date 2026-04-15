const app = require('./src/app');

const PORT = 3006;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});