const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const serveStatic = require('serve-static');

require('dotenv').config();

require('./database');

//Server
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

//Routes

const userRoutes = require('./routes/user');

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(serveStatic(path.join(__dirname, '..', '/client')));

app.use('/user', userRoutes);

//Errors handlers

app.use((req, res, next) => {
  const error = new Error('Not Found');
  // @ts-ignore
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
