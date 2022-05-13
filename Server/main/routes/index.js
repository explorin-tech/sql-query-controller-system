const masterApplicationRouter = require('./master_application.router');
const applicationDatabaseMappingRouter = require('./application_database_mapping.router');
const userRouter = require('./user.router');

const init = (app) => {
  app.use('/api', masterApplicationRouter);
  app.use('/api', applicationDatabaseMappingRouter);
  app.use('./api', userRouter);
};

module.exports = init;
