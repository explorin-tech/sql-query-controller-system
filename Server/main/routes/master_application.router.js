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

// Get one application details
router.get(routeNames.GET_APPLICATION_DETAILS, [
  MasterApplicationService.GET_applicationDetails,
]);

// Add an application
router.post(routeNames.ADD_AN_APPLICATION, [
  MasterApplicationService.POST_addApplication,
]);

// Edit an application
router.put(routeNames.EDIT_AN_APPLICATION, [
  MasterApplicationService.PUT_editApplication,
]);

// Delete an application
router.delete(routeNames.DELETE_AN_APPLICATION, [
  MasterApplicationService.DELETE_deleteApplication,
]);

module.exports = router;
