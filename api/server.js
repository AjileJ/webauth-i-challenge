const express = require('express');
const knexConnection = require('../database/dbConfig');
const helmet = require('helmet');
const cors = require('cors')
const session = require('express-session');
const KnexSessionStorage = require('connect-session-knex')(session);
const apiRouter = require('../api/api-router');
const configureMiddleware = require('./configure-middleware');

const server = express();

configureMiddleware(server);



const sessionConfiguration ={
  name:"booger",
  secret:process.env.COOKIE_SECRET || "is it secret? is it safe",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 4 * 12,
    secure:process.env.NODE_ENV === "development" ? false : true,
    httpOnly: true
  },
  resave:false,
  saveUninitialized:true,
  store: new KnexSessionStorage({
    knex: knexConnection,
    clearInterval:1000 * 60 * 60 * 24 * 7,
    tablename:"user_sessions",
    sidfieldname: "sid",
    createtable:true
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfiguration));

server.get('/', (req,res) => {
  res.json({api: 'up', session: req.session});
})

server.use('/api', apiRouter);
module.exports = server;