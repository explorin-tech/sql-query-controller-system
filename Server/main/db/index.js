require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  host: 'sql-support-desk-instance.c7csrrpjyten.ap-south-1.rds.amazonaws.com',
  user: 'jai',
  database: 'postgres',
  password: 'jaisoni2004',
  port: 5432,
});

module.exports = pool;
