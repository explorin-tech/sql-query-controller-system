const express = require('express');
const masterApplicationRouter = require('./master_application.router');

const init = (app) => {
  app.use('/api', masterApplicationRouter);
};

module.exports = init;
