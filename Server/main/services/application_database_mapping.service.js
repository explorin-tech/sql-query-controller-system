const { ApplicationDatabaseMappingDao } = require('../dao/index');

module.exports.GET_getAllDatabaseTypes = (req, res, next) => {
  const response = ApplicationDatabaseMappingDao.getAllDatabaseTypes(
    req,
    res,
    next
  );
  return response;
};

module.exports.GET_getAllDatabases = (req, res, next) => {
  const response = ApplicationDatabaseMappingDao.getAllDatabases(
    req,
    res,
    next
  );
  return response;
};

module.exports.GET_databaseDetails = (req, res, next) => {
  const database_application_mapping_id =
    req.body.database.database_application_mapping_id;

  const params = {
    database_application_mapping_id: database_application_mapping_id,
  };
  const response = ApplicationDatabaseMappingDao.getDatabaseDetails(
    req,
    res,
    next,
    params
  );
  return response;
};

module.exports.POST_addDatabase = (req, res, next) => {
  const values = [
    req.body.database.application_id,
    req.body.database.application_name,
    req.body.database.database_name,
    req.body.database.database_type_id,
    req.body.database.database_type_name,
    req.body.database.database_connection_string,
    req.body.database.database_port_number,
    req.body.database.database_host_name,
    req.body.database.database_user_name,
    req.body.database.database_password,
    req.body.database.added_by,
    req.body.database.updated_by,
  ];
  const params = {
    values: values,
  };
  const response = ApplicationDatabaseMappingDao.addDatabase(
    req,
    res,
    next,
    params
  );
  return response;
};

module.exports.PUT_editDatabase = (req, res, next) => {
  const values = [
    req.body.database.database_application_mapping_id,
    req.body.database.application_id,
    req.body.database.application_name,
    req.body.database.database_name,
    req.body.database.database_type_id,
    req.body.database.database_type_name,
    req.body.database.database_connection_string,
    req.body.database.database_port_number,
    req.body.database.database_host_name,
    req.body.database.database_user_name,
    req.body.database.database_password,
    req.body.database.updated_by,
  ];
  const params = {
    values: values,
  };
  const response = ApplicationDatabaseMappingDao.editDatabase(
    req,
    res,
    next,
    params
  );
  return response;
};

module.exports.DELETE_deleteDatabase = (req, res, next) => {
  const database_application_mapping_id =
    req.body.database.database_application_mapping_id;

  const params = {
    database_application_mapping_id: database_application_mapping_id,
  };
  const response = ApplicationDatabaseMappingDao.deleteDatabase(
    req,
    res,
    next,
    params
  );
};
