const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Criar uma nova sala
exports.criarSala = async (req, res) => {
  const { categoria, status, nome } = req.body;
  const sala_id = uuidv4();

  const query = 'INSERT INTO salas (sala_id, categoria, status, nome) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [sala_id, categoria, status, nome];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as salas
exports.listarSalas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM salas');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma sala
exports.editarSala = async (req, res) => {
  const { sala_id } = req.params;
  const { categoria, status, nome } = req.body;

  const query = `
    UPDATE salas SET categoria = $1, status = $2, nome = $3
    WHERE sala_id = $4 RETURNING *`;
  const values = [categoria, status, nome, sala_id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma sala
exports.excluirSala = async (req, res) => {
  const { sala_id } = req.params;

  const query = 'DELETE FROM salas WHERE sala_id = $1 RETURNING *';
  const values = [sala_id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json({ message: 'Sala excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};