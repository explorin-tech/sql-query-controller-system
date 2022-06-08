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

// Edit a query
router.put(routeNames.EDIT_A_QUERY, [
  authValidator,
  QueryService.PUT_editAQuery,
]);

// Update query status for approval/rejection
router.put(routeNames.EDIT_QUERY_STATUS_FOR_APPROVAL_OR_REJECTION, [
  authValidator,
  QueryService.PUT_editQueryStatusForApprovalOrRejection,
]);

// Edit a query in state of hold for approval
router.put(routeNames.EDIT_QUERY_IN_HOLD_FOR_APPROVAL, [
  authValidator,
  QueryService.PUT_editAQueryInHoldForApproval,
]);

module.exports = router;
