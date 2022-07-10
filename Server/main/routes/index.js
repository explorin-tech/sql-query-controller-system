const masterApplicationRouter = require('./master_application.router');
const masterDatabaseRouter = require('./master_database.router');
const userRouter = require('./user.router');
const applicationScreenRouter = require('./application_screen.router');
const applicationScreenRightsMappingRouter = require('./application_screen_rights_mapping.router');
const userPermissionMappingRouter = require('./user_permission_mapping.router');
const authRouter = require('./auth.router');
const queryRouter = require('./query.router');
const databaseApplicationMappingRouter = require('./database_application_mapping.router');

const init = (app) => {
  app.use('/api', masterApplicationRouter);
  app.use('/api', masterDatabaseRouter);
  app.use('/api', userRouter);
  app.use('/api', applicationScreenRouter);
  app.use('/api', applicationScreenRightsMappingRouter);
  app.use('/api', userPermissionMappingRouter);
  app.use('/api', authRouter);
  app.use('/api', queryRouter);
  app.use('/api', databaseApplicationMappingRouter);
};

module.exports = init;
