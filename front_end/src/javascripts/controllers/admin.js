import admin_template from '../views/admin-form.html'
import admin_model from "../models/admin"
import qs from 'querystring'
import handleToastByData from '../utils/handleToastByData'
import toast from '../utils/toast'
const init = () => {
    $(".loginOrRgist").html(admin_template)
    bindEvent();
}

const bindEvent = () => {
    var snow = function () {
        if (1 == 1) {
            $("body").append('<canvas id="christmasCanvas" style="top: 0px; left: 0px; z-index: 5000; position: fixed; pointer-events: none;"></canvas>');
            var b = document.getElementById("christmasCanvas"),
                a = b.getContext("2d"),
                d = window.innerWidth,
                c = window.innerHeight;
            b.width = d;
            b.height = c;
            for (var e = [], b = 0; b < 70; b++) {
                e.push({
                    x: Math.random() * d,
                    y: Math.random() * c,
                    r: Math.random() * 4 + 1,
                    d: Math.random() * 70
                })
            }
            var h = 0;
            window.intervral4Christmas = setInterval(function () {
                a.clearRect(0, 0, d, c);
                a.fillStyle = "rgba(255, 255, 255, 0.6)";
                a.shadowBlur = 5;
                a.shadowColor = "rgba(255, 255, 255, 0.9)";
                a.beginPath();
                for (var b = 0; b < 70; b++) {
                    var f = e[b];
                    a.moveTo(f.x, f.y);
                    a.arc(f.x, f.y, f.r, 0, Math.PI * 2, !0)
                }
                a.fill();
                h += 0.01;
                for (b = 0; b < 70; b++) {
                    if (f = e[b], f.y += Math.cos(h + f.d) + 1 + f.r / 2, f.x += Math.sin(h) * 2, f.x > d + 5 || f.x < -5 || f.y > c) {
                        e[b] = b % 3 > 0 ? {
                            x: Math.random() * d,
                            y: -10,
                            r: f.r,
                            d: f.d
                        } : Math.sin(h) > 0 ? {
                            x: -5,
                            y: Math.random() * c,
                            r: f.r,
                            d: f.d
                        } : {
                            x: d + 5,
                            y: Math.random() * c,
                            r: f.r,
                            d: f.d
                        }
                    }
                }
            }, 70)
        }
    }
    snow();


    $(".btn").click(function () {

        var left = ($(window).width() * (1 - 0.35)) / 2; //box弹出框距离左边的额距离
        var height = ($(window).height() * (1 - 0.5)) / 2;

        $(".box").addClass("animated bounceIn").show().css({
            left: left,
            top: height
        });
        $(".opacity_bg").css("opacity", "0.3").show();
    });


    $(".colse").click(function () {

        var left = ($(window).width() * (1 - 0.35)) / 2;
        var top = ($(window).height() * (1 - 0.5)) / 2;
        $(".box").show().animate({
            width: "-$(window).width()*0.35",
            height: "-$(window).height()*0.5",
            left: "-" + left + "px",
            top: "-" + top + "px"
        }, 1000, function () {
            var width1 = $(window).width() * 0.35;
            var height1 = $(window).height() * 0.5;
            $(this).css({
                width: width1,
                height: height1
            }).hide();
        });

    });

    $("#regiest_form").submit(async function (e) {
        e.preventDefault();
        let _params = $(this).serialize();
        console.log(_params)
        let _result = await admin_model.signup(qs.parse(_params))
        switch (_result.status) {
            case 500:
                toast('失败，服务器出了问题');
                break;
            case 201:
                toast('用户已存在');
                break;
            default:
                toast('注册成功');
                var left = ($(window).width() * (1 - 0.35)) / 2;
                var top = ($(window).height() * (1 - 0.5)) / 2;
                $(".box").show().animate({
                    width: "-$(window).width()*0.35",
                    height: "-$(window).height()*0.5",
                    left: "-" + left + "px",
                    top: "-" + top + "px"
                }, 1000, function () {
                    var width1 = $(window).width() * 0.35;
                    var height1 = $(window).height() * 0.5;
                    $(this).css({
                        width: width1,
                        height: height1
                    }).hide();
                });

                break;
        }

    })

    $("#login_form").submit(async function (e) {
        e.preventDefault();
        let _params = $(this).serialize();
        let _result = await admin_model.signin(qs.parse(_params))
        switch (_result.status) {
            case 203:
                toast('密码错误');
                break;
            case 202:
                toast('用户不存在');
                break;
            default:
                // localStorage.user = qs.parse(_params).username
                window.location.href = "/";
                break;
        }
    })
}
export default {
    init
}