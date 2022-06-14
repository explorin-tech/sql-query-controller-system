const pool = require('../db/index');
const { ApplicationScreenQuery } = require('../query');

module.exports.getAllApplicationScreens = async () => {
  try {
    const result = await pool.query(
      ApplicationScreenQuery.SELECT_ALL_APPLICATION_SCREENS
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getScreenDetails = async (params) => {
  try {
    const screen_id = params.screen_id;
    const result = await pool.query(ApplicationScreenQuery.GET_SCREEN_DETAILS, [
      screen_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addApplicationScreen = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      ApplicationScreenQuery.INSERT_NEW_APPLICATION_SCREEN,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editApplicationScreen = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      ApplicationScreenQuery.EDIT_SCREEN_DETAILS,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteScreen = async (params) => {
  try {
    const screen_id = params.screen_id;
    const result = await pool.query(ApplicationScreenQuery.DELETE_SCREEN, [
      screen_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
