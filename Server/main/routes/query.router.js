const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { QueryService } = require('../services');
const { authValidator } = require('../common/authHelper');

/*
    QUERY ROUTES
*/

// Get all mapped draft queries for an user
router.get(routeNames.GET_ALL_MAPPED_DRAFT_QUERIES_FOR_USER, [
  authValidator,
  QueryService.GET_getAllMappedDraftQueriesForAnUser,
]);

// Get all mapped history queries for an user
router.get(routeNames.GET_ALL_MAPPED_HISTORY_QUERIES_FOR_USER, [
  authValidator,
  QueryService.GET_getAllMappedHistoryQueriesForAnUser,
]);
module.exports = router;
