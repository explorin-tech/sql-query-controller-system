const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { UserPermissionMappingService } = require('../services');

/*
    USER PERMISSION RIGHTS MAPPING ROUTES
*/

// Get all permission rights for an user
router.get(routeNames.GET_ALL_USER_PERMISSION_MAPPING_FOR_AN_USER, [
  UserPermissionMappingService.GET_getAllUserPermissionMappingForAnUser,
]);

// Add permission rights for an user
module.exports = router;