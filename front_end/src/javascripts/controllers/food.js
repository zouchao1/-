import food_add_template from '../views/addFood.html'
import food_write_template from '../views/writeFood.html'
import food_update_template from '../views/foodUpdate.html'
import {
    handleToastByData,
    bus
} from '../utils'
import food_model from '../models/food'
import qs from 'querystring'
const add = (req, res, next) => {

    res.render(food_add_template);

    bindListEvent()
}
const write = async (req, res, next) => {
    req.query = req.query || {}
    let _page = { // 页面信息， 当点击了分页器按钮后，页面url就会变化，然后list控制器就会重新执行，重新获取数据再渲染
        pageNo: req.query.pageNo || 1,
        pageSize: req.query.pageSize || 5,
        serch: req.query.search || ''
    }
    let html = template.render(food_write_template, {
        data: (await food_model.list(_page)).data
    })
    res.render(html);
    bindListEvent(_page);

    $('.food-list #keywords').val(_page.serch)

    // $(function () {
    //     $(".box-footer .pagenum").on("click", function () {
    //         for (let index = $(".box-footer .pagenum").length; index > 0; index--) {
    //             if (index < ($(this).index() + 2) && index > ($(this).index() - 2)) {
    //                 $(".box-footer .pagenum ").eq(index).find("a").css("display", "block")

    //             } else {
    //                 $(".box-footer .pagenum ").eq(index).find("a").css("display", "none")
    //             }

    //             console.log($(".box-footer .pagenum")[index])
    //         }

    //     })
    // })


}




const bindListEvent = (_page) => {
    $('.food-list #addbtn').on('click', function () {
        bus.emit('go', '/addFood')
    })
    $(".food-save #back").on('click', () => {
        bus.emit('back', '/writerFood')
    })
    $('.food-save #save-form').submit(handleSaveSubmit);

    $(".box-body .food-update").on('click', function () {

        let id = $(this).parents('tr').find(".up_id").html()

        bus.emit('go', '/food-update', {
            id
        })


    })

    //remove
    $(".box-body .food-remove").on('click', function () {
        handleRemoveFood.call(this, _page)
    })
    $('.food-list #possearch').on('click', function () {
        let _search = $('.food-list #keywords').val()

        // 重新刷新路由 ，注意，页码回复到1
        let _params = {
            search: _search,
            pageNo: 1
        }
        bus.emit('go', `/writerFood?${$.param(_params)}`)
    })

}

const handleRemoveFood = async function (_page) {
    $(this).attr('disabled', true)
    let id = $(this).parents('tr').find(".up_id").html()
    id = id.trim()
    let _data = await food_model.remove({
        id: id,
        ..._page
    })
    handleToastByData(_data, {
        isReact: false,
        success: (data) => {

            let _pageNo = _page.pageNo

            _pageNo -= data.isBack ? 1 : 0;
            if (_pageNo <= 1) {
                _pageNo = 1;
            }
            // 删除成功后
            bus.emit('go', '/writerFood?pageNo=' + _pageNo + '&_' + data.deleteId)
        }
    })
}
let _isloading = false;
const handleSaveSubmit = async function (e) {

    e.preventDefault()
    if (_isloading) {

        return false;
    }
    _isloading = true


    // 拿到form的数据
    // let _params = qs.parse($(this).serialize())

    let result = await food_model.save()

    _isloading = false

    handleToastByData(result)
    setTimeout(() => {
        bus.emit('back', '/writerFood')
    }, 2500)

    // handleToastByData(result, { isReact: false, success: () => {
    //     bus.emit('go', '/position-list')
    // }})
}





const update = async (req, res) => {

    let {
        id
    } = req.body // 要更新的数据的id
    // 获取id对应的数据进行渲染
    id = id.trim()
    let html = template.render(food_update_template, {
        data: (await food_model.listone({
            id
        })).data // 获取到列表数据
    })
    res.render(html)
    bindUpdateEvent()
}
const bindUpdateEvent = () => {
    $('.food-update #update-form').submit(handleUpdateSubmit)
}
const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    let _results = await food_model.updateone()
    handleToastByData(_results)
    setTimeout(() => {
        bus.emit('back', '/writerFood')
    }, 2500)
}
export default {
    add,
    write,
    update
}