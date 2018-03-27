var mmbuy;
var id;
var brandTitle;
var brandtitleid;
var brandName;
$(function () {
    mmbuy = new MMBuy();
    mmbuy.initScroll();
    mmbuy.getBrand();
    mmbuy.setbrandtitleid();
})
var MMBuy = function () {


}
MMBuy.prototype = {
    // 初始化区域滚动
    initScroll: function () {
        mui('.mui-scroll-wrapper').scroll({
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        });
    },
    // 获取热门品牌数据
    getBrand: function () {
        id = mmbuy.getQueryString('id');
        $.ajax({
            url: "http://mmb.ittun.com/api/getbrand",
            data: {
                brandtitleid: id
            },
            success: function (data) {
                console.log(data);
                var html = template("BrandTmp", data);
                $('#main .brand-list >ul').html(html);
                brandTitle = localStorage.getItem('brandTitle');
                $('#nav-brand').html(brandTitle);
                $('#main .brand-sort').html(brandTitle);
            }
        })
    },
    // 获取url中参数的值
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    setbrandtitleid: function () {
        $("#main .brand-list >ul").on('click', "#main .brand-list >ul>li", function () {
            var brandtitleid = $(this).data('brandtitleid');
            var brandName = $(this).data('brandname');
            window.location.href = "./salesSort.html?brandtitleid=" + brandtitleid;
            localStorage.setItem("brandName", brandName);
            
            
        })
    }
}