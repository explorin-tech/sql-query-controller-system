require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  database: process.env.RDS_DATABASE,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
});

module.exports = pool;
