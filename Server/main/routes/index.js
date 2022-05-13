const masterApplicationRouter = require('./master_application.router');
const applicationDatabaseMappingRouter = require('./application_database_mapping.router');

const init = (app) => {
  app.use('/api', masterApplicationRouter);
  app.use('/api', applicationDatabaseMappingRouter);
};

module.exports = init;
