const pool = require('../db/index');
const { MasterApplicationQuery } = require('../query');
const _ = require('underscore');

module.exports.getAllApplications = async () => {
  try {
    const result = await pool.query(
      MasterApplicationQuery.SELECT_ALL_MASTER_APPLICATIONS
    );
    return result.rows;
  } catch (err) {
    return err;
  }
};

module.exports.getAllApplicationsForAnUser = async (params) => {
  try {
    const result = await pool.query(
      MasterApplicationQuery.SELECT_ALL_MASTER_APPLICATIONS_FOR_AN_USER,
      [params.user_id]
    );
    return result.rows;
  } catch (err) {
    return err;
  }
};

module.exports.getApplicationDetails = async (params) => {
  try {
    const application_id = params.application_id;
    const result = await pool.query(
      MasterApplicationQuery.GET_APPLICATION_DETAILS,
      [application_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addApplication = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      MasterApplicationQuery.INSERT_NEW_APPLICATION,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editApplication = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(
      MasterApplicationQuery.EDIT_AN_APPLICATION,
      values
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteApplication = async (params) => {
  try {
    const application_id = params.application_id;
    const result = await pool.query(
      MasterApplicationQuery.DELETE_AN_APPLICATION,
      [application_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};
