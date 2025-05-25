const pool = require('../config/database');

const GrupoUsuario = {
  async criar(grupo_id, usuario_id) {
    const result = await pool.query(
      'INSERT INTO grupo_usuario (grupo_usuario_id, grupo_id, usuario_id) VALUES (gen_random_uuid(), $1, $2) RETURNING *',
      [grupo_id, usuario_id]
    );
    return result.rows[0];
  },

  async listar() {
    const result = await pool.query('SELECT * FROM grupo_usuario');
    return result.rows;
  },

  async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM grupo_usuario WHERE grupo_usuario_id = $1', [id]);
    return result.rows[0];
  },

  async deletar(id) {
    await pool.query('DELETE FROM grupo_usuario WHERE grupo_usuario_id = $1', [id]);
  }
};

module.exports = GrupoUsuario;
