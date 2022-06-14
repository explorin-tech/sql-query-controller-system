const pool = require('../db/index');
const { UserPermissionMappingQuery } = require('../query');

module.exports.getAllUserPermissionMappings = async (params) => {
  try {
    const user_id = params.user_id;
    const result = await pool.query(
      UserPermissionMappingQuery.GET_ALL_USER_PERMISSION_MAPPINGS_FOR_AN_USER,
      [user_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllUserPermissionMappingsForUserAccordingToAccessRights =
  async (params, userID) => {
    try {
      const user_id = params.user_id;
      const result = await pool.query(
        UserPermissionMappingQuery.GET_ALL_USER_PERMISSION_MAPPINGS_FOR_A_USER_ACCORDING_TO_ACCESS_RIGHTS,
        [user_id, userID]
      );
      return result.rows;
    } catch (err) {
      throw err;
    }
  };

module.exports.addUserPermissionRightsMapping = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      UserPermissionMappingQuery.INSERT_USER_PERMISSION_RIGHTS_MAPPINGS_FOR_AN_USER,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editUserPermissionRightsMapping = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      UserPermissionMappingQuery.UPDATE_USER_PERMISSION_RIGHTS_MAPPINGS_FOR_AN_USER,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getUserPermissionMappingArray = async (params) => {
  try {
    const user_id = params.user_id;
    const database_id = params.database_id;
    const result = await pool.query(
      UserPermissionMappingQuery.GET_USER_PERMISSION_MAPPING_ARRAY,
      [user_id, database_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};
