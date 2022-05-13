const express = require('express');
const { MasterApplicationDao } = require('../dao/index');

module.exports.POST_addApplication = (req, res, next) => {
  const values = [
    req.body.application.application_name,
    req.body.application.owner_1,
    req.body.application.owner_2,
    req.body.application.added_by,
    req.body.application.updated_by,
  ];
  const params = {
    values: values,
  };
  const response = MasterApplicationDao.addApplication(req, res, next, params);
  return response;
};

module.exports.DELETE_deleteApplication = (req, res, next) => {
  //var startTime = new Date()
  const application_id = req.body.application_id;
  const params = {
    application_id: application_id,
  };
  const response = MasterApplicationDao.deleteApplication(
    req,
    res,
    next,
    params
  );
  return response;
  //log.info("method = {}, API = {}, values = {}, request = {}, response = {}, error = {}, cost = {}",
  //  "deleteNewApplication", MasterApplicationDao.DELETE_AN_APPLICATION, );
};

module.exports.GET_allApplications = (req, res, next) => {
  const response = MasterApplicationDao.getAllApplications(req, res, next);
  return response;
};
