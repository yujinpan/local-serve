var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var history = require('connect-history-api-fallback');
var createProxyMiddleware = require('http-proxy-middleware').createProxyMiddleware;
var cors = require('cors');

var proxyConfig = require('./proxy.config');

var indexRouter = require('./routes/index');

var app = express();
// app.use(history()); // use html5 history mode

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// proxy
for(var key in proxyConfig) {
  console.log(key);
  app.use(key, createProxyMiddleware(proxyConfig[key]));
}

app.use('/', indexRouter);

module.exports = app;
