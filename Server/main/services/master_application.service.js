const { MasterApplicationDao } = require('../dao/index');

module.exports.GET_getAllApplications = (req, res, next) => {
  const response = MasterApplicationDao.getAllApplications(req, res, next);
  return response;
};

module.exports.GET_getAllApplicationsForAnUser = (req, res, next) => {
  const user_id = req.query.user_id;

  const params = {
    user_id: user_id,
  };
  const response = MasterApplicationDao.getAllApplicationsForAnUser(
    req,
    res,
    next,
    params
  );
  return response;
};

module.exports.GET_getApplicationDetails = (req, res, next) => {
  const application_id = req.query.application_id;
  const params = {
    application_id: application_id,
  };
  const response = MasterApplicationDao.getApplicationDetails(
    req,
    res,
    next,
    params
  );
  return response;
};

module.exports.POST_addApplication = (req, res, next) => {
  const values = [
    req.body.application.application_name,
    req.body.application.owner_1,
    req.body.application.owner_2,
    req.body.application.added_by,
    req.body.application.updated_by,
  ];
  const params = {
    values: values,
  };
  const response = MasterApplicationDao.addApplication(req, res, next, params);
  return response;
};

module.exports.PUT_editApplication = (req, res, next) => {
  const values = [
    req.body.application_id,
    req.body.application.application_name,
    req.body.application.owner_1,
    req.body.application.owner_2,
    req.body.application.updated_by,
  ];
  const params = {
    values: values,
  };
  const response = MasterApplicationDao.editApplication(req, res, next, params);
  return response;
};

module.exports.DELETE_deleteApplication = (req, res, next) => {
  //var startTime = new Date()
  const application_id = req.body.application_id;
  const params = {
    application_id: application_id,
  };
  const response = MasterApplicationDao.deleteApplication(
    req,
    res,
    next,
    params
  );
  return response;
  //log.info("method = {}, API = {}, values = {}, request = {}, response = {}, error = {}, cost = {}",
  //  "deleteNewApplication", MasterApplicationDao.DELETE_AN_APPLICATION, );
};
