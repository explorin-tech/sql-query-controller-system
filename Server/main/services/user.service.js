const { UserDao } = require('../dao/index');

module.exports.GET_getAllUsers = (req, res, next) => {
  const response = UserDao.getAllUsers(req, res, next);
  return response;
};

module.exports.GET_getUserDetails = (req, res, next) => {
  const user_id = req.body.user.user_id;
  const params = {
    user_id: user_id,
  };
  const response = UserDao.getUserDetails(req, res, next, params);
  return response;
};
