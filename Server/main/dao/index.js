const MasterApplicationDao = require('./master_application.dao');
const MasterDatabaseDao = require('./master_database.dao');
const UserDao = require('./user.dao');
const ApplicationScreenDao = require('./application_screen.dao');
const ApplicationScreenRightsMappingDao = require('./application_screen_rights_mapping.dao');
const UserPermissionMappingDao = require('./user_permission_mapping.dao');
const QueryDao = require('./query.dao');
const DatabaseApplicationMappingDao = require('./database_application_mapping.dao');

module.exports = {
  MasterApplicationDao,
  MasterDatabaseDao,
  UserDao,
  ApplicationScreenDao,
  ApplicationScreenRightsMappingDao,
  UserPermissionMappingDao,
  QueryDao,
  DatabaseApplicationMappingDao,
};
