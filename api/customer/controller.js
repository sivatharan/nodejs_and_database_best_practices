/**
 * @author A.Sivatharan
 * created on 20.10.2017
 */
exports.getCustomer = function (req, res, next) {
	mysqlDB.query('select * from customer', function (error, results, fields) {
	  	mysqlDB.release();
	  	if (error) return res.status(200).json({status: false, message: "Faild", result:error});
	  	res.status(200).json({status: true, message: "Success", result: results});
	});
}

exports.getCustomerById = function (req, res, next) {
   	mysqlDB.query('select * from customer where Id=?', [req.params.id], function (error, results, fields) {
   		mysqlDB.release();
	  	if (error) return res.status(200).json({status: false, message: "Faild", result:error});
	  	res.status(200).json({status: true, message: "Success", result: results});
	});
};