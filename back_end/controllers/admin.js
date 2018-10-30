const admin_model = require("../models/admin")
const {
    handleData
} = require('../util')

const signup = async (req, res, next) => {

    let _judge_result = await admin_model.judgeUserByUsername(req.body.username);

    if (!_judge_result.length) {

        if (!req.body.nickname) req.body.nickname = req.body.username
        let _data = await admin_model.signup(req.body)

        handleData(_data, res, 'admin')
    } else {
        res.render('admin', {
            code: 201,
            data: JSON.stringify('用户名已存在')
        })
    }
}
const signin = async (req, res, next) => {
    let _judge_result = await admin_model.judgeUserByUsername(req.body.username);

    if (!!_judge_result.length) {

        let _data = admin_model.signin(req.body.password, _judge_result[0])

        if (_data) {
            res.render('admin', {
                code: 200,
                data: JSON.stringify('success')
            })
        } else {
            res.render('admin', {
                code: 203,
                data: JSON.stringify('密码错误')
            })
        }
    } else {
        res.render('admin', {
            code: 202,
            data: JSON.stringify('用户名不存在')
        })
    }
}
module.exports = {
    signup,
    signin
}