import user_model from '../models/user'
const renderUserInfo = async () => {
    let _result = await user_model.info();
    if (_result.status === 304) { // 用户没有登录信息
        alert('请重新登录')
        window.location.href = '/admin.html'
    } else {
        $('.nickname').html(_result.data.nickname)
    }

    $('.exit').click(async function () {
        localStorage.removeItem('token')
        window.location.href = '/admin.html'
    })
}

export default {
    renderUserInfo,
}