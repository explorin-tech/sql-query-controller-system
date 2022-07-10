const { DatabaseApplicationMappingDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');

module.exports.GET_getAllDatabaseMappings = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result =
      await DatabaseApplicationMappingDao.getAllDatabaseApplicationMappings();
    logger.info(`GET: All Database Application Mappings | user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getAllDatabaseApplicationMappingsForAnUser = async (
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
    const result =
      await DatabaseApplicationMappingDao.getAllDatabaseApplicationMappingsForAnUser(
        params
      );
    logger.info(
      `GET: All Database Application Mappings For An User | user_id: ${user_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getDatabaseApplicationMappingDetails = async (
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
    const result =
      await DatabaseApplicationMappingDao.getDatabaseApplicationMappingDetails(
        params
      );
    logger.info(
      `GET: All Database Application Mapping Details | user_id: ${user_id} | database_application_mapping_id: ${database_application_mapping_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addDatabaseApplicationMapping = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.database_application_mapping.application_id,
      httpRequest.body.database_application_mapping.database_id,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result =
      await DatabaseApplicationMappingDao.addDatabaseApplicationMapping(params);
    logger.info(
      `POST : Add new Database Application Mapping | user_id: ${user_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editDatabaseApplicationMapping = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.database_application_mapping
        .database_application_mapping_id,
      httpRequest.body.database_application_mapping.application_id,
      httpRequest.body.database_application_mapping.database_id,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result =
      await DatabaseApplicationMappingDao.editDatabaseApplicationMapping(
        params
      );
    logger.info(
      `PUT : Edit Database Application Mapping | user_id: ${user_id} | database_application_mapping_id: ${httpRequest.body.database_application_mapping.database_application_mapping_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.DELETE_deleteDatabaseApplicationMapping = async (
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
    const result =
      await DatabaseApplicationMappingDao.deleteDatabaseApplication(params);
    logger.info(
      `DELETE : Delete Database Application Mapping | user_id: ${user_id} | database_application_mapping_id: ${database_application_mapping_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
