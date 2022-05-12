const express = require('express');
const router = express.Router();
const pool = require('../db/index');
const routeNames = require('../constants/RouteNames');
const services = require('../services')


/*
    MASTER APPLICATION ROUTES
*/

// Get list of all applications
router.get(routeNames.GET_ALL_APPLICATIONS, (req, res, next) => {
  pool.query(
    masterApplicationDao.SELECT_ALL_MASTER_APPLICATIONS,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

// Add an application
router.post(routeNames.ADD_AN_APPLICATION, (req, res, next) => {
  const values = [
    req.body.application.application_name,
    req.body.application.owner_1,
    req.body.application.owner_2,
    req.body.application.added_by,
    req.body.application.updated_by,
  ];
  pool.query(
    masterApplicationDao.INSERT_NEW_APPLICATION, values,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

// Delete an application
router.delete(routeNames.DELETE_AN_APPLICATION, [
  services.MasterApplicationService.deleteNewApplication
]);

/*
    MASTER DATABASE ROUTES
*/

// Get all databases
router.get(routeNames.GET_ALL_DATABASES, (req, res, next) => {
  pool.query(
    sad,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

//
module.exports = router;



