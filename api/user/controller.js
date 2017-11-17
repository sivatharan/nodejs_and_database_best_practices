/**
 * @author A.Sivatharan
 * created on 20.10.2017
 */

exports.register = function (req, res, next) {
	req.checkBody('username', 'Invalid username').notEmpty().withMessage("username con not be empty");
	req.checkBody('password', 'Invalid password').notEmpty().withMessage("username con not be empty");

	var errors = req.validationErrors();

   	if(appFunc.contentType(req) != 'json') return res.status(200).json({status: false, message: "faild", result: 'Content type must be'});
    if (errors) return res.status(200).json({status: false, message: "faild", result: errors});
    

     mysqlDB.getConnection(function(err, connection) {
    	if(err)  return res.status(200).json({status: false, message: "faild", result:err});
    	req.body.password = password_hash.generate(req.body.password);
    	
	    connection.query('insert into user set ?', req.body , function (error, results, fields) {
	   		connection.release();
		  	if (error) return res.status(200).json({status: false, message: "Faild", result:error});
		  	res.status(200).json({status: true, message: "Success", result: results});
		});
	});		
	
}

exports.login = function (req, res, next) {
	req.checkBody('username', 'Invalid username').notEmpty().withMessage("username con not be empty");
	req.checkBody('password', 'Invalid password').notEmpty().withMessage("username con not be empty");

	var errors = req.validationErrors();

   	if(appFunc.contentType(req) != 'json') return res.status(200).json({status: false, message: "faild", result: 'Content type must be'});
    if (errors) return res.status(200).json({status: false, message: "faild", result: errors});
    mysqlDB.getConnection(function(err, connection) {
    	if(err) return res.status(200).json({status: false, message: "faild", result:err});
    	/* using PROCEDURE  in mysql */
	    connection.query('call user_login("'+req.body.username+'")' , function (error, results, fields) {
	   		connection.release();
		  	if (error) return res.status(200).json({status: false, message: "faild", result:error});
		  	if(results.length < 1) return res.status(404).json({status: false, message: "faild", result:'username is wrong'});
		  	
		 

		  	if(!password_hash.verify(req.body.password, results[0][0].password)) return res.status(404).json({status: false, message: "faild", result:'password is wrong'});
		  	var token = jwt.sign({id:results[0].id}, globalJs.jwt.secret, {expiresIn: globalJs.jwt.expiresIn});	
		
			res.status(200).json({status: true, message: "success", result:{token:token}});
		});
	});
}