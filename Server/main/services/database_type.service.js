const { DatabaseTypesDao } = require('../dao/index');

module.exports.GET_allDatabaseTypes = (req, res, next) => {
  const response = DatabaseTypesDao.getAllDatabaseTypes(req, res, next);
  return response;
};
