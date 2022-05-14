const MasterApplicationDao = require('./master_application.dao');
const ApplicationDatabaseMappingDao = require('./application_database_mapping.dao');
const UserDao = require('./user.dao');
const ApplicationScreenDao = require('./application_screen.dao');
const ApplicationScreenRightsMappingDao = require('./application_screen_rights_mapping.dao');

module.exports = {
  MasterApplicationDao,
  ApplicationDatabaseMappingDao,
  UserDao,
  ApplicationScreenDao,
  ApplicationScreenRightsMappingDao,
};
