const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { ApplicationScreenService } = require('../services');

router.get(routeNames.GET_ALL_APPLICATION_SCREENS, [
  ApplicationScreenService.GET_allApplicationScreens,
]);

module.exports = router;
