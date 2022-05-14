const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { ApplicationScreenRightsMappingService } = require('../services');

/*
    APPLICATION SCREEN RIGHTS MAPPING ROUTES
*/

// Get screen rights mappings for a user.
router.get(routeNames.GET_ALL_SCREEN_RIGHTS_FOR_AN_USER, [
  ApplicationScreenRightsMappingService.GET_getAllScreenRightsMappingForAnUser,
]);

// Add screen rights mapping for a user.
router.post(routeNames.ADD_SCREEN_RIGHTS_MAPPING_FOR_AN_USER, [
  ApplicationScreenRightsMappingService.POST_addScreenRightsMappingForAnUser,
]);

// Edit screen rights mapping for a user.
router.put(routeNames.EDIT_SCREEN_RIGHTS_MAPPING_FOR_AN_USER, [
  ApplicationScreenRightsMappingService.PUT_editScreenRightsMappingForAnUser,
]);

// Delete screen rights mapping for a user.
router.delete(routeNames.DELETE_SCREEN_RIGHTS_MAPPING_FOR_AN_USER, [
  ApplicationScreenRightsMappingService.DELETE_deleteScreenRightsMappingsForAnUser,
]);
module.exports = router;
