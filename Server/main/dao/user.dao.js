const pool = require('../db/index');
const { UserQuery } = require('../query');

module.exports.getAllUsers = (req, res, next) => {
  pool.query(UserQuery.SELECT_ALL_USERS, (q_err, q_res) => {
    return res.json(q_res.rows);
  });
};

module.exports.getUserDetails = (req, res, next, params) => {
  const user_id = params.user_id;
  pool.query(UserQuery.GET_USER_DETAILS, [user_id], (q_err, q_res) => {
    return res.json(q_res.rows);
  });
};
