const pool = require('../config/database');

const Grupo = {
  async criar(numero, atelie, usuario) {
    const result = await pool.query(
      'INSERT INTO grupo (grupo_id, numero, atelie, usuario) VALUES (gen_random_uuid(), $1, $2, $3) RETURNING *',
      [numero, atelie, usuario]
    );
    return result.rows[0];
  },

  async listar() {
    const result = await pool.query('SELECT * FROM grupo');
    return result.rows;
  },

  async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM grupo WHERE grupo_id = $1', [id]);
    return result.rows[0];
  },

  async deletar(id) {
    await pool.query('DELETE FROM grupo WHERE grupo_id = $1', [id]);
  }
};

module.exports = Grupo;
