import customers_tempalte from "../views/customers.html"

const usersManage = (req, res, next) => {
    res.render(customers_tempalte)
}

export default {
    usersManage,
}