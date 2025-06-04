// routes/index.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');



const AtelieController = require('../controllers/AtelieController');
const UsuarioController = require('../controllers/UsuarioController');
const SalaController = require('../controllers/SalaController');
const GrupoController = require('../controllers/GrupoController');
const ReservaController = require('../controllers/ReservaController');
const GrupoUsuarioController = require('../controllers/GrupoUsuarioController');

// Rotas para Atelie
router.post('/atelies', AtelieController.criarAtelie);
// router.get('/atelies', AtelieController.listarAtelies);
router.get('/atelies-view', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM atelie');
    res.render('atelies', { atelies: result.rows });
  } catch (err) {
    res.status(500).send(`Erro ao carregar ateliês: ${err.message}`);
  }
});

router.put('/atelies/:atelie_id', AtelieController.editarAtelie);
router.delete('/atelies/:atelie_id', AtelieController.excluirAtelie);

// Rotas para Usuario
router.post('/usuarios', UsuarioController.criarUsuario);
router.get('/usuarios', UsuarioController.listarUsuarios);
router.put('/usuarios/:usuario_id', UsuarioController.editarUsuario);
router.delete('/usuarios/:usuario_id', UsuarioController.excluirUsuario);

// Rotas para Sala
router.post('/salas', SalaController.criarSala);
router.get('/salas', SalaController.listarSalas);
router.put('/salas/:sala_id', SalaController.editarSala);
router.delete('/salas/:sala_id', SalaController.excluirSala);

// Rotas para Grupo
router.post('/grupos', GrupoController.criarGrupo);
router.get('/grupos', GrupoController.listarGrupos);
router.put('/grupos/:grupo_id', GrupoController.editarGrupo);
router.delete('/grupos/:grupo_id', GrupoController.excluirGrupo);

// Rotas para Reserva
router.post('/reservas', ReservaController.criarReserva);
router.get('/reservas', ReservaController.listarReservas);
router.put('/reservas/:reservas_id', ReservaController.editarReserva);
router.delete('/reservas/:reservas_id', ReservaController.excluirReserva);

// Rotas para GrupoUsuario
router.post('/grupo-usuarios', GrupoUsuarioController.criarGrupoUsuario);
router.get('/grupo-usuarios', GrupoUsuarioController.listarGrupoUsuarios);
router.put('/grupo-usuarios/:grupo_usuario_id', GrupoUsuarioController.editarGrupoUsuario);
router.delete('/grupo-usuarios/:grupo_usuario_id', GrupoUsuarioController.excluirGrupoUsuario);

module.exports = router;