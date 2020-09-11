const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('./database');
const userRoutes = require('./routes/user');

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS
app.use(cors());

//Routes
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
