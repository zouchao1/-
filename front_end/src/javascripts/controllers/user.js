import user_model from "../models/user"

const renderinfo = async () => {
    let _result = await user_model.info()
    if (_result.status == 304) {
        alert("请重新登陆")
        window.location.href = '/admin.html'
    } else {
        $('.nickname').html(_result.data.nickname)
    }
    $(".exit-btn").click(async function () {
        console.log(11111111)
        let _result = await user_model.exit();

        if (_result.status === 200) {
            setTimeout(() => {
                $.cookie('connect.sid', {
                    expires: -1
                })
            }, 0)
            window.location.href = '/admin.html'
        }
    })
}

export default {
    renderinfo
}