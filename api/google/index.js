/**
 * @author A.Sivatharan
 * created on 20.10.2017
 */
var router = express.Router();
var controll = require('./controller');

router.post('/travel', controll.getTravel); //appFunc.veryfyJWTToken,

module.exports=router;