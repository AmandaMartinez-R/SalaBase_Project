const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Importe seus controllers
const AtelieController = require('../controllers/AtelieController');
const UsuarioController = require('../controllers/UsuarioController');
const SalaController = require('../controllers/SalaController');
const GrupoController = require('../controllers/GrupoController');
const ReservaController = require('../controllers/ReservaController');
const GrupoUsuarioController = require('../controllers/GrupoUsuarioController');

// Rota para a página principal
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Home',
    query: req.query // Passa os query parameters para o template
  });
});

// Rota para listar reservas (agora em /reservas)
router.get('/reservas', async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT * FROM reservas');
    res.render('reservas/listar', { reservas: result.rows });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Erro no servidor');
  } finally {
    if (client) client.release(); // Libera a conexão de volta para o pool
  }
});

// Renderizar formulário de nova reserva
router.get('/reservas/nova', (req, res) => {
  res.render('reservas/form', { mode: 'create' });
});

// Renderizar formulário de edição
router.get('/reservas/editar/:id', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, s.nome as nome_sala, 
             CONCAT(u.nome, ' ', u.sobrenome) as nome_usuario,
             g.numero as numero_grupo
      FROM reservas r
      LEFT JOIN salas s ON r.sala_id = s.sala_id
      LEFT JOIN usuario u ON r.usuario_id = u.usuario_id
      LEFT JOIN grupo g ON r.grupo_id = g.grupo_id
      WHERE r.reservas_id = $1
    `, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).render('error', { message: 'Reserva não encontrada' });
    }

    const reserva = result.rows[0];
    // Formatar a data para o input type="date"
    reserva.data = reserva.data.toISOString().split('T')[0];
    
    res.render('reservas/form', { 
      mode: 'edit',
      reserva: reserva
    });
  } catch (error) {
    console.error('Erro ao carregar reserva:', error);
    res.status(500).render('error', { message: 'Erro ao carregar reserva' });
  }
});

// Rota para listar salas
router.get('/salas', async (req, res) => {
    res.render('desenvolvimento/desenvolvimento', {
    // Você pode passar variáveis adicionais se necessário
      maintenanceTime: "30 minutos",
      progress: 75
  });
  // try {
  //   const result = await pool.query('SELECT * FROM salas');
  //   res.render('salas/listar', { 
  //     salas: result.rows,
  //     messages: req.flash() 
  //   });
  // } catch (err) {
  //   console.error('Database error:', err);
  //   res.status(500).send('Erro no servidor');
  // }
});

// Renderizar formulário de nova sala
router.get('/salas/nova', (req, res) => {
  res.render('salas/form', { 
    mode: 'create',
    sala: {} 
  });
});

// Renderizar formulário de edição de sala
router.get('/salas/editar/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM salas WHERE sala_id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).render('error', { message: 'Sala não encontrada' });
    }

    res.render('salas/form', { 
      mode: 'edit',
      sala: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao carregar sala:', error);
    res.status(500).render('error', { message: 'Erro ao carregar sala' });
  }
});


// Rotas API (agrupadas por /api)
router.post('/api/atelies', AtelieController.criarAtelie);
router.get('/api/atelies', AtelieController.listarAtelies);
router.put('/api/atelies/:atelie_id', AtelieController.editarAtelie);
router.delete('/api/atelies/:atelie_id', AtelieController.excluirAtelie);

// Rotas para Usuario
router.post('/api/usuarios', UsuarioController.criarUsuario);
router.get('/api/usuarios', UsuarioController.listarUsuarios);
router.put('/api/usuarios/:usuario_id', UsuarioController.editarUsuario);
router.delete('/api/usuarios/:usuario_id', UsuarioController.excluirUsuario);

// Rotas para Sala
router.post('/api/salas', SalaController.criarSala);
router.get('/api/salas', SalaController.listarSalas);
router.put('/api/salas/:sala_id', SalaController.editarSala);
router.delete('/api/salas/:sala_id', SalaController.excluirSala);

// Rotas para Grupo
router.post('/api/grupos', GrupoController.criarGrupo);
router.get('/api/grupos', GrupoController.listarGrupos);
router.put('/api/grupos/:grupo_id', GrupoController.editarGrupo);
router.delete('/api/grupos/:grupo_id', GrupoController.excluirGrupo);

// Rotas para Reserva
router.post('/api/reservas', ReservaController.criarReserva);
router.get('/api/reservas', ReservaController.listarReservas);
router.put('/api/reservas/:reservas_id', ReservaController.editarReserva);
router.delete('/api/reservas/:reservas_id', ReservaController.excluirReserva);

// Rotas para GrupoUsuario
router.post('/api/grupo-usuarios', GrupoUsuarioController.criarGrupoUsuario);
router.get('/api/grupo-usuarios', GrupoUsuarioController.listarGrupoUsuarios);
router.put('/api/grupo-usuarios/:grupo_usuario_id', GrupoUsuarioController.editarGrupoUsuario);
router.delete('/api/grupo-usuarios/:grupo_usuario_id', GrupoUsuarioController.excluirGrupoUsuario);

module.exports = router;