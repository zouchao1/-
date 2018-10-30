const mongoose = require('../util/mongoose')
const crypto = require('crypto');
const bcrypt = require("bcrypt")
const {
    hash
} = require('../util')
var UserModel = mongoose.model('users', new mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    signupTime: String
}));


const signup = async ({
    username,
    password,
    nickname
}) => {

    let _password = crypto.createHmac('sha256', password)
        .update('I love cupcakes')
        .digest('hex');



    return new UserModel({
        username,
        nickname,
        password: _password,
        signupTime: Date.now()
    }).save().then((results) => {
        let {
            _id,
            username,
            nickname
        } = results
        return {
            _id,
            username,
            nickname
        }
    }).catch(() => {
        return false
    })
}


const judgeUserByUsername = (username) => {
    return UserModel.find({
        username
    }).then((results) => {

        return results
    }).catch(() => {
        return false
    })

}
const signin = (pwd, {
    password
}) => {
    let _pwd = crypto.createHmac('sha256', pwd)
        .update('I love cupcakes')
        .digest('hex');
    return _pwd === password
}
module.exports = {
    signup,
    judgeUserByUsername,
    signin
}