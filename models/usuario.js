const pool = require('../config/database');

const Usuario = {
  async criar(nome, sobrenome, email, atelie_id) {
    const result = await pool.query(
      'INSERT INTO usuario (usuario_id, nome, sobrenome, email, atelie_id) VALUES (gen_random_uuid(), $1, $2, $3, $4) RETURNING *',
      [nome, sobrenome, email, atelie_id]
    );
    return result.rows[0];
  },

  async listar() {
    const result = await pool.query('SELECT * FROM usuario');
    return result.rows;
  },

  async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM usuario WHERE usuario_id = $1', [id]);
    return result.rows[0];
  },

  async deletar(id) {
    await pool.query('DELETE FROM usuario WHERE usuario_id = $1', [id]);
  }
};

module.exports = Usuario;
