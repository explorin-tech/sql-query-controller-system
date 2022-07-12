require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  host: 'cobranding-db.cwaupinwoyhl.ap-south-1.rds.amazonaws.com',
  user: 'pravin',
  database: 'postgres',
  password: 'India-123',
  port: 5432,
});

module.exports = pool;
