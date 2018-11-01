import '../stylesheets/app.scss'
import router from './router'
import user_controller from './controllers/user'
import {
    userSigninAuth
} from './utils/auth'
const body_template = require('./views/body.html')


// 渲染整体内容结构
$('#wrapper').html(body_template)
let init = async () => {
    let flag = await userSigninAuth();
    console.log(flag)
    if (flag == true) {
        $('#wrapper').removeClass('hidden')
        router.init();
        user_controller.renderUserInfo()
    } else {
        window.location.href = "/admin.html"
    }
}
init()