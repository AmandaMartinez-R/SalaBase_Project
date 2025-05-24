const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Criar um novo grupo
exports.criarGrupo = async (req, res) => {
  const { numero, atelie, usuario } = req.body;
  const grupo_id = uuidv4();

  const query = 'INSERT INTO grupo (grupo_id, numero, atelie, usuario) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [grupo_id, numero, atelie, usuario];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os grupos
exports.listarGrupos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM grupo');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar um grupo
exports.editarGrupo = async (req, res) => {
  const { grupo_id } = req.params;
  const { numero, atelie, usuario } = req.body;

  const query = `
    UPDATE grupo SET numero = $1, atelie = $2, usuario = $3
    WHERE grupo_id = $4 RETURNING *`;
  const values = [numero, atelie, usuario, grupo_id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Grupo não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um grupo
exports.excluirGrupo = async (req, res) => {
  const { grupo_id } = req.params;

  const query = 'DELETE FROM grupo WHERE grupo_id = $1 RETURNING *';
  const values = [grupo_id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Grupo não encontrado' });
    }
    res.status(200).json({ message: 'Grupo excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};