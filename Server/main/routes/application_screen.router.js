const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { ApplicationScreenService } = require('../services');

/*
    APPLICATION SCREEN ROUTES
*/

// Get all application screens
router.get(routeNames.GET_ALL_APPLICATION_SCREENS, [
  ApplicationScreenService.GET_getAllApplicationScreens,
]);

// Get screen details
router.get(routeNames.GET_SCREEN_DETIALS, [
  ApplicationScreenService.GET_getScreenDetails,
]);

// Add a screen
router.post(routeNames.ADD_AN_APPLICATION_SCREEN, [
  ApplicationScreenService.POST_addApplicationScreen,
]);

// Edit a screen
router.put(routeNames.EDIT_AN_APPLICATION_SCREEN, [
  ApplicationScreenService.PUT_editApplicationScreen,
]);

router.delete(routeNames.DELETE_AN_APPLICATION_SCREEN, [
  ApplicationScreenService.DELETE_deleteApplicationScreen,
]);

module.exports = router;
