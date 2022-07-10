const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { MasterDatabaseService } = require('../services');
const { authValidator } = require('../common/authHelper');

/*
    DATABASE ROUTES
*/

// Get list of all database types
router.get(routeNames.GET_ALL_DATABASE_TYPES, [
  authValidator,
  MasterDatabaseService.GET_getAllDatabaseTypes,
]);

// Get all databases
router.get(routeNames.GET_ALL_DATABASES, [
  authValidator,
  MasterDatabaseService.GET_getAllDatabases,
]);

// Get database details
router.get(routeNames.GET_DATABASE_DETAILS, [
  authValidator,
  MasterDatabaseService.GET_databaseDetails,
]);

// Add a database
router.post(routeNames.ADD_DATABASE, [
  authValidator,
  MasterDatabaseService.POST_addDatabase,
]);

// Edit a database
router.put(routeNames.EDIT_A_DATABASE, [
  authValidator,
  MasterDatabaseService.PUT_editDatabase,
]);

// Delete a database
router.delete(routeNames.DELETE_A_DATABASE, [
  authValidator,
  MasterDatabaseService.DELETE_deleteDatabase,
]);

module.exports = router;
