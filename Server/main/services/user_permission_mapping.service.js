const {
  ApplicationDatabaseMappingDao,
  UserPermissionMappingDao,
} = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');

const _ = require('underscore');

module.exports.GET_getAllUserPermissionMappingForAnUser = async (
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
    const databases = await ApplicationDatabaseMappingDao.getAllDatabases();
    let databasesRights;
    databasesRights =
      await UserPermissionMappingDao.getAllUserPermissionMappings(params);
    const arrayOfDatabaseIDs = _.pluck(databases, 'DBAM_ID');
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
              decoded.UserID,
              decoded.UserID,
            ],
          });
        }
      );
    }
    databasesRights =
      await UserPermissionMappingDao.getAllUserPermissionMappings(params);
    return _200(httpResponse, databasesRights);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.PUT_editUserPermissionsMappingForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    const user_permissions_rights_mapping_object =
      httpRequest.body.user_permissions_mapping_object;

    user_permissions_rights_mapping_object.map((each_permission_right) => {
      const values = [
        each_permission_right['UP_U_ID'],
        each_permission_right['UP_DBAM_ID'],
        each_permission_right['UP_RightToRead'],
        each_permission_right['UP_RightToCreate'],
        each_permission_right['UP_RightToUpdate'],
        each_permission_right['UP_RightToDelete'],
        user_id,
      ];
      const params = {
        values: values,
      };
      const result =
        UserPermissionMappingDao.editUserPermissionRightsMapping(params);
    });
    return _200(httpResponse, []);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};
