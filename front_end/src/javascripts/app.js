import '../stylesheets/app.scss'
import router from './router'

import {
    userSigninAuth
} from './util/auth'
const body_template = require('./views/body.html')


// 渲染整体内容结构
$('#wrapper').html(body_template)

let flag = userSigninAuth();
if (flag == true) {
    router.init();
    $('#wrapper').removeClass('hidden')
} else {
    window.location.href = "/admin.html"
}