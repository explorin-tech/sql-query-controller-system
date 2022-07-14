const pool = require('../db/index');
const { Query } = require('../query');

module.exports.getAllDraftQueriesForAdmin = async (params) => {
  try {
    const offset = (params.page - 1) * 10;
    const result = await pool.query(
      Query.GET_ALL_MAPPED_DRAFT_QUERIES_FOR_ADMIN,
      [offset]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllHistoryQueriesForAdmin = async (params) => {
  try {
    const offset = (params.page - 1) * 10;
    const result = await pool.query(
      Query.GET_ALL_MAPPED_HISTORY_DRAFT_QUERIES_FOR_ADMIN,
      [offset]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllDraftQueriesForDev = async (params) => {
  try {
    const user_id = params.user_id;
    const offset = (params.page - 1) * 10;
    const result = await pool.query(
      Query.GET_ALL_MAPPED_DRAFT_QUERIES_FOR_DEV,
      [user_id, offset]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllHistoryQueriesForDev = async (params) => {
  try {
    const user_id = params.user_id;
    const offset = (params.page - 1) * 10;
    const result = await pool.query(
      Query.GET_ALL_MAPPED_HISTORY_QUERIES_FOR_DEV,
      [user_id, offset]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllDraftQueriesForApplicationOwner = async (params) => {
  try {
    const user_id = params.user_id;
    const offset = (params.page - 1) * 10;
    const result = await pool.query(
      Query.GET_ALL_MAPPED_DRAFT_QUERIES_FOR_APPLICATION_OWNER,
      [user_id, offset]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllHistoryQueriesForApplicationOwner = async (params) => {
  try {
    const user_id = params.user_id;
    const offset = (params.page - 1) * 10;
    const result = await pool.query(
      Query.GET_ALL_MAPPED_HISTORY_QUERIES_FOR_APPLICATION_OWNER,
      [user_id, offset]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getQueryDetailsForQueryID = async (params) => {
  try {
    const query_id = params.query_id;
    const result = await pool.query(Query.GET_QUERY_DETAILS_FOR_QUERY_ID, [
      query_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.postNewQuery = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(Query.POST_ADD_NEW_QUERY, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editQueryStatusForApproval = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      Query.EDIT_QUERY_STATUS_FOR_APPROVAL,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editQueryStatusForRejection = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      Query.EDIT_QUERY_STATUS_FOR_REJECTION,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editQueryDetails = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(Query.EDIT_QUERY_DETAILS, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getUserIDOfApplicationOwnersOfDBAM = async (params) => {
  try {
    const query_id = params.query_id;
    const result = await pool.query(
      Query.GET_USER_IDS_WHO_ARE_ALLOWED_TO_GIVE_APPROVAL_FOR_QUERY,
      [query_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getRawQueryDetailsForQueryID = async (params) => {
  try {
    const query_id = params.query_id;
    const result = await pool.query(Query.GET_RAW_QUERY_DETAILS_FOR_QUERY_ID, [
      query_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.executeQuery = async (params) => {
  try {
    const rawQueryDetails = params.raw_query_details[0];
    const { Pool } = require('pg');
    const new_pool = new Pool({
      host: rawQueryDetails['MD_DBHostName'],
      user: rawQueryDetails['MD_DBUserName'],
      database: rawQueryDetails['MD_DBName'],
      password: rawQueryDetails['MD_DBPassword'],
      port: rawQueryDetails['MD_DBPortNumber'],
    });
    const result = await new_pool.query(rawQueryDetails['Q_RawQuery']);
    if (Array.isArray(result)) {
      let finalResult = [];
      for (var i = 0; i < result.length; i++) {
        finalResult.push(result[i].rows);
      }
      return {
        result: finalResult,
        queryStatus: 'success',
      };
    } else {
      return {
        result: [result.rows],
        queryStatus: 'success',
      };
    }
  } catch (err) {
    return {
      result: err.message,
      queryStatus: 'failed',
    };
  }
};

module.exports.markQueryAsExecuted = async (params) => {
  try {
    const query_id = params.query_id;
    const query_status = params.query_status;
    let result;
    if (query_status === 'success') {
      result = await pool.query(Query.MARK_A_QUERY_AS_SUCCESSFULLY_EXECUTED, [
        query_id,
      ]);
    } else {
      result = await pool.query(Query.MARK_A_QUERY_AS_EXECUTED, [query_id]);
    }
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getQueriesAwaitingForApproval = async (params) => {
  try {
    const user_id = params.user_id;
    const result = await pool.query(Query.GET_QUERIES_AWAITING_APPROVAL, [
      user_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getRecentQueries = async (params) => {
  try {
    const user_id = params.user_id;
    const result = await pool.query(Query.GET_RECENT_QUERIES, [user_id]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
