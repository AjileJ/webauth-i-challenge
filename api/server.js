const express = require('express');
const apiRouter = require('../api/api-router');
const configureMiddleware = require('./configure-middleware');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);
module.exports = server;