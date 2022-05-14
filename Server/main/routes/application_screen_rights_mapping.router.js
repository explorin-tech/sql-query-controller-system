const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { ApplicationScreenRightsMappingService } = require('../services');

// Get screen rights mapping for a user.
router.get(routeNames.GET_ALL_SCREEN_RIGHTS_FOR_AN_USER, [
  ApplicationScreenRightsMappingService.GET_allScreenRightsMappingForAnUser,
]);

module.exports = router;
