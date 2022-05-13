const { DatabaseTypesQuery } = require('../query');

module.exports.getAllDatabaseTypes = (req, res, next) => {
  pool.query(DatabaseTypesQuery.SELECT_ALL_DATABASE_TYPES, (q_err, q_res) => {
    return res.json(q_res.rows);
  });
};
