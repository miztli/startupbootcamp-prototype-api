var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('../../SSL/www.cognition.live_private_key.key', 'utf8');
var certificate = fs.readFileSync('../../SSL/www.cognition.live_ssl_certificate.cer', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port = process.env.PORT || 1336;
var ports = process.env.PORT || 1337;

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


httpServer.listen(port,function () {
  console.log('Example app listening on port ' + port + '!');
});
httpsServer.listen(ports,function () {
  console.log('Example app listening on port secured' + port + '!');
}););

module.exports = app;
