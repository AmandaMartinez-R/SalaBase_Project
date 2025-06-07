// config/database.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 5,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000,
  ssl: {
    rejectUnauthorized: false 
  }
});

// Listeners para erros do pool
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;