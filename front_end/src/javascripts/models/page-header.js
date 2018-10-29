import URL from 'url'



const pageHeaderInfo = (url, preUrl) => {
    let _urlinfo = URL.parse(url)
    let _pathname = _urlinfo.pathname
    // search ?  是url种解析出来的 ?a=1&b=2&search
    let _search = URL.parse(preUrl).search || ''
    let _infos = {
        '/home': {
            title: '首页',
            list: []
        },
        '/map': {
            title: '地图显示',
            list: [{
                text: '地图',
                path: '#/map'
            }]
        },
        '/writerFood': {
            title: '菜品管理',
            description: '菜品列表',
            list: [{
                text: '菜品列表'
            }]
        },
        '/addFood': {
            title: '菜品管理',
            description: '添加食品',
            list: [{
                    text: '菜品列表',
                    path: '#/writerFood' + _search
                },
                {
                    text: '添加食品'
                }
            ]
        },
        '/food-update': {
            title: '菜品管理',
            description: '菜品更新',
            list: [{
                    text: '菜品列表',
                    path: '#/writerFood' + _search
                },
                {
                    text: '更新菜品'
                }
            ]
        }
    }
    return _infos[_pathname] || {}
}


export default {
    pageHeaderInfo
}