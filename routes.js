/**
 * @author A.Sivatharan
 * created on 20.10.2017
 */
'use strict';
module.exports = function(app) {
	
	app.use('/api/customer', require('./api/customer'));
	app.use('/api/google', require('./api/google'));
	app.use('/api/user', require('./api/user'));

	app.get('*', function(req, res){
	  	res.status(404).json({status: false, message: "faild", result: 'Please check your method or url'});
	});
	app.post('*', function(req, res){
	 	res.status(404).json({status: false, message: "faild", result: 'Please check your method or url'});
	});
}
