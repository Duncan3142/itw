const createError = require('http-errors');
const express = require('express');
const httpLogs = require('morgan');

const router = require('./routes');

const app = express();
app.use(httpLogs('dev'));

app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // Send error
  res.status(err.status || 500);
  res.send(`Ooops, an error occoured: ${err.message}`);
});

module.exports = app;
