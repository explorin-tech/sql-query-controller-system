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
    ApplicationDatabaseMappingQuery.EDIT_DATABASE_MAPPING,
    values,
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};

module.exports.deleteDatabase = (req, res, next, params) => {
  const database_application_mapping_id =
    params.database_application_mapping_id;
  pool.query(
    ApplicationDatabaseMappingQuery.DELETE_DATABASE_MAPPING,
    [database_application_mapping_id],
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};
