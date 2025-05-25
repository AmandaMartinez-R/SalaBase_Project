const pool = require('../config/database');

const Sala = {
  async criar(categoria, status, nome) {
    const result = await pool.query(
      'INSERT INTO salas (sala_id, categoria, status, nome) VALUES (gen_random_uuid(), $1, $2, $3) RETURNING *',
      [categoria, status, nome]
    );
    return result.rows[0];
  },

  async listar() {
    const result = await pool.query('SELECT * FROM salas');
    return result.rows;
  },

  async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM salas WHERE sala_id = $1', [id]);
    return result.rows[0];
  },

  async deletar(id) {
    await pool.query('DELETE FROM salas WHERE sala_id = $1', [id]);
  }
};

module.exports = Sala;
