var express = require('express');
var router = express.Router();
var pool = require('./db');

/*
    MASTER APPLICATION ROUTES
*/

// Get list of all applications
router.get('/api/get/allApplications', (req, res, next) => {
  pool.query(
    'SELECT * FROM "MasterApplication" ORDER BY "MA_AddedOn" DESC',
    (q_err, q_res) => {
      console.log(q_res.rows);
      res.json(q_res.rows);
    }
  );
});

module.exports = router;
