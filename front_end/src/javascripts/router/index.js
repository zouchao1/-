import SMERouter from 'sme-router'
import home_template from '../views/home.html'
import {
    bus
} from '../utils/'
import food_controller from '../controllers/food'
import not_found_template from '../views/404.html'
import page_header_model from '../models/page-header'
import page_header_controller from '../controllers/page-header'
let router = null;
var preUrl = ''
const _init = () => {
    router = new SMERouter('router-view');

    router.use((req, res, next) => {
        _activeLink(req.route)
    })

    router.route("/", renderPageHeader)

    router.route('/home', (req, res, next) => {
        res.render(home_template)
    })
    router.route('/addFood', food_controller.add)

    router.route('/writerFood', food_controller.write)
    router.route('/food-update', food_controller.update)
    // router.route('/user', food_controller.write)
    // router.route('/Invoicing', food_controller.write)
    router.route('/not-found', (req, res, next) => {
        res.render(not_found_template)
        _navLink('.not-found a[to]')
    })
    router.route('*', (req, res, next) => {
        if (req.url == '') {
            res.redirect('/home')
        } else {
            res.redirect('/not-found')
        }
    })
    _navLink();
    bus.on('go', (path, body = {}) => {
        router.go(path, body)
    })
    bus.on('back', (path) => {
        router.go(path)
    })
}
const renderPageHeader = (req, res, next) => {
    if (req.url === '/') {
        res.redirect('/home')
        return false
    }
    page_header_controller.render(page_header_model.pageHeaderInfo(req.url, preUrl))
    preUrl = req.url
}
const _navLink = (selector) => {
    let $navs = $(selector || '.sidebar-menu li.nav-link[to]')
    $navs.on('click', function () {
        let _path = $(this).attr('to');
        router.go(_path)
    })
}
const _activeLink = (route) => {
    let $navs = $('.sidebar-menu li[to]')
    $navs.removeClass('active')
    $navs.filter(`[to='${route}']`)
        .addClass('active')

}

export default {
    init: _init
}