// 判断音乐，影视，阅读
function judeg(data){
    for(let item of data){
        if(item.category == "1"){
            item.urlTo = "readDetail"
            item.urlType = "阅读"
        }else if(item.category == "4"){
            item.urlTo = "musicDetail"
            item.urlType = "音乐"
        }else if(item.category == "5"){
            item.urlTo = "movieDetail"
            item.urlType = "影视"
        }
    }
}
var bt = baidu.template;

// 进入页面判断是否登录
if(localStorage.isLogin == "1"){
    var user = JSON.parse(localStorage.user)
    $(".login").html(user.username)
    $(".login").attr("href","./user.html")
    $(".reg").html("退出登录")
    $(".header-right a:first-child").show()
    $(".reg").attr("href","javascript:;")
    $(".reg").on("click",function(){
        localStorage.removeItem("isLogin")
        localStorage.removeItem("loginTime")
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        location.href = "./index.html"
    })
}
// 首页搜索
$("#search_inp").on("focus",function(){
    $(".search-result").show()
    if($(".search-result>ul>li").length == 0){
        $(".search-result").hide()
    }

})
$("#search_inp").on("input",function(){
    var val = $(this).val()
    var url = searchUrl + '&keyword=' + val
    $.get(url,(res)=>{
        var data = res.data
        judeg(data)
        var $html = bt("search-txt",{data:data});
        $(".search-result").show()
        $(".search-result").html($html)
        $(".search-result>ul").on("click","li",function(e){
            var id = e.currentTarget.id
            var url = $(this).data("to")
            sessionStorage.id = id
            location.href = "./" + url + '.html'

        })
    },"json");
})
$(".navbar-right").on("mouseleave",function(){
    $(".search-result").hide()
})



// 首页轮播图
$(function(){
    var url = adsUrl
    $.get(url,(res)=>{
        var data = res.data
        judeg(data)
        var $html = bt("index-broad",{data:data});
        $(".swiper-wrapper").html($html);
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            lazy: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
        });
        $(".swiper-slide").on("click",function(e){
            var id = e.currentTarget.id
            var url = $(this).data("to")
            sessionStorage.id = id
            location.href = "./" + url + '.html'

        })
    },"json");
})


// 首页阅读目录
$(function(){
    var url = readListUrl
    $.get(url,(res)=>{
        var dataNum = Number(res.total)
        // 随机显示
        var num = (Math.random()*100).toFixed(0)
        if(num > dataNum - 5){
            num = dataNum - 5
            num = (num - (Math.random()*5).toFixed(0)) - 5
        }
        var url = readListUrl + '&start=' + num + '&count=10'
        $.get(url,(res)=>{
            var data = res.data
            var $htmlLeft = bt("sub-content-read-left",{data:data});
            $(".sub-content-read-left").html($htmlLeft);
            var $htmlRight = bt("sub-content-read-right",{data:data});
            $(".sub-content-read-right").html($htmlRight);
            $(".sub-content .sub-content-read-left").on("click","img",function(e){
                var id = e.currentTarget.id
                sessionStorage.id = id
                location.href = "./readDetail.html"

            })
            $(".sub-content-read-right li").on("click",function(e){
                var id = e.currentTarget.id
                sessionStorage.id = id
                location.href = "./readDetail.html"

            })
        },"json");
    },"json");
})
// 首页音乐目录
$(function(){
    var url = musicListUrl
    $.get(url,(res)=>{
        var dataNum = Number(res.total)
        // 随机显示
        var num = (Math.random()*100).toFixed(0)
        if(num > dataNum - 5){
            num = dataNum - 5
            num = (num - (Math.random()*5).toFixed(0)) - 5
        }
        var url = musicListUrl + '&start=' + num + '&count=10'
        $.get(url,(res)=>{
            var data = res.data
            var $htmlLeft = bt("sub-content-music-left",{data:data});
            $(".sub-content-music-left").html($htmlLeft);
            $(".sub-content .sub-content-music-left").on("click","img",function(e){
                var id = e.currentTarget.id
                sessionStorage.id = id
                location.href = "./musicDetail.html"

            })
            var $htmlRight = bt("sub-content-music-right",{data:data});
            $(".sub-content-music-right").html($htmlRight);
            $(".sub-content-music-right li").on("click",function(e){
                var id = e.currentTarget.id
                sessionStorage.id = id
                location.href = "./musicDetail.html"
            })
        },"json");
    },"json");
})
// 首页影视目录
$(function(){
    var url = movieListUrl
    $.get(url,(res)=>{
        var dataNum = Number(res.total)
        // 随机显示
        var num = (Math.random()*100).toFixed(0)
        if(num > dataNum - 5){
            num = dataNum - 5
            num = (num - (Math.random()*5).toFixed(0)) - 5
        }
        var url = movieListUrl + '&start=' + num + '&count=10'
        $.get(url,(res)=>{
            var data = res.data
            var $html = bt("sub-content-movie-min",{data:data});
            $(".sub-content-movie").html($html);
            $(".sub-content-movie img").on("click",function(e){
                var id = e.currentTarget.id
                sessionStorage.id = id
                location.href = "./movieDetail.html"
            })
        },"json");
    },"json");
})
// 首页推荐目录
$(function(){
    var url = recommendListUrl
    $.get(url,(res)=>{
        var data = res.data
        judeg(data)
        var $html = bt("sub-content-recommend",{data:data});
        $(".sub-content-recommend").html($html);
        $(".sub-content-recommend img").on("click",function(e){
            var id = e.currentTarget.id
            var url = $(this).data("to")
            sessionStorage.id = id
            location.href = "./" + url + '.html'
        })
    },"json");
})

// 排行数据请求
$(function(){
    var url = rankingListUrl
    $.get(url,(res)=>{
        var data = res.data
        for(var item of data){
            judeg(item)
        }
        var $html = bt("rank-view-result",{data:data});
        $(".rank-view-all").html($html);

        $(".rank-view-all>.rank-view").eq(0).addClass('active')
        // 排行切换
        $(".sub-rank>.rank-btn-all").on("click",".rank-btn",function(){
            $(this).addClass('active').siblings().removeClass("active")

            $(".rank-view-all>.rank-view").eq($(this).index()).addClass('active').siblings().removeClass("active")
        })
        $(".rank-view-all .rank-view-sub").on("click",function(e){
            var id = e.currentTarget.id
            var url = $(this).data("to")
            sessionStorage.id = id
            location.href = "./" + url + '.html'
        })
    },"json");
})
// 首页随机推荐列表
$(function(){
    var url = recommendRandomListUrl
    $.get(url,(res)=>{
        var data = res.data
        judeg(data)
        var $html = bt("recommend-index-view",{data:data});
        $(".recommend-index").html($html);
        $(".recommend-index li").on("click",function(e){
            var id = e.currentTarget.id
            var url = $(this).data("to")
            sessionStorage.id = id
            location.href = "./" + url + '.html'
        })
    },"json");
})
// 首页随机推荐列表
$(function(){
    var url = musicListUrl
    $.get(url,(res)=>{
        var dataNum = Number(res.total)
        // 首页音乐推荐目录
        // 随机筛选出4-5个
        var num = (Math.random()*100).toFixed(0)
        if(num > dataNum - 5){
            num = dataNum - 5
            num = (num - (Math.random()*10).toFixed(0)) - 5
        }
        var url = musicListUrl + '&start=' + num + '&count=4'
        $.get(url,(res)=>{
            var data = res.data
            judeg(data)
            var $html = bt("recommend-music-view",{data:data});
            $(".music-recommend-index").html($html);
            $(".music-recommend-index li").on("click",function(e){
                var id = e.currentTarget.id
                sessionStorage.id = id
                location.href = "./musicDetail.html"
            })
        },"json");
    },"json");
})