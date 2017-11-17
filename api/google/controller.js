/**
 * @author A.Sivatharan
 * created on 20.10.2017
 */


/*get google distance , time and calculating fare info depending on the distance*/
/*{"src_lat":6.863258,"src_lon":79.867552,"des_lat":6.872434,"des_lon":79.883435,"type":"a","country":"LKR"}*/
exports.getTravel = function (req, res, next) {
	req.checkBody('src_lat', 'Invalid lattitute').notEmpty().isDecimal().withMessage("src_lat should be Integer");
	req.checkBody('src_lon', 'Invalid lontitute').notEmpty().isDecimal().withMessage("src_lon should be Integer");
	req.checkBody('des_lat', 'Invalid lattitute').notEmpty().isDecimal().withMessage("des_lat should be Integer");
	req.checkBody('des_lon', 'Invalid lontitute').notEmpty().isDecimal().withMessage("des_lon should be Integer");
	req.checkBody('type', 'Invalid type').notEmpty().isAlpha().withMessage("type should be String");
	req.checkBody('country', 'Invalid country').notEmpty().isAlpha().withMessage("country should be String");
    var errors = req.validationErrors();

   	if(appFunc.contentType(req) != 'json') return res.status(200).json({status: false, message: "faild", result: 'Content type must be'});
    if (errors) return res.status(200).json({status: false, message: "faild", result: errors});
   

    const obj = {
		  	index:1,
		  	mode:'driving',
		    origin: req.body.src_lat+','+ req.body.src_lon,
  			destination: req.body.des_lat+','+ req.body.des_lon
		}
	google_distance.get(obj, function(err, data) {
		
		if (err) return res.status(200).json({status: false, message: "faild", result: err});
		if(data){
			mysqlDB.getConnection(function(err, connection) {
		    	if(err)  return res.status(200).json({status: false, message: "faild", result:err});
		    	
			    connection.query('select * from fare where type=? and country=?', [req.body.type,req.body.country], function (error, results, fields) {
			   		connection.release();
			  		if (error) return res.status(200).json({status: false, message: "Faild", result:error});
			  		const amount = calculatingFareInfo(data,results);
			  		data.amount = amount;
			  		res.status(200).json({status: true, message: "success", result: data});
				});
			});
		}else{
			return res.status(200).json({status: true, message: "success", result: data})
		}
	
	});
	
}

function calculatingFareInfo(google_data,fare){
	var distance = parseFloat( google_data.distance);
	var amount = 0;
	if(distance <= 1){
		amount = fare[0].first_fare_amount;
	}else{
		amount = fare[0].first_fare_amount + (distance -1)*fare[0].fare_amount;
	}
	return amount;
}

