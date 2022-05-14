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
