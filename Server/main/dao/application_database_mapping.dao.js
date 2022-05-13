const pool = require('../db/index');
const { ApplicationDatabaseMappingQuery } = require('../query');

module.exports.getAllDatabases = (req, res, next) => {
  pool.query(
    ApplicationDatabaseMappingQuery.SELECT_ALL_MAPPED_DATABASES,
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};
