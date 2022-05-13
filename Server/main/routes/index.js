const masterApplicationRouter = require('./master_application.router');
const applicationDatabaseMappingRouter = require('./application_database_mapping.router');
const databaseTypesRouter = require('./database_type.router');

const init = (app) => {
  app.use('/api', masterApplicationRouter);
  app.use('/api', applicationDatabaseMappingRouter);
  app.use('/api', databaseTypesRouter);
};

module.exports = init;
