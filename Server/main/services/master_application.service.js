const { MasterApplicationDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');

module.exports.GET_getAllApplications = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const result = await MasterApplicationDao.getAllApplications();
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.GET_getAllApplicationsForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const user_id = httpRequest.query.user_id;
    const params = {
      user_id: user_id,
    };
    const result = await MasterApplicationDao.getAllApplicationsForAnUser(
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

module.exports.GET_getApplicationDetails = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const application_id = httpRequest.query.application_id;

    const params = {
      application_id: application_id,
    };
    const result = await MasterApplicationDao.getApplicationDetails(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.POST_addApplication = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const values = [
      httpRequest.body.application.application_name,
      httpRequest.body.application.owner_1,
      httpRequest.body.application.owner_2,
      httpRequest.body.application.added_by,
      httpRequest.body.application.updated_by,
    ];
    const params = {
      values: values,
    };
    const result = await MasterApplicationDao.addApplication(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.PUT_editApplication = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const values = [
      httpRequest.body.application_id,
      httpRequest.body.application.application_name,
      httpRequest.body.application.owner_1,
      httpRequest.body.application.owner_2,
      httpRequest.body.application.updated_by,
    ];
    const params = {
      values: values,
    };
    const result = await MasterApplicationDao.editApplication(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.DELETE_deleteApplication = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const application_id = httpRequest.body.application_id;
    const params = {
      application_id: application_id,
    };
    const result = await MasterApplicationDao.deleteApplication(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};
