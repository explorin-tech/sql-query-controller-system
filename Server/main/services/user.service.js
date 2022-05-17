const { UserDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');

module.exports.GET_getAllUserTypes = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const result = await UserDao.getAllUserTypes(
      httpRequest,
      httpResponse,
      next
    );
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
    const result = await UserDao.getAllUsers(httpRequest, httpResponse, next);
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
    const result = await UserDao.getUserDetails(
      httpRequest,
      httpResponse,
      next,
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

module.exports.POST_addNewUser = async (httpRequest, httpResponse, next) => {
  try {
    const values = [
      httpRequest.body.user.first_name,
      httpRequest.body.user.last_name,
      httpRequest.body.user.email,
      httpRequest.body.user.password,
      httpRequest.body.user.user_type_id,
      httpRequest.body.user.added_by,
      httpRequest.body.user.updated_by,
      httpRequest.body.user.is_active,
      httpRequest.body.user.is_active_direct_user,
    ];
    const params = {
      values: values,
    };
    const result = await UserDao.addUser(
      httpRequest,
      httpResponse,
      next,
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

module.exports.PUT_editUserDetails = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const values = [
      httpRequest.body.user.user_id,
      httpRequest.body.user.first_name,
      httpRequest.body.user.last_name,
      httpRequest.body.user.email,
      httpRequest.body.user.password,
      httpRequest.body.user.user_type_id,
      httpRequest.body.user.updated_by,
      httpRequest.body.user.is_active,
      httpRequest.body.user.is_active_direct_user,
    ];
    const params = {
      values: values,
    };
    const result = await UserDao.editUser(
      httpRequest,
      httpResponse,
      next,
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
