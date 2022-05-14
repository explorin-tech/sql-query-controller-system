const masterApplicationRouter = require('./master_application.router');
const applicationDatabaseMappingRouter = require('./application_database_mapping.router');
const userRouter = require('./user.router');
const applicationScreenRouter = require('./application_screen.router');
const applicationScreenRightsMappingRouter = require('./application_screen_rights_mapping.router');

const init = (app) => {
  app.use('/api', masterApplicationRouter);
  app.use('/api', applicationDatabaseMappingRouter);
  app.use('/api', userRouter);
  app.use('/api', applicationScreenRouter);
  app.use('/api', applicationScreenRightsMappingRouter);
};

module.exports = init;
