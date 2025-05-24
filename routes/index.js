// routes/index.js
const express = require('express');
const router = express.Router();

const AtelieController = require('../controllers/AtelieController');
const UsuarioController = require('../controllers/UsuarioController');
const SalaController = require('../controllers/SalaController');
const GrupoController = require('../controllers/GrupoController');
const ReservaController = require('../controllers/ReservaController');
const GrupoUsuarioController = require('../controllers/GrupoUsuarioController');

// Rotas para Atelie
router.post('/atelies', AtelieController.criarAtelie);
router.get('/atelies', AtelieController.listarAtelies);
router.put('/atelies/:id', AtelieController.editarAtelie);
router.delete('/atelies/:id', AtelieController.excluirAtelie);

// Rotas para Usuario
router.post('/usuarios', UsuarioController.criarUsuario);
router.get('/usuarios', UsuarioController.listarUsuarios);
router.put('/usuarios/:id', UsuarioController.editarUsuario);
router.delete('/usuarios/:id', UsuarioController.excluirUsuario);

// Rotas para Sala
router.post('/salas', SalaController.criarSala);
router.get('/salas', SalaController.listarSalas);
router.put('/salas/:id', SalaController.editarSala);
router.delete('/salas/:id', SalaController.excluirSala);

// Rotas para Grupo
router.post('/grupos', GrupoController.criarGrupo);
router.get('/grupos', GrupoController.listarGrupos);
router.put('/grupos/:id', GrupoController.editarGrupo);
router.delete('/grupos/:id', GrupoController.excluirGrupo);

// Rotas para Reserva
router.post('/reservas', ReservaController.criarReserva);
router.get('/reservas', ReservaController.listarReservas);
router.put('/reservas/:id', ReservaController.editarReserva);
router.delete('/reservas/:id', ReservaController.excluirReserva);

// Rotas para GrupoUsuario
router.post('/grupo-usuarios', GrupoUsuarioController.criarGrupoUsuario);
router.get('/grupo-usuarios', GrupoUsuarioController.listarGrupoUsuarios);
router.put('/grupo-usuarios/:id', GrupoUsuarioController.editarGrupoUsuario);
router.delete('/grupo-usuarios/:id', GrupoUsuarioController.excluirGrupoUsuario);

module.exports = router;