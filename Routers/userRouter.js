const router = require('express').Router();
const {signUp,verifyOtp}=require('../Controllers/userContrullers');
router.route('/signUp')
.post(signUp)
router.route('/signUp/verify')
.post(verifyOtp);
module.exports=router;