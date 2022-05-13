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

module.exports.addDatabase = (req, res, next, params) => {
  const values = params.values;
  pool.query(
    ApplicationDatabaseMappingQuery.ADD_DATABASE_MAPPING,
    values,
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};

module.exports.editDatabase = (req, res, next, params) => {
  const values = params.values;
  pool.query(
    ApplicationDatabaseMappingQuery.EDIT_A_DATABASE_MAPPING,
    values,
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};
