const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { ApplicationDatabaseMappingService } = require('../services');
const { authValidator } = require('../common/authHelper');

/*
    APPLICATION DATABASE MAPPING ROUTES
*/

// Get list of all database types
router.get(routeNames.GET_ALL_DATABASE_TYPES, [
  authValidator,
  ApplicationDatabaseMappingService.GET_getAllDatabaseTypes,
]);

// Get all databases
router.get(routeNames.GET_ALL_MAPPED_DATABASES, [
  authValidator,
  ApplicationDatabaseMappingService.GET_getAllDatabases,
]);

// Get database details
router.get(routeNames.GET_DATABASE_DETAILS, [
  authValidator,
  ApplicationDatabaseMappingService.GET_databaseDetails,
]);

// Add a database
router.post(routeNames.ADD_DATABASE, [
  authValidator,
  ApplicationDatabaseMappingService.POST_addDatabase,
]);

// Edit a database
router.put(routeNames.EDIT_A_DATABASE, [
  authValidator,
  ApplicationDatabaseMappingService.PUT_editDatabase,
]);

// Delete a database
router.delete(routeNames.DELETE_A_DATABASE, [
  authValidator,
  ApplicationDatabaseMappingService.DELETE_deleteDatabase,
]);

module.exports = router;
