const pool = require('../db/index');
const { UserQuery } = require('../query');

module.exports.getAllUserTypes = async () => {
  try {
    const result = await pool.query(UserQuery.SELECT_ALL_USER_TYPES);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllUsers = async () => {
  try {
    const result = await pool.query(UserQuery.SELECT_ALL_USERS);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getUserDetails = async (params) => {
  try {
    const user_id = params.user_id;
    const result = await pool.query(UserQuery.GET_USER_DETAILS, [user_id]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getUserDetailsForEmail = async (params) => {
  try {
    const email = params.email;
    const result = await pool.query(UserQuery.GET_USER_DETAILS_FOR_EMAILID, [
      email,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addUser = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(UserQuery.ADD_NEW_USER, values);
    console.log(result);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editUser = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(UserQuery.EDIT_USER_DETAILS, values);
    return result.rows;
  } catch (err) {
    return err;
  }
};

module.exports.deleteUser = async (params) => {
  try {
    const user_id = params.user_id;
    const result = await pool.query(UserQuery.DELETE_USER, [user_id]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
