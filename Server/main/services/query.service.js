const { UserDao, QueryDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');

module.exports.GET_getAllMappedDraftQueriesForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    const params = {
      user_id: user_id,
      page: httpRequest.query.page,
    };
    const user_details = await UserDao.getUserDetails({
      user_id: decoded.UserID,
    });
    const user_type = user_details[0]['UT_Name'];
    let result;
    if (user_type == 'AD') {
      result = await QueryDao.getAllDraftQueriesForAdmin(params);
    } else if (user_type == 'DV') {
      result = await QueryDao.getAllDraftQueriesForDev(params);
    } else if (user_type == 'RA') {
      result = await QueryDao.getAllDraftQueriesForApplicationOwner(params);
    }
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.GET_getAllMappedHistoryQueriesForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    const params = {
      user_id: user_id,
      page: httpRequest.query.page,
    };
    const user_details = await UserDao.getUserDetails({
      user_id: decoded.UserID,
    });
    const user_type = user_details[0]['UT_Name'];
    let result;
    if (user_type == 'AD') {
      result = await QueryDao.getAllHistoryQueriesForAdmin(params);
    } else if (user_type == 'DV') {
      result = await QueryDao.getAllHistoryQueriesForDev(params);
    } else if (user_type == 'RA') {
      result = await QueryDao.getAllHistoryQueriesForApplicationOwner(params);
    }
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.GET_getQueryDetailsForGivenQueryID = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    const query_id = httpRequest.query.query_id;
    const params = {
      query_id: query_id,
    };
    const user_details = await UserDao.getUserDetails({
      user_id: decoded.UserID,
    });
    const user_type = user_details[0]['UT_Name'];
    const query_object = await QueryDao.getQueryDetailsForQueryID(params);
    const owner_ids = await QueryDao.getUserIDOfApplicationOwnersOfDBAM(params);
    let result;
    if (
      owner_ids[0]['MA_Owner1'] == user_id ||
      owner_ids[0]['MA_Owner2'] == user_id ||
      user_type == 'AD'
    ) {
      result = {
        queryObject: query_object,
        queryApprovalRight: true,
      };
      return _200(httpResponse, result);
    } else {
      result = {
        queryObject: query_object,
        queryApprovalRight: false,
      };
      return _200(httpResponse, result);
    }
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.POST_addNewQuery = async (httpRequest, httpResponse, next) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    const values = [
      httpRequest.body.query.database_application_mapping_id,
      httpRequest.body.query.query_status_id,
      httpRequest.body.query.sys_defined_name,
      httpRequest.body.query.user_defined_name,
      httpRequest.body.query.raw_query,
      httpRequest.body.query.query_desc,
      user_id,
      httpRequest.body.query.query_comments,
    ];
    const params = {
      values: values,
    };
    const result = await QueryDao.postNewQuery(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.PUT_editAQuery = async (httpRequest, httpResponse, next) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    const values = [
      httpRequest.body.query.query_id,
      httpRequest.body.query.user_defined_name,
      httpRequest.body.query.query_desc,
      user_id,
      httpRequest.body.query.query_comments,
    ];
    const params = {
      values: values,
    };
    const result = await QueryDao.editQueryDetails(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.PUT_editQueryStatusForApprovalOrRejection = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    let values;
    if (httpRequest.body.query.is_approved) {
      values = [
        httpRequest.body.query.query_id,
        httpRequest.body.query.query_status_id,
        user_id,
        user_id,
      ];
      let params = {
        values: values,
      };
      result = await QueryDao.editQueryStatusForApproval(params);
    } else {
      values = [
        httpRequest.body.query.query_id,
        httpRequest.body.query.query_status_id,
        user_id,
      ];
      let params = {
        values: values,
      };
      result = await QueryDao.editQueryStatusForRejection(params);
    }
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.PUT_editAQueryInHoldForApproval = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    const values = [
      httpRequest.body.query.query_id,
      httpRequest.body.query.database_application_mapping_id,
      httpRequest.body.query.query_status_id,
      httpRequest.body.query.user_defined_name,
      httpRequest.body.query.query_desc,
      httpRequest.body.query.raw_query,
      user_id,
      httpRequest.body.query.query_comments,
    ];
    const params = {
      values: values,
    };
    const result = await QueryDao.editQueryDetailsInHoldForApproval(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};

module.exports.PUT_editQueryStatus = async (
  httpRequest,
  httpResponse,
  next
) => {
  try {
    const { decoded } = httpRequest.headers;
    const user_id = decoded.UserID;
    const values = [
      httpRequest.body.query.query_id,
      httpRequest.body.query.query_status_id,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result = await QueryDao.editQueryStatus(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err,
    });
  }
};
