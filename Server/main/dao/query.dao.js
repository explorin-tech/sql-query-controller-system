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

module.exports.editQueryDetails = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(Query.EDIT_QUERY_DETAILS, values);
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

module.exports.editQueryDetailsInHoldForApproval = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      Query.EDIT_QUERY_DETAILS_IN_HOLD_FOR_APPROVAL,
      values
    );
    return result.rows;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.editQueryStatus = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(Query.EDIT_QUERY_STATUS, values);
    return result.rows;
  } catch (err) {
    return err;
  }
};
