const { UserPermissionMappingDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');

module.exports.GET_getAllUserPermissionMappingForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    let user_id;
    if (httpRequest.body.user_permission_mapping) {
      user_id = httpRequest.body.user_permission_mapping.user_id;
    } else {
      const { decoded } = httpRequest.headers;
      user_id = decoded.UserID;
    }
    const params = {
      user_id: user_id,
    };
    const result = await UserPermissionMappingDao.getAllUserPermissionMappings(
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
