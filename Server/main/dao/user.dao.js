const pool = require('../db/index');
const { UserQuery } = require('../query');

module.exports.getAllUserTypes = (req, res, next) => {
  pool.query(UserQuery.SELECT_ALL_USER_TYPES, (q_err, q_res) => {
    return res.json(q_res.rows);
  });
};

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

module.exports.addUser = (req, res, next, params) => {
  const values = params.values;
  pool.query(UserQuery.ADD_NEW_USER, values, (q_err, q_res) => {
    return res.json(q_res.rows);
  });
};

module.exports.editUser = (req, res, next, params) => {
  const values = params.values;
  pool.query(UserQuery.EDIT_USER_DETAILS, values, (q_err, q_res) => {
    return res.json(q_res.rows);
  });
};

module.exports.deleteUser = (req, res, next, params) => {
  const user_id = params.user_id;
  pool.query(UserQuery.DELETE_USER, [user_id], (q_err, q_res) => {
    return res.json(q_res.rows);
  });
};
