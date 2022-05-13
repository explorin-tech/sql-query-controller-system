const { ApplicationDatabaseMappingDao } = require('../dao/index');

module.exports.GET_allDatabases = (req, res, next) => {
  const response = ApplicationDatabaseMappingDao.getAllDatabases(
    req,
    res,
    next
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
