/**
 * @author A.Sivatharan
 * created on 20.10.2017
 */
var router = express.Router();
var controll = require('./controller');

router.post('/login',controll.login);
router.post('/register',controll.register);

module.exports=router;