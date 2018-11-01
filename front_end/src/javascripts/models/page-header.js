import URL from 'url'



const pageHeaderInfo = (url, preUrl) => {
    let _urlinfo = URL.parse(url)
    let _pathname = _urlinfo.pathname
    // search ?  是url种解析出来的 ?a=1&b=2&search
    let _search = URL.parse(preUrl).search || ''
    let _infos = {
        '/home': {
            title: 'home',
            list: []
        },
        '/map': {
            title: 'mapShow',
            list: [{
                text: 'map',
                path: '#/map'
            }]
        },
        '/writerFood': {
            title: 'foodmanagement',
            description: 'foodList',
            list: [{
                text: 'foodList'
            }]
        },
        '/order': {
            title: 'order',
            description: 'order',
            list: [{
                text: 'order'
            }]
        },
        '/addFood': {
            title: 'foodmanagement',
            description: 'addFood',
            list: [{
                    text: 'foodList',
                    path: '#/writerFood' + _search
                },
                {
                    text: 'addFood'
                }
            ]
        },
        '/usersManage': {
            title: 'usersManage',
            list: [{
                text: 'usersManage',
                path: '#/usersManage'
            }]
        },
        '/food-update': {
            title: 'foodmanagement',
            description: 'foodUpdate',
            list: [{
                    text: 'foodList',
                    path: '#/writerFood' + _search
                },
                {
                    text: 'updateFood'
                }
            ]
        }
    }
    return _infos[_pathname] || {}
}


export default {
    pageHeaderInfo
}