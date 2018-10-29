let express = require('express');
let router = express.Router();
var fileUpload = require('../middlewares/fileUpload')

let food_controller = require('../controllers/food')
router.post('/save', fileUpload, food_controller.save)
router.get('/list', food_controller.write)
router.get('/list_page', food_controller.listPage)
router.post('/update', fileUpload, food_controller.up_date);
router.get('/listone', food_controller.listone);
router.delete('/remove', food_controller.remove);
module.exports = router;