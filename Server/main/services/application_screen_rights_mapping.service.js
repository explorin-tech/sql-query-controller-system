const {
  ApplicationScreenDao,
  ApplicationScreenRightsMappingDao,
} = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');
const _ = require('underscore');
const logger = require('../common/logger');

module.exports.GET_getAllScreenRightsMappingForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const { decoded } = httpRequest.headers;
    let user_id;
    if (httpRequest.query.user_id) {
      user_id = httpRequest.query.user_id;
    } else {
      user_id = decoded.UserID;
    }
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
            decoded.UserID,
            decoded.UserID,
          ],
        });
      });
    }
    screenRights =
      await ApplicationScreenRightsMappingDao.getAllScreenRightsMappingForAnUser(
        params
      );
    logger.info(`GET: All application screens rights | user_id: ${user_id}`);
    return _200(httpResponse, screenRights);
  } catch (err) {
    logger.error(`GET: All application screens rights | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getScreenRightsMappingForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const screen_id = httpRequest.body.screen.screen_id;
    const params = {
      user_id: user_id,
      screen_id: screen_id,
    };
    const result =
      await ApplicationScreenRightsMappingDao.getScreenRightsMappingForAnUser(
        params
      );
    logger.info(
      `GET: Screens rights mapping for an user | user_id: ${user_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: Screens rights mapping for an user | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addScreenRightsMappingForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
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
    logger.info(
      `POST: Screens rights mapping for an user | user_id: ${user_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`POST: Screens rights mapping for an user | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editScreenRightsMappingForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const screen_rights_object = httpRequest.body.screen_rights_mapping_object;
    screen_rights_object.map((each_screen_right) => {
      const values = [
        each_screen_right['ASR_U_ID'],
        each_screen_right['ASR_AS_ID'],
        each_screen_right['ASR_RightToView'],
        each_screen_right['ASR_RightToAdd'],
        each_screen_right['ASR_RightToEdit'],
        each_screen_right['ASR_RightToDelete'],
        user_id,
      ];
      const params = {
        values: values,
      };
      const result =
        ApplicationScreenRightsMappingDao.editScreenRightsMappingForAnUser(
          params
        );
    });
    logger.info(
      `PUT: Screens rights mapping for an user with user_id: ${screen_rights_object[0]['ASR_U_ID']} | by user_id: ${user_id}`
    );
    return _200(httpResponse, []);
  } catch (err) {
    logger.error(`PUT: Screens rights mapping for an user | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
