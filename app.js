/**
 * @author A.Sivatharan
 * created on 20.10.2017
 */
global.express = require('express');
global.app = express();
global.request =  require('request');
global.globalJs = require('./config/globals');
global.env = require('./config/env');
global.mysql  = require('mysql');
global.util = require('util');
global.appFunc = require('./config/app');
global.mysqlDB = require('./config/database');
global.google_distance = require('google-distance');
global.jwt = require('jsonwebtoken');
global.password_hash = require('password-hash');
global.fs = require('fs');


require('./config/express')(app);
require('./routes')(app);

app.listen(env.PORT,function(){
	console.info(' server is running on '+env.PORT);
});
