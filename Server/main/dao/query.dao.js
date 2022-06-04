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
