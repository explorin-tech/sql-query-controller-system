const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { UserService } = require('../services');
const { authValidator } = require('../common/authHelper');

/*
    USER ROUTES
*/

// Get list of all user types
router.get(routeNames.GET_ALL_USERTYPES, [
  authValidator,
  UserService.GET_getAllUserTypes,
]);

// Get list of all users
router.get(routeNames.GET_ALL_USERS, [
  authValidator,
  UserService.GET_getAllUsers,
]);

// Get one user details
router.get(routeNames.GET_USER_DETAILS, [
  authValidator,
  UserService.GET_getUserDetails,
]);

// Add user
router.post(routeNames.ADD_AN_USER, [
  authValidator,
  UserService.POST_addNewUser,
]);

// Edit user
router.put(routeNames.EDIT_USER_DETAILS, [
  authValidator,
  UserService.PUT_editUserDetails,
]);

// Delete user
router.delete(routeNames.DELETE_AN_USER, [
  authValidator,
  UserService.POST_deleteUser,
]);

module.exports = router;
