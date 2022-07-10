const MasterApplicationService = require('./master_application.service');
const MasterDatabaseService = require('./master_database.service');
const UserService = require('./user.service');
const ApplicationScreenService = require('./application_screen.service');
const ApplicationScreenRightsMappingService = require('./application_screen_rights_mapping.service');
const UserPermissionMappingService = require('./user_permission_mapping.service');
const AuthService = require('./auth.service');
const QueryService = require('./query.service');
const DatabaseApplicationMappingService = require('./database_application_mapping.service');

module.exports = {
  MasterApplicationService,
  MasterDatabaseService,
  UserService,
  ApplicationScreenService,
  ApplicationScreenRightsMappingService,
  UserPermissionMappingService,
  AuthService,
  QueryService,
  DatabaseApplicationMappingService,
};
