const {
  DatabaseApplicationMappingDao,
  UserPermissionMappingDao,
  UserDao,
} = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');

const _ = require('underscore');

module.exports.GET_getAllUserPermissionMappingForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
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
    const user_details = await UserDao.getUserDetails({
      user_id: decoded.UserID,
    });
    const user_type = user_details[0]['UT_Name'];
    let databases_application_mappings;
    let arrayOfDatabaseIDs;
    if (user_type == 'AD') {
      databases_application_mappings =
        await DatabaseApplicationMappingDao.getAllDatabaseApplicationMappings();
      arrayOfDatabaseIDs = _.pluck(databases_application_mappings, 'DBAM_ID');
    } else {
      databases_application_mappings =
        await DatabaseApplicationMappingDao.getAllDatabaseApplicationMappingsForAnUser(
          {
            user_id: decoded.UserID,
          }
        );
      arrayOfDatabaseIDs = _.pluck(
        databases_application_mappings,
        'UP_DBAM_ID'
      );
    }
    let databasesRights;
    databasesRights =
      await UserPermissionMappingDao.getAllUserPermissionMappings(params);
    const arrayOfDatabaseIDsInDatabaseRights = _.pluck(
      databasesRights,
      'UP_DBAM_ID'
    );
    const arrayOfDatabaseIDsForWhichRightsNeedToBeAdded =
      arrayOfDatabaseIDs.filter(
        (x) => arrayOfDatabaseIDsInDatabaseRights.indexOf(x) === -1
      );
    if (arrayOfDatabaseIDsForWhichRightsNeedToBeAdded.length >= 1) {
      arrayOfDatabaseIDsForWhichRightsNeedToBeAdded.map(
        (each_database_rights_id) => {
          UserPermissionMappingDao.addUserPermissionRightsMapping({
            values: [
              user_id,
              each_database_rights_id,
              'FALSE',
              'FALSE',
              'FALSE',
              'FALSE',
              'FALSE',
              'FALSE',
              decoded.UserID,
              decoded.UserID,
            ],
          });
        }
      );
    }
    if (httpRequest.query.user_id) {
      logger.info(
        `GET: User permissions for an user with user_id : ${httpRequest.query.user_id} | by user_id: ${decoded.UserID}`
      );
    } else {
      logger.info(
        `GET: User permissions for an user with user_id : ${user_id} | by user_id: ${decoded.UserID}`
      );
    }
    if (user_type == 'AD') {
      databasesRightsToReturn =
        await UserPermissionMappingDao.getAllUserPermissionMappings(params);
    } else {
      databasesRightsToReturn =
        await UserPermissionMappingDao.getAllUserPermissionMappingsForUserAccordingToAccessRights(
          params,
          decoded.UserID
        );
    }
    return _200(httpResponse, databasesRightsToReturn);
  } catch (err) {
    logger.error(
      `GET: User permissions for an user | user_id: ${decoded.UserID} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editUserPermissionsMappingForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const user_permissions_rights_mapping_object =
      httpRequest.body.user_permissions_mapping_object;

    user_permissions_rights_mapping_object.map((each_permission_right) => {
      const values = [
        each_permission_right['UP_U_ID'],
        each_permission_right['UP_DBAM_ID'],
        each_permission_right['UP_RightToRead'],
        each_permission_right['UP_RightToCreate'],
        each_permission_right['UP_RightToInsert'],
        each_permission_right['UP_RightToUpdate'],
        each_permission_right['UP_RightToDelete'],
        each_permission_right['UP_ApprovalNotRequired'],
        user_id,
      ];
      const params = {
        values: values,
      };
      const result =
        UserPermissionMappingDao.editUserPermissionRightsMapping(params);
    });
    logger.info(`PUT: User permissions for an user | user_id: ${user_id}`);
    return _200(httpResponse, []);
  } catch (err) {
    logger.error(
      `PUT: User permissions for an user | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
