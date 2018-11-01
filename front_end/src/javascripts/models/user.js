const isSignIn = ({
    token
}) => {
    return $.ajax({
        url: '/api/v1/user/isSignIn',
        data: {
            token
        },
        success: results => results
    })
}
const info = () => {
    return $.ajax({
        url: '/api/v1/user/info',
        data: {
            token: localStorage.getItem('token') || ''
        },
        success: results => results
    })
}

const allow = (auth) => {
    return $.ajax({
        url: '/api/v1/user/check',
        data: {
            auth,
            token: localStorage.getItem('token') || ''
        },
        success: results => results
    })
}
export default {
    isSignIn,
    info,
    allow
}