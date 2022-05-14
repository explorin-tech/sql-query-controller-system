const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { ApplicationScreenRightsMappingService } = require('../services');

// Get screen rights mappings for a user.
router.get(routeNames.GET_ALL_SCREEN_RIGHTS_FOR_AN_USER, [
  ApplicationScreenRightsMappingService.GET_getAllScreenRightsMappingForAnUser,
]);

// Add screen rights mapping for a user.
router.get(routeNames.ADD_SCREEN_RIGHTS_MAPPING_FOR_AN_USER, [
  ApplicationScreenRightsMappingService.POST_addScreenRightsMappingForAnUser,
]);

module.exports = router;
