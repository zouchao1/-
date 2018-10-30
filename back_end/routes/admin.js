var express = require("express")
var router = express.Router();
var admin_controller = require("../controllers/admin")
var {
    resApplicationJson
} = require('../middlewares')
var admin_controller = require('../controllers/admin')
router.use(resApplicationJson)

router.post('/signup', admin_controller.signup)
router.post('/signin', admin_controller.signin)

module.exports = router;