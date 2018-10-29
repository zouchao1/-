const {
    handleData
} = require('../util')
const food_model = require('../models/food')
const save = async (req, res) => {
    // 接收到发送过来的数据 req.body, 然后存入数据库
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await food_model.save(req.body)
    handleData(_data, res, 'food')
}
const write = async (req, res) => {

    res.set('content-type', 'application/json; charset=utf8')
    let _data = await food_model.list();

    handleData(_data, res, 'food')
}
const up_date = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await food_model.update(req.body);

    handleData(_data, res, 'food')
}
const listone = async (req, res) => {

    res.set('content-type', 'application/json; charset=utf8')
    let _data = await food_model.listone(req.query)
    handleData(_data, res, 'food')
}


const remove = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await food_model.remove(req.body)
    // 如果数据已经删除了，同时删除图片
    handleData(_data, res, 'food')
}
const listPage = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await food_model.listPage(req.query)
    handleData(_data, res, 'food')
}

module.exports = {
    save,
    write,
    up_date,
    listone,
    remove,
    listPage
}