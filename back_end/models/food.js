const mongoose = require('../util/mongoose')
const Moment = require('moment') // 时间格式化
const fs = require('fs-extra') // 时间格式化
const PATH = require('path')

var FoodModel = mongoose.model('foods', new mongoose.Schema({
    foodKindName: String,
    foodName: String,
    price: String,
    image: String,
    createTime: String,
    formatTime: String,
}));

let default_logo = '/uploads/logos/default.jpg'
const save = (body) => {
    // 此时的时间
    let _timestamp = Date.now()
    // 根据这个时间创建moment
    let moment = Moment(_timestamp)
    body.image = body.image || default_logo
    return new FoodModel({
            ...body,
            createTime: _timestamp,
            formatTime: moment.format("YYYY-MM-DD, HH:mm")
        })
        .save()
        .then((result) => {
            return result
        })
        .catch((err) => {
            return false
        })

}


const list = (_query = {}) => {
    return FoodModel.find(_query).sort({
        createTime: -1
    }).then((results) => {
        return results
    }).catch((err) => {
        return false
    })
}



const update = (body) => {
    if (!body.image) delete body.image
    if (body.republish) {
        let _timestamp = Date.now()
        let moment = Moment(_timestamp)
        body.createTime = _timestamp
        body.formatTime = moment.format("YYYY-MM-DD, HH:mm")
    }
    return FoodModel.updateOne({
        _id: body.id
    }, { ...body
    }).then((results) => {
        return results
    }).catch((err) => {
        return false
    })
}

const listone = ({
    id
}) => {
    return FoodModel.findById(id).then((results) => {
        return results
    }).catch((err) => {
        return false
    })
}
const listPage = async ({
    pageNo = 1,
    pageSize = 5,
    serch = ''
}) => {
    let reg = new RegExp(serch, 'g')
    let _query = {
        $or: [{
                foodKindName: reg
            },
            {
                foodName: reg
            }
        ]
    };
    let _all_items = await list(_query)
    return FoodModel.find(_query).sort({
            createTime: -1
        })
        .skip((pageNo - 1) * pageSize).limit(~~pageSize).then((results) => {
            return {
                items: results,
                pageInfo: { // 页码信息
                    pageNo, // 当前页
                    pageSize, // 一页数量
                    total: _all_items.length, // 总数
                    totalPage: Math.ceil(_all_items.length / pageSize), // 总页数
                    serch
                }
            }
        }).catch((err) => {
            return false
        })
}
const remove = async ({
    id,
    pageNo,
    pageSize
}) => {

    let _row = await listone({
        id
    });

    return FoodModel.deleteOne({
        _id: id
    }).then(async (results) => {

        let _all_items = await list()
        results.deleteId = id
        results.isBack = (pageNo - 1) * pageSize >= _all_items.length
        if (_row.image && _row.image !== default_logo) {
            fs.removeSync(PATH.resolve(__dirname, '../public' + _row.image))
        }

        return results
    }).catch((err) => {
        return false
    })
}



module.exports = {
    listPage,
    save,
    list,
    update,
    listone,
    remove

}