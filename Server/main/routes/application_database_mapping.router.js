const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { ApplicationDatabaseMappingService } = require('../services');

/*
    APPLICATION DATABASE MAPPING ROUTES
*/

// Get list of all database types
router.get(routeNames.GET_ALL_DATABASE_TYPES, [
  ApplicationDatabaseMappingService.GET_allDatabaseTypes,
]);

// Get all databases
router.get(routeNames.GET_ALL_MAPPED_DATABASES, [
  ApplicationDatabaseMappingService.GET_allDatabases,
]);

// Get database details
router.get(routeNames.GET_DATABASE_DETAILS, [
  ApplicationDatabaseMappingService.GET_databaseDetails,
]);

// Add a database
router.post(routeNames.ADD_DATABASE, [
  ApplicationDatabaseMappingService.POST_addDatabase,
]);

// Edit a database
router.put(routeNames.EDIT_A_DATABASE, [
  ApplicationDatabaseMappingService.PUT_editDatabase,
]);

// Delete a database
router.delete(routeNames.DELETE_A_DATABASE, [
  ApplicationDatabaseMappingService.DELETE_deleteDatabase,
]);

module.exports = router;
