const { ApplicationScreenDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');

module.exports.GET_getAllApplicationScreens = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const result = await ApplicationScreenDao.getAllApplicationScreens();
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.GET_getScreenDetails = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const screen_id = httpRequest.body.screen.screen_id;
    const params = {
      screen_id: screen_id,
    };
    const result = await ApplicationScreenDao.getScreenDetails(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.POST_addApplicationScreen = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const values = [
      httpRequest.body.screen.screen_name,
      httpRequest.body.screen.added_by,
      httpRequest.body.screen.updated_by,
    ];
    const params = {
      values: values,
    };
    const result = await ApplicationScreenDao.addApplicationScreen(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.PUT_editApplicationScreen = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const values = [
      httpRequest.body.screen.screen_id,
      httpRequest.body.screen.screen_name,
      httpRequest.body.screen.updated_by,
    ];
    const params = {
      values: values,
    };
    const result = await ApplicationScreenDao.editApplicationScreen(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.DELETE_deleteApplicationScreen = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const screen_id = httpRequest.body.screen.screen_id;
    const params = {
      screen_id: screen_id,
    };
    const result = await ApplicationScreenDao.deleteScreen(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};
