const pool = require('../config/database');

const Atelie = {
  async criar(nome) {
    const result = await pool.query(
      'INSERT INTO atelie (atelie_id, nome) VALUES (gen_random_uuid(), $1) RETURNING *',
      [nome]
    );
    return result.rows[0];
  },

  async listar() {
    const result = await pool.query('SELECT * FROM atelie');
    return result.rows;
  },

  async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM atelie WHERE atelie_id = $1', [id]);
    return result.rows[0];
  },

  async deletar(id) {
    await pool.query('DELETE FROM atelie WHERE atelie_id = $1', [id]);
  }
};

module.exports = Atelie;
