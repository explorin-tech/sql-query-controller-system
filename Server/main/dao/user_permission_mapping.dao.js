const pool = require('../db/index');
const { UserPermissionMappingQuery } = require('../query');

module.exports.getAllUserPermissionMappings = (req, res, next) => {
  const user_id = params.user_id;
  pool.query(
    UserPermissionMappingQuery.GET_ALL_USER_PERMISSION_MAPPINGS_FOR_AN_USER,
    [user_id],
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};
