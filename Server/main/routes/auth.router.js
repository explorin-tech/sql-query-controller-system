const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { AuthService } = require('../services');

/*
    AUTH ROUTES
*/
// Login url
router.post(routeNames.LOGIN, [AuthService.POST_loginUser]);

module.exports = router;
