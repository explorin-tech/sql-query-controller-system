const { UserDao } = require('../dao/index');

module.exports.GET_getAllUsers = (req, res, next) => {
  const response = UserDao.getAllUsers(req, res, next);
  return response;
};
