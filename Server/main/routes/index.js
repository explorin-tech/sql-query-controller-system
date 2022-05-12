const express = require('express');
const router = express.Router();
const pool = require('../db/index');
const constants = require('./constants');

/*
    MASTER APPLICATION ROUTES
*/

// Get list of all applications
router.get(constants.GET_ALL_APPLICATIONS, (req, res, next) => {
  pool.query(
    'SELECT * FROM "MasterApplication" ORDER BY "MA_AddedOn" DESC',
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

// Add an application
router.post(constants.ADD_AN_APPLICATION, (req, res, next) => {
  const values = [
    req.body.application.application_name,
    req.body.application.owner_1,
    req.body.application.owner_2,
    req.body.application.added_by,
    req.body.application.updated_by,
  ];
  pool.query(
    `INSERT INTO "MasterApplication"("MA_Name", "MA_Owner1", "MA_Owner2", "MA_AddedOn", "MA_AddedBy", "MA_UpdatedOn", "MA_UpdatedBy") 
     VALUES($1, $2, $3, NOW(), $4, NOW(), $5) ON CONFLICT DO NOTHING`,
    values,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

// Delete an application
router.delete(constants.DELETE_AN_APPLICATION, (req, res, next) => {
  const application_id = req.body.application_id;
  pool.query(
    `DELETE FROM "MasterApplication" WHERE "MA_ID" = $1`,
    [application_id],
    (q_err, q_res) => {
      res.json(q_res.rows);
      console.log(q_err);
    }
  );
});

/*
    MASTER DATABASE ROUTES
*/

// Get all databases
router.get(constants.GET_ALL_DATABASES, (req, res, next) => {
  pool.query(
    `SELECT * from "DataBaseApplicationMapping" ORDER BY "DBAM_AddedOn" DESC`,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

//
module.exports = router;
