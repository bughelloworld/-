var mmbuy;
var productid;
var page;
var brandName;
var brandname;
var productName;
var productImg;
$(function () {
    mmbuy = new MMBuy();
    mmbuy.initScroll();
    mmbuy.initTab();
    mmbuy.getProductList();

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
    getProductList: function (pagesize) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbrandproductlist",
            data: {
                brandtitleid: mmbuy.getQueryString("brandtitleid"),
                pagesize: 17,
            },
            success: function (data) {
                page = Math.ceil(data.totalCount / data.pagesize);
                var html = template("productListTmp", data);
                $('.container .mui-table-view').html(html);
                var html1 = template("textTmp", data);
                $('.tv-content > span').html(html1)
                mmbuy.getProductId();
                brandName = localStorage.getItem("brandName");
                $('.tv-title>h1').html(brandName);
                $('.tv-name').html(brandName);
                var html1 = '<div class="mui-content-padded"><ul class="mui-pager"><li><a href="#">上一页</a></li><li><a href="#">下一页</a></li></ul></div>';
                $('.container .mui-table-view').append(html1);
                
                mmbuy.getNextPage();
            }
        })
    },
    getNextPage: function () {
        $('.mui-pager li > a').click(function () {
        })
    },
    // 初始化选项卡
    initTab: function () {
        mui.init({
            swipeBack: false
        });
        (function ($) {
            $('.mui-scroll-wrapper').scroll({
                indicators: true //是否显示滚动条
            });
            var html2 = '<ul class="mui-table-view"><li class="mui-table-view-cell">第二个选项卡子项-1</li><li class="mui-table-view-cell">第二个选项卡子项-2</li><li class="mui-table-view-cell">第二个选项卡子项-3</li><li class="mui-table-view-cell">第二个选项卡子项-4</li><li class="mui-table-view-cell">第二个选项卡子项-5</li></ul>';
            var html3 = '<ul class="mui-table-view"><li class="mui-table-view-cell">第三个选项卡子项-1</li><li class="mui-table-view-cell">第三个选项卡子项-2</li><li class="mui-table-view-cell">第三个选项卡子项-3</li><li class="mui-table-view-cell">第三个选项卡子项-4</li><li class="mui-table-view-cell">第三个选项卡子项-5</li></ul>';
            var item2 = document.getElementById('item2mobile');
            var item3 = document.getElementById('item3mobile');
            document.getElementById('slider').addEventListener('slide', function (e) {
                if (e.detail.slideNumber === 1) {
                    if (item2.querySelector('.mui-loading')) {
                        setTimeout(function () {
                            item2.querySelector('.mui-scroll').innerHTML = html2;
                        }, 500);
                    }
                } else if (e.detail.slideNumber === 2) {
                    if (item3.querySelector('.mui-loading')) {
                        setTimeout(function () {
                            item3.querySelector('.mui-scroll').innerHTML = html3;
                        }, 500);
                    }
                }
            });
            var sliderSegmentedControl = document.getElementById('sliderSegmentedControl');
            $('.mui-input-group').on('change', 'input', function () {
                if (this.checked) {
                    sliderSegmentedControl.className = 'mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-segmented-control-' + this.value;
                    //force repaint
                    sliderProgressBar.setAttribute('style', sliderProgressBar.getAttribute('style'));
                }
            });
        })(mui);
    },
    // 获取url中参数的值
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    // 设置跳转页面id
    getProductId: function () {
        $(".baseid").click(function () {
            productid = $(this).data('productid');
            brandname = $(this).data('brandname');
            productName = $(this).data('productname');
            productImg = $(this).data('productimg');
            mmbuy.saveProdectData();
            
            window.location.href = "./productcom.html?productid=" + productid;
           

        })
    },
    // 存储数据到本地
    saveProdectData: function () {
        localStorage.setItem('brandName', brandName);
        localStorage.setItem('productName', productName);
        localStorage.setItem('productImg', productImg);
    }
}