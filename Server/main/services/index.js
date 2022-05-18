const MasterApplicationService = require('./master_application.service');
const ApplicationDatabaseMappingService = require('./application_database_mapping.service');
const UserService = require('./user.service');
const ApplicationScreenService = require('./application_screen.service');
const ApplicationScreenRightsMappingService = require('./application_screen_rights_mapping.service');
const UserPermissionMappingService = require('./user_permission_mapping.service');
const AuthService = require('./auth.service');
module.exports = {
  MasterApplicationService,
  ApplicationDatabaseMappingService,
  UserService,
  ApplicationScreenService,
  ApplicationScreenRightsMappingService,
  UserPermissionMappingService,
  AuthService,
};
