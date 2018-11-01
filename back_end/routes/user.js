var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user')
var auth = require('../middlewares/auth')
var resApplicationJson = require("../middlewares")


// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson.resApplicationJson)
router.get('/isSignIn', auth.userSigninAuth, user_controller.isSignIn);

router.get('/info', auth.userSigninAuth, user_controller.info);
router.get('/check', auth.userSigninAuth, user_controller.check);

module.exports = router;