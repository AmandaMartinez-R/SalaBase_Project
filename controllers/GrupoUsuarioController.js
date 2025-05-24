const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Criar um novo grupo-usuario
exports.criarGrupoUsuario = async (req, res) => {
  const { grupo_id, usuario_id } = req.body;
  const grupo_usuario_id = uuidv4();

  const query = 'INSERT INTO grupo_usuario (grupo_usuario_id, grupo_id, usuario_id) VALUES ($1, $2, $3) RETURNING *';
  const values = [grupo_usuario_id, grupo_id, usuario_id];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os grupo-usuarios
exports.listarGrupoUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM grupo_usuario');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarGrupoUsuario = async (req, res) => {
  // corpo da função
};

exports.excluirGrupoUsuario = async (req, res) => {
  try {
    // lógica para excluir o grupo usuário
    res.status(200).send({ message: 'Grupo usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao excluir grupo usuário' });
  }
};