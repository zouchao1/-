const mongoose = require('../util/mongoose')

const UsersModel = mongoose.model('users')

const getUserInfoById = (id) => {
    return UsersModel
        .findById(id)
        .then(results => {
            return results
        })
        .catch(err => {
            return false
        })
}


module.exports = {
    getUserInfoById,
}