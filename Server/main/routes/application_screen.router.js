const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { ApplicationScreenService } = require('../services');
const { authValidator } = require('../common/authHelper');

/*
    APPLICATION SCREEN ROUTES
*/

// Get all application screens
router.get(routeNames.GET_ALL_APPLICATION_SCREENS, [
  authValidator,
  ApplicationScreenService.GET_getAllApplicationScreens,
]);

// Get screen details
router.get(routeNames.GET_SCREEN_DETIALS, [
  authValidator,
  ApplicationScreenService.GET_getScreenDetails,
]);

// Add a screen
router.post(routeNames.ADD_AN_APPLICATION_SCREEN, [
  authValidator,
  ApplicationScreenService.POST_addApplicationScreen,
]);

// Edit a screen
router.put(routeNames.EDIT_AN_APPLICATION_SCREEN, [
  authValidator,
  ApplicationScreenService.PUT_editApplicationScreen,
]);

// Delete a screen
router.delete(routeNames.DELETE_AN_APPLICATION_SCREEN, [
  authValidator,
  ApplicationScreenService.DELETE_deleteApplicationScreen,
]);

module.exports = router;
