const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { DatabaseTypeService } = require('../services');

/*
    Database Type Routes
*/

// Get list of all database types
router.get(routeNames.GET_ALL_DATABASE_TYPES, [
  DatabaseTypeService.GET_allDatabaseTypes,
]);

module.exports = router;
