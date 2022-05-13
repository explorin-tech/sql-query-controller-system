const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { UserService } = require('../services');

/*
    USER ROUTES
*/

// Get list of all users
router.get(routeNames.GET_ALL_USERS, [UserService.GET_getAllUsers]);

module.exports = router;
