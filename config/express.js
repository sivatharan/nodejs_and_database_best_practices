/**
 * @author A.Sivatharan
 * created on 20.10.2017
 */
var bodyParser = require('body-parser'),
    assert = require('assert'),
    expressValidator = require('express-validator'),
    util = require('util'),
    cors=require('cors');


module.exports = function(app) {

  app.use(bodyParser.json());
  app.use(expressValidator([]));
  app.use(bodyParser.urlencoded({
      extended: true
  }));

  app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
      // console.info("res", res);
        res.status(500).json({status: false, message: "failed", result: "Syntax Error"});
    } else {
      next();
    }
  });
  // process.on('UnauthorizedError', (err) => {
   
  // });

  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
}