const { UserDao, QueryDao, UserPermissionMappingDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');
const {
  identifyQueryType,
  checkQueryExecutionRight,
} = require('../common/queryHelper');
const logger = require('../common/logger');

module.exports.GET_getAllMappedDraftQueriesForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
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
    logger.info(
      `GET: All Mapped Draft Queries for an user | user_id: ${user_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: All Mapped Draft Queries for an user | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getAllMappedHistoryQueriesForAnUser = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
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
    logger.info(
      `GET: All Mapped History Queries for an user | user_id: ${user_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: All Mapped History Queries for an user | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getQueryDetailsForGivenQueryID = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
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
    let approval_not_required = false;
    let query_type_is_approved = false;
    let user_permission_mapping_array_for_query_db_id =
      await UserPermissionMappingDao.getUserPermissionMappingArray({
        user_id: user_id,
        database_id: query_object[0]['Q_DBAM_ID'],
      });

    let query_type = identifyQueryType(query_object[0]['Q_RawQuery']);
    if (query_type) {
      query_type_is_approved = checkQueryExecutionRight(
        query_type,
        user_permission_mapping_array_for_query_db_id[0]
      );
    } else {
      query_type_is_approved = false;
    }
    if (
      user_permission_mapping_array_for_query_db_id[0]['UP_ApprovalNotRequired']
    ) {
      approval_not_required = true;
    }

    let result;
    logger.info(
      `GET: Query Details for given query ID | user_id: ${user_id} | query_id: ${query_id}`
    );
    if (
      owner_ids[0]['MA_Owner1'] == user_id ||
      owner_ids[0]['MA_Owner2'] == user_id ||
      user_type == 'AD'
    ) {
      result = {
        queryObject: query_object,
        queryApprovalRight: true,
        queryTypeIsApproved: query_type_is_approved,
        approvalNotRequired: approval_not_required,
      };
      return _200(httpResponse, result);
    } else {
      result = {
        queryObject: query_object,
        queryApprovalRight: false,
        queryTypeIsApproved: query_type_is_approved,
        approvalNotRequired: approval_not_required,
      };
      return _200(httpResponse, result);
    }
  } catch (err) {
    logger.error(
      `GET: Query Details for given query ID | user_id: ${user_id} |  ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addNewQuery = async (httpRequest, httpResponse, next) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
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
    logger.info(
      `POST: Add new query | user_id: ${user_id} | query_id: ${result}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Query Details for given query ID | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editQueryStatusForApprovalOrRejection = async (
  httpRequest,
  httpResponse,
  next
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    let values;
    if (httpRequest.body.query.is_approved) {
      values = [
        httpRequest.body.query.query_id,
        httpRequest.body.query.query_status_id,
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
    logger.info(
      `PUT: Edit query details| user_id: ${user_id} | query_id: ${result}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`PUT: Edit query details| user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editQuery = async (httpRequest, httpResponse, next) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
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
    const result = await QueryDao.editQueryDetails(params);
    logger.info(
      `PUT: Edit query details| user_id: ${user_id} | query_id: ${result}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`PUT: Edit query details| user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_executeQuery = async (httpRequest, httpResponse, next) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const query_id = httpRequest.body.query.query_id;
    const raw_query_details = await QueryDao.getRawQueryDetailsForQueryID({
      query_id: query_id,
    });
    const execute_query = await QueryDao.executeQuery({
      raw_query_details: raw_query_details,
    });
    const mark_query_as_executed = await QueryDao.markQueryAsExecuted({
      query_id: query_id,
    });
    if (mark_query_as_executed[0]['Q_ID']) {
      logger.info(
        `POST: Execute Query | user_id: ${user_id} | query_id: ${query_id}`
      );
      return _200(httpResponse, execute_query);
    } else {
      logger.error(
        `POST: Execute Query | user_id: ${user_id} |    Query Failed To Execute`
      );
      return _error(httpResponse, {
        type: 'generic',
        message: 'Query Failed To Execute',
      });
    }
  } catch (err) {
    logger.error(`POST: Execute Query | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_queriesAwaitingForApproval = async (
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
    const user_details = await UserDao.getUserDetails({
      user_id: decoded.UserID,
    });
    const user_type = user_details[0]['UT_Name'];
    logger.info(`GET: Queries awaiting for Approval | user_id: ${user_id}`);
    if (user_type === 'RA') {
      const result = await QueryDao.getQueriesAwaitingForApproval(params);
      return _200(httpResponse, result);
    } else {
      return _200(httpResponse, []);
    }
  } catch (err) {
    logger.error(
      `GET: Queries awaiting for Approval | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_RecentQueries = async (httpRequest, httpResponse, next) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const params = {
      user_id: user_id,
    };
    const result = await QueryDao.getRecentQueries(params);
    logger.info(`GET: Recent Queries | user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: Recent Queries | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
