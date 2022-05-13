const pool = require('../db/index');
const { MasterApplicationQuery } = require('../query');

module.exports.getAllApplications = (req, res, next) => {
  pool.query(
    MasterApplicationQuery.SELECT_ALL_MASTER_APPLICATIONS,
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};

module.exports.addApplication = (req, res, next, params) => {
  const values = params.values;
  pool.query(
    MasterApplicationQuery.INSERT_NEW_APPLICATION,
    values,
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};

module.exports.editApplication = (req, res, next, params) => {
  pool.query(
    MasterApplicationQuery.EDIT_AN_APPLICATION,
    params,
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};

module.exports.deleteApplication = (req, res, next, params) => {
  const application_id = params.application_id;
  pool.query(
    MasterApplicationQuery.DELETE_AN_APPLICATION,
    [application_id],
    (q_err, q_res) => {
      //var endTime = new Date()
      //log.info("method = {}, API = {}, values = {}, request = {}, response = {}, error = {}, cost = {}",
      //  "deleteNewApplication", MasterApplicationDao.DELETE_AN_APPLICATION, );
      // res = status, rows,
      return res.json(q_res.rows);
    }
  );
};
