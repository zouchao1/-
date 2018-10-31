import '../stylesheets/app.scss'
import router from './router'
import {
    userSigninAuth
} from './utils/auth'
import user_controller from './controllers/user'
const body_template = require('./views/body.html')


// 渲染整体内容结构
$('#wrapper').html(body_template)
userSigninAuth(() => {
    router.init();
    $("#wrapper").removeClass("hidden");
    user_controller.renderinfo()
}, () => {
    window.location.href = "/admin.html"
})

router.init();