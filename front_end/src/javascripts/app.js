import '../stylesheets/app.scss'
import router from './router'

const body_template = require('./views/body.html')


// 渲染整体内容结构
$('#wrapper').html(body_template)
router.init();