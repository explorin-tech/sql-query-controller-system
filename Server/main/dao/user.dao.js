const pool = require('../db/index');
const { UserQuery } = require('../query');

module.exports.getAllUsers = (req, res, next) => {
  pool.query(UserQuery.SELECT_ALL_USERS, (q_err, q_res) => {
    return res.json(q_res.rows);
  });
};
