import order_tempalte from "../views/order.html"

const order = (req, res, next) => {

    res.render(order_tempalte)

}



export default {
    order,
}