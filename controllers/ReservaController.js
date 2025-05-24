const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Criar uma nova reserva
exports.criarReserva = async (req, res) => {
  const { hora_inicio, data, status, hora_final, sala_id, usuario_id, grupo_id } = req.body;
  const reservas_id = uuidv4();

  const query = `INSERT INTO reservas 
    (reservas_id, hora_inicio, data, status, hora_final, sala_id, usuario_id, grupo_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  const values = [reservas_id, hora_inicio, data, status, hora_final, sala_id, usuario_id, grupo_id];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as reservas
exports.listarReservas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservas');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma reserva
exports.editarReserva = async (req, res) => {
  const { reservas_id } = req.params;
  const { hora_inicio, data, status, hora_final, sala_id, usuario_id, grupo_id } = req.body;

  const query = `
    UPDATE reservas SET hora_inicio = $1, data = $2, status = $3, hora_final = $4, sala_id = $5, usuario_id = $6, grupo_id = $7
    WHERE reservas_id = $8 RETURNING *`;
  const values = [hora_inicio, data, status, hora_final, sala_id, usuario_id, grupo_id, reservas_id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma reserva
exports.excluirReserva = async (req, res) => {
  const { reservas_id } = req.params;

  const query = 'DELETE FROM reservas WHERE reservas_id = $1 RETURNING *';
  const values = [reservas_id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json({ message: 'Reserva excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};