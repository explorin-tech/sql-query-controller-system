const { ApplicationDatabaseMappingDao } = require('../dao/index');

module.exports.GET_allDatabases = (req, res, next) => {
  const response = ApplicationDatabaseMappingDao.getAllDatabases(
    req,
    res,
    next
  );
  return response;
};
