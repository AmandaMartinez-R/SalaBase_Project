const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));  // Arquivos prontos para produção
app.use('/assets', express.static(path.join(__dirname, 'assets')));  // Arquivos de desenvolvimento

// Configuração do EJS (deve ser feito apenas no app principal)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Usando as rotas definidas
app.use('/', routes); // Todas as rotas estão definidas no router

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Código para lidar com erros não tratados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  // Não force o encerramento imediato, apenas registre
});