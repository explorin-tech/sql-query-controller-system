const pool = require('../db/index');
const { ApplicationScreenQuery } = require('../query');

module.exports.getAllApplicationScreens = (req, res, next) => {
  pool.query(
    ApplicationScreenQuery.SELECT_ALL_APPLICATION_SCREENS,
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};

module.exports.getScreenDetails = (req, res, next, params) => {
  const screen_id = params.screen_id;
  pool.query(
    ApplicationScreenQuery.GET_SCREEN_DETAILS,
    [screen_id],
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};

module.exports.addApplicationScreen = (req, res, next, params) => {
  const values = params.values;
  pool.query(
    ApplicationScreenQuery.INSERT_NEW_APPLICATION_SCREEN,
    values,
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};

module.exports.editApplicationScreen = (req, res, next, params) => {
  const values = params.values;
  pool.query(
    ApplicationScreenQuery.EDIT_SCREEN_DETAILS,
    values,
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};

module.exports.deleteScreen = (req, res, next, params) => {
  const screen_id = params.screen_id;
  pool.query(
    ApplicationScreenQuery.DELETE_SCREEN,
    [screen_id],
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};
