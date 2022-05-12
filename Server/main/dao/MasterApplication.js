const pool = require('../db/index');
const {MasterApplicationQueries} = require('./queries/MasterApplicationQueries')

module.exports.deleteApplication = (params) => {
    var application_id = params.application_id;
    var result = pool.query(
        MasterApplicationQueries.DELETE_AN_APPLICATION, [application_id],
        (q_err, q_res) => {
          console.log(q_err, q_res)
          //var endTime = new Date()
          //log.info("method = {}, API = {}, values = {}, request = {}, response = {}, error = {}, cost = {}", 
          //  "deleteNewApplication", MasterApplicationDao.DELETE_AN_APPLICATION, );
          // res = status, rows, 
          return q_res;
        }
    );
    return result;
}