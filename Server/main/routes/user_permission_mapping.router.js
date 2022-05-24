const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { UserPermissionMappingService } = require('../services');
const { authValidator } = require('../common/authHelper');

/*
    USER PERMISSION RIGHTS MAPPING ROUTES
*/

// Get all permission rights for an user
router.get(routeNames.GET_ALL_USER_PERMISSION_MAPPING_FOR_AN_USER, [
  authValidator,
  UserPermissionMappingService.GET_getAllUserPermissionMappingForAnUser,
]);

// Edit permission rights mapping for an user
router.put(routeNames.EDIT_USER_PERMISSIONS_MAPPING_FOR_AN_USER, [
  authValidator,
  UserPermissionMappingService.PUT_editUserPermissionsMappingForAnUser,
]);

module.exports = router;
