const { UserDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');
const { generateHashedPassword } = require('../common/authHelper');
const logger = require('../common/logger');

module.exports.GET_getAllUserTypes = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await UserDao.getAllUserTypes();
    logger.info(`GET: All user types | user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: All user types | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getAllUsers = async (httpRequest, httpResponse, next) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await UserDao.getAllUsers();
    logger.info(`GET: All users | user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: All users | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getUserDetails = async (httpRequest, httpResponse, next) => {
  try {
    let user_id;
    if (httpRequest.body.user) {
      user_id = httpRequest.body.user.user_id;
    } else {
      const { decoded } = httpRequest.headers;
      user_id = decoded.UserID;
    }
    const params = {
      user_id: user_id,
    };
    const result = await UserDao.getUserDetails(params);
    logger.info(`GET: User details | of user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: User details | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addNewUser = async (httpRequest, httpResponse, next) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
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
    logger.info(`POST: Add new User | by user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`POST: Add new User | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editUserDetails = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    let values;
    if (
      httpRequest.body.user.password &&
      httpRequest.body.user.password != ''
    ) {
      const hashedPassword = await generateHashedPassword(
        httpRequest.body.user.password
      );
      values = [
        httpRequest.body.user.user_id,
        httpRequest.body.user.first_name,
        httpRequest.body.user.last_name,
        httpRequest.body.user.email,
        httpRequest.body.user.user_type_id,
        user_id,
        httpRequest.body.user.is_active,
        httpRequest.body.user.is_active_direct_user,
        hashedPassword,
      ];
    } else {
      values = [
        httpRequest.body.user.user_id,
        httpRequest.body.user.first_name,
        httpRequest.body.user.last_name,
        httpRequest.body.user.email,
        httpRequest.body.user.user_type_id,
        user_id,
        httpRequest.body.user.is_active,
        httpRequest.body.user.is_active_direct_user,
      ];
    }
    const params = {
      values: values,
    };
    const result = await UserDao.editUser(params);
    logger.info(
      `PUT: Edit User Details | by user_id: ${user_id} | for user_id : ${httpRequest.body.user.user_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`PUT: Edit User Details | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_deleteUser = async (httpRequest, httpResponse, next) => {
  const { decoded } = httpRequest.headers;
  try {
    const user_id = httpRequest.query.user_id;
    const params = {
      user_id: user_id,
    };
    const result = await UserDao.deleteUser(params);
    logger.info(
      `DELETE: Delete User of user_id : ${user_id} | by user_id: ${decoded.UserID}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`DELETE: Delete User | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_UserTypesForDBConnection = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const result = await UserDao.getAllUserTypesForDBConnection();
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
