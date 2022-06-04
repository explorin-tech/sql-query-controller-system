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
      page: httpRequest.headers.page,
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
      page: httpRequest.headers.page,
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
    return err;
  }
};
