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
    return err;
  }
};
