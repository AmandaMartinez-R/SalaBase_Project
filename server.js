// server.js
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

app.set('view engine', 'ejs');
app.set('views', path.join (__dirname,'./views'));

// Usando as rotas definidas
app.use('/api', routes);
app.use('/',routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});