const { ApplicationScreenRightsMappingDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');

module.exports.GET_getAllScreenRightsMappingForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const user_id = httpRequest.body.screen_rights.user_id;
    const params = {
      user_id: user_id,
    };
    const result =
      await ApplicationScreenRightsMappingDao.getAllScreenRightsMappingForAnUser(
        params
      );
    return _200(httpResponse, result);
  } catch {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.GET_getScreenRightsMappingForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const user_id = httpRequest.body.screen_rights.user_id;
    const screen_id = httpRequest.body.screen.screen_id;
    const params = {
      user_id: user_id,
      screen_id: screen_id,
    };
    const result =
      await ApplicationScreenRightsMappingDao.getScreenRightsMappingForAnUser(
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

module.exports.POST_addScreenRightsMappingForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const values = [
      httpRequest.body.screen_rights.user_id,
      httpRequest.body.screen_rights.screen_id,
      httpRequest.body.screen_rights.right_to_view,
      httpRequest.body.screen_rights.right_to_add,
      httpRequest.body.screen_rights.right_to_edit,
      httpRequest.body.screen_rights.right_to_delete,
      httpRequest.body.screen_rights.added_by,
      httpRequest.body.screen_rights.updated_by,
    ];
    const params = {
      values: values,
    };
    const result =
      await ApplicationScreenRightsMappingDao.addScreenRightsMappingForAnUser(
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

module.exports.PUT_editScreenRightsMappingForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const values = [
      httpRequest.body.screen_rights.user_id,
      httpRequest.body.screen_rights.screen_id,
      httpRequest.body.screen_rights.right_to_view,
      httpRequest.body.screen_rights.right_to_add,
      httpRequest.body.screen_rights.right_to_edit,
      httpRequest.body.screen_rights.right_to_delete,
      httpRequest.body.screen_rights.updated_by,
    ];
    const params = {
      values: values,
    };
    const result =
      await ApplicationScreenRightsMappingDao.editScreenRightsMappingForAnUser(
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

module.exports.DELETE_deleteScreenRightsMappingsForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const user_id = httpRequest.body.screen_rights.user_id;
    const params = {
      user_id: user_id,
    };
    const result =
      await ApplicationScreenRightsMappingDao.deleteScreenRightsMappingsForAnUser(
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
