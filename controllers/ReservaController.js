const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

exports.buscarPorId = async (reservas_id) => {
  try {
    const result = await pool.query(`
      SELECT r.*, s.nome as nome_sala, 
             CONCAT(u.nome, ' ', u.sobrenome) as nome_usuario,
             g.numero as numero_grupo
      FROM reservas r
      LEFT JOIN salas s ON r.sala_id = s.sala_id
      LEFT JOIN usuario u ON r.usuario_id = u.usuario_id
      LEFT JOIN grupo g ON r.grupo_id = g.grupo_id
      WHERE r.reservas_id = $1
    `, [reservas_id]);
    
    if (result.rows.length === 0) return null;
    
    const reserva = result.rows[0];
    // Formatar a data para o input type="date"
    reserva.data = reserva.data.toISOString().split('T')[0];
    
    return reserva;
  } catch (error) {
    console.error('Erro ao buscar reserva por ID:', error);
    throw error;
  }
};

async function verificarDisponibilidade(sala_id, data, hora_inicio, hora_final, reserva_id = null) {
  const query = `
    SELECT * FROM reservas 
    WHERE sala_id = $1 
    AND data = $2 
    AND (
      (hora_inicio < $4 AND hora_final > $3)
      OR (hora_inicio >= $3 AND hora_inicio < $4)
      OR (hora_final > $3 AND hora_final <= $4)
    )
    ${reserva_id ? 'AND reservas_id != $5' : ''}
  `;
  
  const values = [sala_id, data, hora_inicio, hora_final];
  if (reserva_id) values.push(reserva_id);

  const result = await pool.query(query, values);
  return result.rows.length === 0;
}

// Criar uma nova reserva
exports.criarReserva = async (req, res) => {
  const { hora_inicio, data, status, hora_final, sala_id, usuario_id, grupo_id } = req.body;
  const reservas_id = uuidv4();

  try {
    // Verificar se foi enviado usuário OU grupo (não ambos)
    if (!usuario_id && !grupo_id) {
      return res.status(400).json({ message: 'Informe um usuário ou grupo para a reserva.' });
    }

    // Verificar disponibilidade da sala
    const disponivel = await verificarDisponibilidade(sala_id, data, hora_inicio, hora_final);
    if (!disponivel) {
      return res.status(400).json({ message: 'Sala já reservada neste horário.' });
    }

    // Validar horários
    if (new Date(`1970-01-01T${hora_final}`) <= new Date(`1970-01-01T${hora_inicio}`)) {
      return res.status(400).json({ message: 'Horário final deve ser após o horário inicial.' });
    }

    const query = `INSERT INTO reservas 
      (reservas_id, hora_inicio, data, status, hora_final, sala_id, usuario_id, grupo_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const values = [reservas_id, hora_inicio, data, status || 'pendente', hora_final, sala_id, usuario_id, grupo_id];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error('Erro ao criar reserva:', err);
    res.status(500).json({ 
      error: 'Erro interno no servidor',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Listar todas as reservas
exports.listarReservas = async (req, res) => {
  try {
    const query = `
      SELECT 
        r.reservas_id,
        r.data,
        r.hora_inicio,
        r.hora_final,
        s.nome AS nome_sala,
        CONCAT(u.nome, ' ', u.sobrenome) AS nome_usuario,
        g.numero AS numero_grupo
      FROM reservas r
      LEFT JOIN salas s ON r.sala_id = s.sala_id
      LEFT JOIN usuario u ON r.usuario_id = u.usuario_id
      LEFT JOIN grupo g ON r.grupo_id = g.grupo_id
      ORDER BY r.data, r.hora_inicio
    `;
    
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma reserva
exports.editarReserva = async (req, res) => {
  const { reservas_id } = req.params;
  const { hora_inicio, data, hora_final, sala_id, usuario_id, grupo_id } = req.body;

  try {
    // Verificar se foi enviado usuário OU grupo (não ambos)
    if (!usuario_id && !grupo_id) {
      return res.status(400).json({ message: 'Informe um usuário ou grupo para a reserva.' });
    }

    // Verificar disponibilidade da sala (excluindo a própria reserva)
    const disponivel = await verificarDisponibilidade(sala_id, data, hora_inicio, hora_final, reservas_id);
    if (!disponivel) {
      return res.status(400).json({ message: 'Sala já reservada neste horário.' });
    }

    // Validar horários
    if (new Date(`1970-01-01T${hora_final}`) <= new Date(`1970-01-01T${hora_inicio}`)) {
      return res.status(400).json({ message: 'Horário final deve ser após o horário inicial.' });
    }

    const query = `
      UPDATE reservas SET 
        hora_inicio = $1, 
        data = $2, 
        hora_final = $3, 
        sala_id = $4, 
        usuario_id = $5, 
        grupo_id = $6
      WHERE reservas_id = $7 
      RETURNING *`;
    
    const values = [
      hora_inicio, 
      data, 
      hora_final, 
      sala_id, 
      usuario_id || null, // Garante null se não houver usuario_id
      grupo_id || null,   // Garante null se não houver grupo_id
      reservas_id
    ];

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao editar reserva:', err);
    res.status(500).json({ 
      error: 'Erro interno no servidor',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};


// Excluir uma reserva
exports.excluirReserva = async (req, res) => {
  const { reservas_id } = req.params;

  const query = 'DELETE FROM reservas WHERE reservas_id = $1 RETURNING *';
  const values = [reservas_id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json({ message: 'Reserva excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};