const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { ApplicationScreenRightsMappingService } = require('../services');
const { authValidator } = require('../common/authHelper');

/*
    APPLICATION SCREEN RIGHTS MAPPING ROUTES
*/

// Get screen rights mappings for a user.
router.get(routeNames.GET_ALL_SCREEN_RIGHTS_FOR_AN_USER, [
  authValidator,
  ApplicationScreenRightsMappingService.GET_getAllScreenRightsMappingForAnUser,
]);

// Add screen rights mapping for a user.
router.post(routeNames.ADD_SCREEN_RIGHTS_MAPPING_FOR_AN_USER, [
  authValidator,
  ApplicationScreenRightsMappingService.POST_addScreenRightsMappingForAnUser,
]);

// Edit screen rights mapping for a user.
router.put(routeNames.EDIT_SCREEN_RIGHTS_MAPPING_FOR_AN_USER, [
  authValidator,
  ApplicationScreenRightsMappingService.PUT_editScreenRightsMappingForAnUser,
]);

module.exports = router;
