const save = (data) => {
    return new Promise((resolve) => {
        $('.food-save #save-form').ajaxSubmit({
            url: '/api/v1/food/save',
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })
}
const list = (page) => {
    return $.ajax({
        url: '/api/v1/food/list_page',
        data: page,
        success: (results) => {
            return results
        }


    })
}

const updateone = () => {
    return new Promise((resolve) => {
        $('.food-update #update-form').ajaxSubmit({
            url: '/api/v1/food/update',
            type: 'POST',
            success: (results) => {

                resolve(results)
            }
        })

    })
}
const listone = (data) => {
    return $.ajax({
        url: '/api/v1/food/listone',
        data,
        success: (results) => {
            return results
        }
    })
}
const remove = (data) => {
    return $.ajax({
        url: '/api/v1/food/remove',
        data,
        type: 'delete',
        success: (results) => {

            return results
        }
    })
}

export default {
    save,
    list,
    updateone,
    listone,
    remove

}