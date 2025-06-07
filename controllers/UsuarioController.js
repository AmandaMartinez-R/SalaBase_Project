const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Criar um novo usuário
exports.criarUsuario = async (req, res) => {
  const { nome, sobrenome, email, atelie_id } = req.body;
  const usuario_id = uuidv4();

  const query = 'INSERT INTO usuario (usuario_id, nome, sobrenome, email, atelie_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [usuario_id, nome, sobrenome, email, atelie_id];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // Listar um usuário específico mais simples para conferir a rota
// exports.listarUsuarios = (req, res) => {
//   res.send('Rota listarUsuarios funcionando!');
// };

// Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuario');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar um usuário
exports.editarUsuario = async (req, res) => {
  const { usuario_id } = req.params;
  const { nome, sobrenome, email, atelie_id } = req.body;

  const query = `
    UPDATE usuario SET nome = $1, sobrenome = $2, email = $3, atelie_id = $4
    WHERE usuario_id = $5 RETURNING *`;
  const values = [nome, sobrenome, email, atelie_id, usuario_id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um usuário
exports.excluirUsuario = async (req, res) => {
  const { usuario_id } = req.params;

  const query = 'DELETE FROM usuario WHERE usuario_id = $1 RETURNING *';
  const values = [usuario_id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};