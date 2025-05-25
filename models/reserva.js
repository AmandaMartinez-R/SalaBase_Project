const pool = require('../config/database');

const Reserva = {
  async criar(hora_inicio, data, status, hora_final, sala_id, usuario_id, grupo_id) {
    const result = await pool.query(
      `INSERT INTO reservas (reservas_id, hora_inicio, data, status, hora_final, sala_id, usuario_id, grupo_id)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [hora_inicio, data, status, hora_final, sala_id, usuario_id, grupo_id]
    );
    return result.rows[0];
  },

  async listar() {
    const result = await pool.query('SELECT * FROM reservas');
    return result.rows;
  },

  async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM reservas WHERE reservas_id = $1', [id]);
    return result.rows[0];
  },

  async deletar(id) {
    await pool.query('DELETE FROM reservas WHERE reservas_id = $1', [id]);
  }
};

module.exports = Reserva;
