const { ApplicationDatabaseMappingDao, UserDao } = require('../dao/index');
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
    const result = await ApplicationDatabaseMappingDao.getAllDatabaseTypes();
    logger.info(`GET: Database types | user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: Database types | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err,
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
    const params = {
      user_id: user_id,
    };
    const user_details = await UserDao.getUserDetails(params);
    const user_type = user_details[0]['UT_Name'];
    let result;
    if (user_type == 'AD') {
      result = await ApplicationDatabaseMappingDao.getAllDatabases();
    } else {
      result =
        await ApplicationDatabaseMappingDao.getAllDatabasesMappedForAnUser(
          params
        );
    }
    logger.info(`GET: Application database mappings | user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Application database mappings | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err,
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
    const database_application_mapping_id =
      httpRequest.query.database_application_mapping_id;
    const params = {
      database_application_mapping_id: database_application_mapping_id,
    };
    const result = await ApplicationDatabaseMappingDao.getDatabaseDetails(
      params
    );
    logger.info(
      `GET: Database Details | user_id: ${user_id} | database_mapping_id: ${database_application_mapping_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: Database Details | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.POST_addDatabase = async (httpRequest, httpResponse, next) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.database.application_id,
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
    const result = await ApplicationDatabaseMappingDao.addDatabase(params);
    logger.info(
      `POST: Database | user_id: ${user_id} | database_details: ${result}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`POST: Database | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.PUT_editDatabase = async (httpRequest, httpResponse, next) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.database.database_application_mapping_id,
      httpRequest.body.database.application_id,
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
    const result = await ApplicationDatabaseMappingDao.editDatabase(params);
    logger.info(
      `PUT: Database details | user_id: ${user_id} | database_id: ${database_application_mapping_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`PUT: Database details | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err,
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
    const database_application_mapping_id =
      httpRequest.query.database_application_mapping_id;

    const params = {
      database_application_mapping_id: database_application_mapping_id,
    };
    const result = await ApplicationDatabaseMappingDao.deleteDatabase(params);
    logger.info(
      `DELETE: Database | user_id: ${user_id} | database_id: ${database_application_mapping_id}`
    );
    return _200(httpResponse, result);
  } catch {
    logger.error(`DELETE: Database | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};
