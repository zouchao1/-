const URL = require("url")
import user_model from '../models/user'
const _none = () => {}


const userSigninAuth = async (success = _none, fail = _none) => {
    let isSignIn = await user_model.isSignIn()

    let flag = !!(isSignIn.status === 200)

    if (flag) {
        success()
        return true;
    } else {
        fail()
        return false
    }
}




export {
    userSigninAuth
}