const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { MasterApplicationService } = require('../services');

/*
    MASTER APPLICATION ROUTES
*/

// Get list of all applications
router.get(routeNames.GET_ALL_APPLICATIONS, [
  MasterApplicationService.GET_allApplications,
]);

// Add an application
router.post(routeNames.ADD_AN_APPLICATION, [
  MasterApplicationService.POST_addApplication,
]);

// Delete an application
router.delete(routeNames.DELETE_AN_APPLICATION, [
  MasterApplicationService.DELETE_deleteApplication,
]);

module.exports = router;
