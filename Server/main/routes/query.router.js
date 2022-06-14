const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { QueryService, AuthService } = require('../services');
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

// Get query details for a given specific query_id
router.get(routeNames.GET_QUERY_DETAILS, [
  authValidator,
  QueryService.GET_getQueryDetailsForGivenQueryID,
]);

// Add a new query
router.post(routeNames.POST_ADD_NEW_QUERY, [
  authValidator,
  QueryService.POST_addNewQuery,
]);

// Update query status for approval/rejection
router.put(routeNames.EDIT_QUERY_STATUS_FOR_APPROVAL_OR_REJECTION, [
  authValidator,
  QueryService.PUT_editQueryStatusForApprovalOrRejection,
]);

// Edit a query
router.put(routeNames.EDIT_QUERY, [authValidator, QueryService.PUT_editQuery]);

// execute a query
router.post(routeNames.EXECUTE_QUERY, [
  authValidator,
  QueryService.POST_executeQuery,
]);

// get queries which are awaiting for approval
router.get(routeNames.GET_QUERIES_AWAITING_APPROVAL, [
  authValidator,
  QueryService.GET_queriesAwaitingForApproval,
]);
module.exports = router;
