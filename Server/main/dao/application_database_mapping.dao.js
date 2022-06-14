const pool = require('../db/index');
const { ApplicationDatabaseMappingQuery } = require('../query');

module.exports.getAllDatabaseTypes = async () => {
  try {
    const result = await pool.query(
      ApplicationDatabaseMappingQuery.SELECT_ALL_DATABASE_TYPES
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllDatabases = async () => {
  try {
    const result = await pool.query(
      ApplicationDatabaseMappingQuery.SELECT_ALL_MAPPED_DATABASES
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllDatabasesMappedForAnUser = async (params) => {
  try {
    const user_id = params.user_id;
    const result = await pool.query(
      ApplicationDatabaseMappingQuery.GET_APPLICATION_DATABASE_MAPPING_FOR_AN_USER,
      [user_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getDatabaseDetails = async (params) => {
  try {
    const database_application_mapping_id =
      params.database_application_mapping_id;
    const result = await pool.query(
      ApplicationDatabaseMappingQuery.GET_DATABASE_DETAILS,
      [database_application_mapping_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addDatabase = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      ApplicationDatabaseMappingQuery.ADD_DATABASE_MAPPING,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editDatabase = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      ApplicationDatabaseMappingQuery.EDIT_DATABASE_MAPPING,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteDatabase = async (params) => {
  try {
    const database_application_mapping_id =
      params.database_application_mapping_id;
    const result = await pool.query(
      ApplicationDatabaseMappingQuery.DELETE_DATABASE_MAPPING,
      [database_application_mapping_id]
    );
  } catch (err) {
    throw err;
  }
};
