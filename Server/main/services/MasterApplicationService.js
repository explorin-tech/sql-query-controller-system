const express = require('express');
const MasterApplicationDao = require('../dao/MasterApplicationDao')


module.exports.deleteNewApplication = (req, res, next) => {
  //var startTime = new Date()
  const application_id = req.body.application_id;
  pool.query(
    MasterApplicationDao.DELETE_AN_APPLICATION, [application_id],
    (q_err, q_res) => {
      console.log(q_err, q_res)
      //var endTime = new Date()
      //log.info("method = {}, API = {}, values = {}, request = {}, response = {}, error = {}, cost = {}", 
      //  "deleteNewApplication", MasterApplicationDao.DELETE_AN_APPLICATION, );
      // res = status, rows, 
      return res.json(q_res.rows);
    }
  );
}
