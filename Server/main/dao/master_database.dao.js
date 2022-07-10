const pool = require('../db/index');
const { MasterDatabaseQuery } = require('../query');

module.exports.getAllDatabaseTypes = async () => {
  try {
    const result = await pool.query(
      MasterDatabaseQuery.SELECT_ALL_DATABASE_TYPES
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllDatabases = async () => {
  try {
    const result = await pool.query(
      MasterDatabaseQuery.SELECT_ALL_MAPPED_DATABASES
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getDatabaseDetails = async (params) => {
  try {
    const master_database_id = params.master_database_id;
    const result = await pool.query(MasterDatabaseQuery.GET_DATABASE_DETAILS, [
      master_database_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addDatabase = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(MasterDatabaseQuery.ADD_DATABASE, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editDatabase = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(MasterDatabaseQuery.EDIT_DATABASE, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteDatabase = async (params) => {
  try {
    const database_id = params.database_id;
    const result = await pool.query(MasterDatabaseQuery.DELETE_DATABASE, [
      database_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
