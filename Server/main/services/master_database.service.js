const { MasterDatabaseDao, UserDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');

module.exports.GET_getAllDatabaseTypes = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await MasterDatabaseDao.getAllDatabaseTypes();
    logger.info(`GET: Database types | user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: Database types | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getAllDatabases = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await MasterDatabaseDao.getAllDatabases();
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: All databases | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_databaseDetails = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const master_database_id = httpRequest.query.master_database_id;
    const params = {
      master_database_id: master_database_id,
    };
    const result = await MasterDatabaseDao.getDatabaseDetails(params);
    logger.info(
      `GET: Database Details | user_id: ${user_id} | database_mapping_id: ${master_database_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: Database Details | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addDatabase = async (httpRequest, httpResponse, next) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.database.database_name,
      httpRequest.body.database.database_type_id,
      httpRequest.body.database.database_connection_string,
      httpRequest.body.database.database_port_number,
      httpRequest.body.database.database_host_name,
      httpRequest.body.database.database_user_name,
      httpRequest.body.database.database_password,
      user_id,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result = await MasterDatabaseDao.addDatabase(params);
    logger.info(
      `POST: Database | user_id: ${user_id} | database_details: ${result}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`POST: Database | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editDatabase = async (httpRequest, httpResponse, next) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.database.database_id,
      httpRequest.body.database.database_name,
      httpRequest.body.database.database_type_id,
      httpRequest.body.database.database_connection_string,
      httpRequest.body.database.database_port_number,
      httpRequest.body.database.database_host_name,
      httpRequest.body.database.database_user_name,
      httpRequest.body.database.database_password,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result = await MasterDatabaseDao.editDatabase(params);
    logger.info(
      `PUT: Database details | user_id: ${user_id} | database_id: ${httpRequest.body.database.database_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`PUT: Database details | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.DELETE_deleteDatabase = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const database_id = httpRequest.query.database_id;

    const params = {
      database_id: database_id,
    };
    const result = await MasterDatabaseDao.deleteDatabase(params);
    logger.info(
      `DELETE: Database | user_id: ${user_id} | database_id: ${database_id}`
    );
    return _200(httpResponse, result);
  } catch {
    logger.error(`DELETE: Database | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
