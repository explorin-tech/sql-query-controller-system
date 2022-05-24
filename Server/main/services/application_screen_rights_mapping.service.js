const {
  ApplicationScreenDao,
  ApplicationScreenRightsMappingDao,
} = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');
const _ = require('underscore');

module.exports.GET_getAllScreenRightsMappingForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    const params = {
      user_id: user_id,
    };

    const screens = await ApplicationScreenDao.getAllApplicationScreens();
    let screenRights;
    screenRights =
      await ApplicationScreenRightsMappingDao.getAllScreenRightsMappingForAnUser(
        params
      );
    const arrayOfScreenIDs = _.pluck(screens, 'AS_ID');
    const arrayOfScreenIDsInScreenRights = _.pluck(screenRights, 'ASR_AS_ID');
    const arrayOfScreenIDsForWhichRightsNeedToBeAdded = arrayOfScreenIDs.filter(
      (x) => arrayOfScreenIDsInScreenRights.indexOf(x) === -1
    );
    if (arrayOfScreenIDsForWhichRightsNeedToBeAdded.length >= 1) {
      arrayOfScreenIDsForWhichRightsNeedToBeAdded.map((each_screen_id) => {
        ApplicationScreenRightsMappingDao.addScreenRightsMappingForAnUser({
          values: [
            user_id,
            each_screen_id,
            'FALSE',
            'FALSE',
            'FALSE',
            'FALSE',
            user_id,
            user_id,
          ],
        });
      });
    }
    screenRights =
      await ApplicationScreenRightsMappingDao.getAllScreenRightsMappingForAnUser(
        params
      );
    return _200(httpResponse, screenRights);
  } catch (err) {
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
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
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
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    const values = [
      httpRequest.body.screen_rights.user_id,
      httpRequest.body.screen_rights.screen_id,
      httpRequest.body.screen_rights.right_to_view,
      httpRequest.body.screen_rights.right_to_add,
      httpRequest.body.screen_rights.right_to_edit,
      httpRequest.body.screen_rights.right_to_delete,
      user_id,
      user_id,
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
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    const values = [
      httpRequest.body.screen_rights.user_id,
      httpRequest.body.screen_rights.screen_id,
      httpRequest.body.screen_rights.right_to_view,
      httpRequest.body.screen_rights.right_to_add,
      httpRequest.body.screen_rights.right_to_edit,
      httpRequest.body.screen_rights.right_to_delete,
      user_id,
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
