const { ApplicationDatabaseMappingDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');

module.exports.GET_getAllDatabaseTypes = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const result = await ApplicationDatabaseMappingDao.getAllDatabaseTypes();
    return _200(httpResponse, result);
  } catch (err) {
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
  try {
    const result = await ApplicationDatabaseMappingDao.getAllDatabases();
    return _200(httpResponse, result);
  } catch (err) {
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
  try {
    const database_application_mapping_id =
      httpRequest.query.database_application_mapping_id;

    const params = {
      database_application_mapping_id: database_application_mapping_id,
    };
    const result = await ApplicationDatabaseMappingDao.getDatabaseDetails(
      params
    );
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.POST_addDatabase = async (httpRequest, httpResponse, next) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
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
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.PUT_editDatabase = async (httpRequest, httpResponse, next) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
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
    console.log(values);
    const params = {
      values: values,
    };
    const result = await ApplicationDatabaseMappingDao.editDatabase(params);
    return _200(httpResponse, result);
  } catch (err) {
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
  try {
    const database_application_mapping_id =
      httpRequest.body.database.database_application_mapping_id;

    const params = {
      database_application_mapping_id: database_application_mapping_id,
    };
    const result = await ApplicationDatabaseMappingDao.deleteDatabase(params);
    return _200(httpResponse, result);
  } catch {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};
