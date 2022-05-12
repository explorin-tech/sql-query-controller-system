const express = require('express');
const {MasterApplication} = require('../dao/MasterApplication')


module.exports.deleteNewApplication = (req, res, next) => {
  //var startTime = new Date()
  const application_id = req.body.application_id;
  var params = {
    application_id: application_id
  }
  var response = MasterApplication.deleteApplication(params)
  return response;
  //log.info("method = {}, API = {}, values = {}, request = {}, response = {}, error = {}, cost = {}", 
      //  "deleteNewApplication", MasterApplicationDao.DELETE_AN_APPLICATION, );
      
}
