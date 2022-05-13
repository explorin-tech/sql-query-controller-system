const { UserDao } = require('../dao/index');

module.exports.GET_getAllUserTypes = (req, res, next) => {
  const response = UserDao.getAllUserTypes(req, res, next);
  return response;
};

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

module.exports.POST_addNewUser = (req, res, next) => {
  const values = [
    req.body.user.first_name,
    req.body.user.last_name,
    req.body.user.email,
    req.body.user.password,
    req.body.user.user_type_id,
    req.body.user.added_by,
    req.body.user.updated_by,
    req.body.user.is_active,
    req.body.user.is_active_direct_user,
  ];
  const params = {
    values: values,
  };
  const response = UserDao.addUser(req, res, next, params);
  return response;
};

module.exports.PUT_editUserDetails = (req, res, next) => {
  const values = [
    req.body.user.user_id,
    req.body.user.first_name,
    req.body.user.last_name,
    req.body.user.email,
    req.body.user.password,
    req.body.user.user_type_id,
    req.body.user.updated_by,
    req.body.user.is_active,
    req.body.user.is_active_direct_user,
  ];
  const params = {
    values: values,
  };
  const response = UserDao.editUser(req, res, next, params);
  return response;
};

module.exports.POST_deleteUser = (req, res, next) => {
  const user_id = req.body.user_id;
  const params = {
    user_id: user_id,
  };
  const response = UserDao.deleteUser(req, res, next, params);
  return response;
};
