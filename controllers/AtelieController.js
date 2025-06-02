const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Criar um novo ateliêB(POST)
exports.criarAtelie = async (req, res) => {
  const { nome } = req.body;
  const atelie_id = uuidv4();

  const query = 'INSERT INTO atelie (atelie_id, nome) VALUES ($1, $2) RETURNING *';
  const values = [atelie_id, nome];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os ateliês (GET)
exports.listarAtelies = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM atelie');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar um ateliê (PUT)

exports.editarAtelie = async (req, res) => {
  const { atelie_id } = req.params;
  const { nome } = req.body;

  const query = 'UPDATE atelie SET nome = $1 WHERE atelie_id = $2 RETURNING *';
  const values = [nome, atelie_id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ateliê não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um ateliê (DELETE)
exports.excluirAtelie = async (req, res) => {
  const { atelie_id } = req.params;

  const query = 'DELETE FROM atelie WHERE atelie_id = $1 RETURNING *';
  const values = [atelie_id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ateliê não encontrado' });
    }
    res.status(200).json({ message: 'Ateliê excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};