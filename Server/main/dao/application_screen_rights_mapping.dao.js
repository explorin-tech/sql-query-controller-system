const pool = require('../db/index');
const { ApplicationScreenRightsMappingQuery } = require('../query');

module.exports.getAllScreenRightsMappingForAnUser = async (params) => {
  try {
    const user_id = params.user_id;
    const result = await pool.query(
      ApplicationScreenRightsMappingQuery.GET_ALL_SCREEN_RIGHTS_MAPPING_FOR_AN_USER,
      [user_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getScreenRightsMappingForAnUser = async (params) => {
  try {
    const result = await pool.query(
      ApplicationScreenRightsMappingQuery.GET_SCREEN_RIGHTS_MAPPING_FOR_AN_USER,
      [params.user_id, params.screen_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addScreenRightsMappingForAnUser = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      ApplicationScreenRightsMappingQuery.INSERT_SCREEN_RIGHTS_MAPPING_FOR_AN_USER,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editScreenRightsMappingForAnUser = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      ApplicationScreenRightsMappingQuery.EDIT_SCREEN_RIGHTS_MAPPING_FOR_AN_USER,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};
