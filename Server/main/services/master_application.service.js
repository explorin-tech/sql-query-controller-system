const { MasterApplicationDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');

module.exports.GET_getAllApplications = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await MasterApplicationDao.getAllApplications();
    logger.info(`GET: All Applications | user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: All Applications | user_id: ${user_id} | ${err}`);
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
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const params = {
      user_id: user_id,
    };
    const result = await MasterApplicationDao.getAllApplicationsForAnUser(
      params
    );
    logger.info(`GET: All Applications for an user| user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: All Applications for an user | user_id: ${user_id} | ${err}`
    );
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
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const application_id = httpRequest.query.application_id;
    const params = {
      application_id: application_id,
    };
    const result = await MasterApplicationDao.getApplicationDetails(params);
    logger.info(
      `GET : All Application Details | user_id: ${user_id} | application_id: ${application_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: All Application Details | user_id: ${user_id} | ${err}`);
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
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.application.application_name,
      httpRequest.body.application.owner_1,
      httpRequest.body.application.owner_2,
      user_id,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result = await MasterApplicationDao.addApplication(params);
    logger.info(
      `POST : Add new Application | user_id: ${user_id} | application_id: ${result[0]['MA_ID']}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`POST : Add new Application | user_id: ${user_id} | ${err}`);
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
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.application.application_id,
      httpRequest.body.application.application_name,
      httpRequest.body.application.owner_1,
      httpRequest.body.application.owner_2,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result = await MasterApplicationDao.editApplication(params);
    logger.info(
      `PUT : Edit Application Details | user_id: ${user_id} | application_id: ${httpRequest.body.application.application_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `PUT : Edit Application Details | user_id: ${user_id} | ${err}`
    );
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
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const application_id = httpRequest.query.application_id;
    const params = {
      application_id: application_id,
    };
    const result = await MasterApplicationDao.deleteApplication(params);
    logger.info(
      `DELETE : Delete Application | user_id: ${user_id} | application_id: ${application_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`DELETE : Delete Application | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};
