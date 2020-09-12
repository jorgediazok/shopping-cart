const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

require('./database');

const userRoutes = require('./routes/user');

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use(cors());

//Routes
app.get('/', function (req, res) {
  res.send('The server is working ok');
});

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