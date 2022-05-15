const { UserPermissionMappingDao } = require('../dao/index');
module.exports.GET_getAllUserPermissionMappingForAnUser = (req, res, next) => {
  const user_id = req.body.user_permission_mapping.user_id;
  const params = {
    user_id: user_id,
  };
  const response = UserPermissionMappingDao.getAllUserPermissionMappings(
    req,
    res,
    next,
    params
  );
  return response;
};
