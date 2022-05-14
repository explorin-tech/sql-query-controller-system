const { ApplicationScreenRightsDao } = require('../dao/index');

module.exports.GET_allScreenRightsMappingForAnUser = (req, res, next) => {
  const user_id = req.body.user.user_id;
  const params = {
    user_id: user_id,
  };
  const response =
    ApplicationScreenRightsDao.getAllScreenRightsMappingForAnUser(
      req,
      res,
      next,
      params
    );
  return response;
};
