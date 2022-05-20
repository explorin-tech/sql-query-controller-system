const { UserDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');
const { generateHashedPassword } = require('../common/authHelper');

module.exports.GET_getAllUserTypes = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const result = await UserDao.getAllUserTypes();
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.GET_getAllUsers = async (httpRequest, httpResponse, next) => {
  try {
    const result = await UserDao.getAllUsers();
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.GET_getUserDetails = async (httpRequest, httpResponse, next) => {
  try {
    const user_id = httpRequest.body.user.user_id;
    const params = {
      user_id: user_id,
    };
    const result = await UserDao.getUserDetails(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.POST_addNewUser = async (httpRequest, httpResponse, next) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    const hashedPassword = await generateHashedPassword(
      httpRequest.body.user.password
    );
    const values = [
      httpRequest.body.user.first_name,
      httpRequest.body.user.last_name,
      httpRequest.body.user.email,
      hashedPassword,
      httpRequest.body.user.user_type_id,
      user_id,
      user_id,
      httpRequest.body.user.is_active,
      httpRequest.body.user.is_active_direct_user,
    ];
    const params = {
      values: values,
    };
    const result = await UserDao.addUser(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.PUT_editUserDetails = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    const hashedPassword = await generateHashedPassword(
      httpRequest.body.user.password
    );
    const values = [
      httpRequest.body.user.user_id,
      httpRequest.body.user.first_name,
      httpRequest.body.user.last_name,
      httpRequest.body.user.email,
      hashedPassword,
      httpRequest.body.user.user_type_id,
      user_id,
      httpRequest.body.user.is_active,
      httpRequest.body.user.is_active_direct_user,
    ];
    const params = {
      values: values,
    };
    const result = await UserDao.editUser(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.POST_deleteUser = async (httpRequest, httpResponse, next) => {
  try {
    const user_id = httpRequest.body.user_id;
    const params = {
      user_id: user_id,
    };
    const result = await UserDao.deleteUser(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};
