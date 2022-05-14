const { ApplicationScreenDao } = require('../dao/index');

module.exports.GET_allApplicationScreens = (req, res, next) => {
  const response = ApplicationScreenDao.getAllApplicationScreens(
    req,
    res,
    next
  );
  return response;
};

module.exports.GET_screenDetails = (req, res, next) => {
  const screen_id = req.body.screen.screen_id;
  const params = {
    screen_id: screen_id,
  };
  const response = ApplicationScreenDao.getScreenDetails(
    req,
    res,
    next,
    params
  );
  return response;
};

module.exports.POST_addApplicationScreen = (req, res, next) => {
  const values = [
    req.body.screen.screen_name,
    req.body.screen.added_by,
    req.body.screen.updated_by,
  ];
  const params = {
    values: values,
  };
  const response = ApplicationScreenDao.addApplicationScreen(
    req,
    res,
    next,
    params
  );
  return response;
};

module.exports.PUT_editApplicationScreen = (req, res, next) => {
  const values = [
    req.body.screen.screen_id,
    req.body.screen.screen_name,
    req.body.screen.updated_by,
  ];
  const params = {
    values: values,
  };
  const response = ApplicationScreenDao.editApplicationScreen(
    req,
    res,
    next,
    params
  );
  return response;
};

module.exports.DELETE_deleteApplicationScreen = (req, res, next) => {
  const screen_id = req.body.screen.screen_id;
  const params = {
    screen_id: screen_id,
  };
  const response = ApplicationScreenDao.deleteScreen(req, res, next, params);
};
