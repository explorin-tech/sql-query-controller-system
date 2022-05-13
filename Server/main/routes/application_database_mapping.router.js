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

// Add a database

router.post(routeNames.ADD_DATABASE, [
  ApplicationDatabaseMappingService.POST_addDatabase,
]);

// Edit a database

router.put(routeNames.EDIT_A_DATABASE, [
  ApplicationDatabaseMappingService.PUT_editDatabase,
]);

module.exports = router;
