const { ApplicationScreenRightsMappingDao } = require('../dao/index');

module.exports.GET_getAllScreenRightsMappingForAnUser = (req, res, next) => {
  const user_id = req.body.screen_rights.user_id;
  const params = {
    user_id: user_id,
  };
  const response =
    ApplicationScreenRightsMappingDao.getAllScreenRightsMappingForAnUser(
      req,
      res,
      next,
      params
    );
  return response;
};

module.exports.POST_addScreenRightsMappingForAnUser = (req, res, next) => {
  const values = [
    req.body.screen_rights.user_id,
    req.body.screen_rights.screen_id,
    req.body.screen_rights.right_to_view,
    req.body.screen_rights.right_to_add,
    req.body.screen_rights.right_to_edit,
    req.body.screen_rights.right_to_delete,
    req.body.screen_rights.added_by,
    req.body.screen_rights.updated_by,
  ];
  const params = {
    values: values,
  };
  const response =
    ApplicationScreenRightsMappingDao.addScreenRightsMappingForAnUser(
      req,
      res,
      next,
      params
    );
  return response;
};

module.exports.PUT_editScreenRightsMappingForAnUser = (req, res, next) => {
  const values = [
    req.body.screen_rights.user_id,
    req.body.screen_rights.screen_id,
    req.body.screen_rights.right_to_view,
    req.body.screen_rights.right_to_add,
    req.body.screen_rights.right_to_edit,
    req.body.screen_rights.right_to_delete,
    req.body.screen_rights.updated_by,
  ];
  const params = {
    values: values,
  };
  const response =
    ApplicationScreenRightsMappingDao.editScreenRightsMappingForAnUser(
      req,
      res,
      next,
      params
    );
  return response;
};

module.exports.DELETE_deleteScreenRightsMappingsForAnUser = (
  req,
  res,
  next
) => {
  const user_id = req.body.screen_rights.user_id;
  const params = {
    user_id: user_id,
  };
  const response =
    ApplicationScreenRightsMappingDao.deleteScreenRightsMappingsForAnUser(
      req,
      res,
      next,
      params
    );
  return response;
};
