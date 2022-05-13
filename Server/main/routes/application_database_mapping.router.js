const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { ApplicationDatabaseMappingService } = require('../services');

/*
    MASTER APPLICATION ROUTES
*/

// Get all databases

router.get(routeNames.GET_ALL_MAPPED_DATABASES, [
  ApplicationDatabaseMappingService.GET_allDatabases,
]);

module.exports = router;
