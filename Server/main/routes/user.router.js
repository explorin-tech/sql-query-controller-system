const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { UserService } = require('../services');

/*
    USER ROUTES
*/

// Get list of all users
router.get(routeNames.GET_ALL_USERS, [UserService.GET_getAllUsers]);

// Get one user details
router.get(routeNames.GET_USER_DETAILS, [UserService.GET_getUserDetails]);

// Add user
router.post(routeNames.ADD_AN_USER, [UserService.POST_addNewUser]);

module.exports = router;
