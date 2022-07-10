const { ApplicationScreenDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');

module.exports.GET_getAllApplicationScreens = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await ApplicationScreenDao.getAllApplicationScreens();
    logger.info(`GET: All application screens | user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: All application screens | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getScreenDetails = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const screen_id = httpRequest.body.screen.screen_id;
    const params = {
      screen_id: screen_id,
    };
    const result = await ApplicationScreenDao.getScreenDetails(params);
    logger.info(
      `GET: Application Screen Details | user_id: ${user_id} | screen_id: ${screen_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Application Screen Details | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addApplicationScreen = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [httpRequest.body.screen.screen_name, user_id, user_id];
    const params = {
      values: values,
    };
    const result = await ApplicationScreenDao.addApplicationScreen(params);
    logger.info(`POST: Add Application | user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`POST: Add Application | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editApplicationScreen = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.screen.screen_id,
      httpRequest.body.screen.screen_name,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result = await ApplicationScreenDao.editApplicationScreen(params);
    logger.info(`PUT: Edit Application Screen Details | user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`PUT: Edit Application Screen Details | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.DELETE_deleteApplicationScreen = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const screen_id = httpRequest.body.screen.screen_id;
    const params = {
      screen_id: screen_id,
    };
    const result = await ApplicationScreenDao.deleteScreen(params);
    logger.info(`DELETE: Application Screen | user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`DELETE: Application Screen | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
