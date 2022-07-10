const pool = require('../db/index');
const { DatabaseApplicationMappingQuery } = require('../query');

module.exports.getAllDatabaseApplicationMappings = async () => {
  try {
    const result = await pool.query(
      DatabaseApplicationMappingQuery.GET_ALL_DATABASE_APPLICATION_MAPPINGS
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllDatabaseApplicationMappingsForAnUser = async (params) => {
  try {
    const user_id = params.user_id;
    const result = await pool.query(
      DatabaseApplicationMappingQuery.GET_ALL_DATABASE_APPLICATION_MAPPINGS_FOR_AN_USER,
      [user_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getDatabaseApplicationMappingDetails = async (params) => {
  try {
    const database_application_mapping_id =
      params.database_application_mapping_id;
    const result = await pool.query(
      DatabaseApplicationMappingQuery.GET_DATABASE_APPLICATION_MAPPING_DETAILS,
      [database_application_mapping_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addDatabaseApplicationMapping = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      DatabaseApplicationMappingQuery.INSERT_NEW_DATABASE_APPLICATION_MAPPING,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editDatabaseApplicationMapping = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      DatabaseApplicationMappingQuery.EDIT_DATABASE_APPLICATION_MAPPING,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteDatabaseApplication = async (params) => {
  try {
    const database_application_mapping_id =
      params.database_application_mapping_id;
    const result = await pool.query(
      DatabaseApplicationMappingQuery.DELETE_DATABASE_APPLICATION_MAPPING,
      [database_application_mapping_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};
