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
    return err;
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
    return err;
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
    return err;
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
    return err;
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
    return err;
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
    return err;
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
    return err;
  }
};

module.exports.postNewQuery = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(Query.POST_ADD_NEW_QUERY, values);
    return result.rows;
  } catch (err) {
    return err;
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
    return err;
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
    return err;
  }
};

module.exports.editQueryDetails = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(Query.EDIT_QUERY_DETAILS, values);
    return result.rows;
  } catch (err) {
    console.log(err);
    return err;
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
    return err;
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
    return err;
  }
};

module.exports.executeQuery = async (params) => {
  try {
    const rawQueryDetails = params.raw_query_details[0];
    const { Pool } = require('pg');
    const new_pool = new Pool({
      host: rawQueryDetails['DBAM_DBHostName'],
      user: rawQueryDetails['DBAM_DBUserName'],
      database: 'postgres',
      password: rawQueryDetails['DBAM_DBPassword'],
      port: rawQueryDetails['DBAM_DBPortNumber'],
    });
    const result = await new_pool.query(rawQueryDetails['Q_RawQuery']);
    return result.rows;
  } catch (err) {
    return err;
  }
};

module.exports.markQueryAsExecuted = async (params) => {
  try {
    const query_id = params.query_id;
    const result = await pool.query(Query.MARK_A_QUERY_AS_EXECUTED, [query_id]);
    return result.rows;
  } catch (err) {
    return err;
  }
};
