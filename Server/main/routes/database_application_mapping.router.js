const express = require('express');
const router = express.Router();
const routeNames = require('../constants/route_names');
const { DatabaseApplicationMappingService } = require('../services');
const { authValidator } = require('../common/authHelper');

router.get(routeNames.GET_ALL_DATABASE_APPLICATION_MAPPINGS, [
  authValidator,
  DatabaseApplicationMappingService.GET_getAllDatabaseMappings,
]);

router.get(routeNames.GET_DATABASE_APPLICATION_MAPPING_DETAILS, [
  authValidator,
  DatabaseApplicationMappingService.GET_getDatabaseApplicationMappingDetails,
]);

router.post(routeNames.ADD_DATABASE_APPLICATION_MAPPING, [
  authValidator,
  DatabaseApplicationMappingService.POST_addDatabaseApplicationMapping,
]);

router.put(routeNames.EDIT_DATABASE_APPLICATION_MAPPING, [
  authValidator,
  DatabaseApplicationMappingService.PUT_editDatabaseApplicationMapping,
]);

router.delete(routeNames.DELETE_DATABASE_APPLICATION_MAPPING, [
  authValidator,
  DatabaseApplicationMappingService.DELETE_deleteDatabaseApplicationMapping,
]);

module.exports = router;
