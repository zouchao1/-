const user_model = require('../models/user')
const isSignIn = (req, res, next) => {
    if (req.session.userinfo) {
        res.render('user', {
            code: 200,
            data: JSON.stringify({
                msg: '用户已登录'
            })
        })
    } else {
        res.render('user', {
            code: 201,
            data: JSON.stringify({
                msg: '用户未登录'
            })
        })
    }
}
const info = async (req, res) => {
    let _result = await user_model.getUserInfoById(req.session.userinfo.userid)
    res.render('user', {
        code: 200,
        data: JSON.stringify({
            userid: _result._id,
            username: _result.username,
            nickname: _result.nickname
        })
    })
}
const exit = async (req, res) => {

    req.session.userinfo = null

    res.render('user', {
        code: 200,
        data: JSON.stringify({
            msg: '删除成功'
        })
    })

}
module.exports = {
    isSignIn,
    info,
    exit
}