/**
 * @author A.Sivatharan
 * created on 20.10.2017
 */
var router = express.Router();
var controll = require('./controller');

router.get('/',controll.getCustomer);
router.get('/:id', controll.getCustomerById);

module.exports=router;