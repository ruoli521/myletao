var page = 1;
var search = getQueryString('search');

$(function () {

    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: {
                contentdown: '下啦瞬间显示的文字',
                contentover: '下拉过程中显示的文字',
                contentrefresh: '松开手的时候正在家宅数据的显示文本',
                callback: function () {
                    setTimeout(function () {
                        getProductList({
                            proName: '鞋',
                            brandId: 2,
                            price: 1,
                            num: 1,
                            page: 1,
                            pageSize: 2
                        }, function (data) {
                            var html = template('productListTmp', data);
                            $('.productlist-content .mui-row').html(html);
                            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                        })
                    }, 1000);
                }
            },
            up: {
                contentrefresh: '加载中ing', //加载过程提示文字
                contentnomore: '没有更多加载项',
                callback: function () {
                    page++;
                    getProductList({
                        proName: '鞋',
                        brandId: 1,
                        price: 1,
                        num: 1,
                        page: page,
                        pageSize: 2
                    }, function (data) {
                        var html = template('productListTmp', data);
                        $('.productlist-content .mui-row').append(html);
                        if (data.data.length <= 0) {
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                            return;
                        }
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh();

                    })
                }
            }
        }
    });

    $('.search-input').val(search);

    getProductList({
        proName: search,
        price: 1,
        num: 1,
        page: 1,
        pageSize: 6
    }, function (data) {
        var html = template('productListTmp', data);
        $('.productlist-content .mui-row').html(html);
    });

    searchProductlist();
    productlistSort();
    linkDetail();
});


function getProductList(options, callback) {
    $.ajax({
        url: '/product/queryProduct',
        data: options,
        success: function (data) {
            callback && callback(data);
        }
    });
}




function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}


function linkDetail() {
    $('body').on('tap', '.product', function () {
        window.location.href = "detail.html?id=" + $(this).data('id');
    })
}

function searchProductlist() {
    $('.btn-search').on('click', function () {
        var search = $('.search-input').val().trim();
        if (!search) {
            alert('请输入要搜索的商品');
            return;
        }
        getProductList({
            proName: search, //商品名称
            price: 1, //价格排序 1是升序  2是降序
            num: 1, //数量的排序 1是升序 2是降序
            page: 1, //页码数  第几页商品类别
            pageSize: 2 //页容量 每页的商品条数
        }, function (data) {
            if (data.data.length <= 0) {
                $('.productlist-content .mui-row').html('<p>没有此商品</p>');
                return;
            }
            var html = template('productListTmp', data);
            $('.productlist-content .mui-row').html(html);
        });
    });
}



function productlistSort() {

    $('.productlist-title .mui-row > div').on('tap', function () {
        $('.productlist-title .mui-row > div').removeClass('active');

        $(this).addClass('active');

        var sortType = $(this).data('type');

        var sort = $(this).data('sort');

        if (sort == 1) {
            sort = 2;
            $(this).data('sort', 2);
            $(this).find('i').removeClass().addClass('fa-angle-up');
        } else {
            sort = 1;
            $(this).data('sort', 1);
            $(this).find('i').removeClass().addClass('fa-angle-down');
        }
        if (sortType == 'price') {
            getProductList({
                proName: search, //商品名称
                price: sort, //价格排序 1是升序  2是降序
                page: 1, //页码数  第几页商品类别
                pageSize: 6, //页容量 每页的商品条数
            }, function (data) {
                var html = template('productListTmp', data);
                $('.productlist-content .mui-row').html(html);
            });
        } else if (sortType == 'num') { //如果排序类型是num 调用API传入排序方式num属性
            getProductList({
                proName: search, //商品名称
                num: sort, //数量排序 1是升序 2降序
                page: 1, //页码数  第几页商品类别
                pageSize: 6, //页容量 每页的商品条数
            }, function (data) {
                var html = template('productListTmp', data);
                $('.productlist-content .mui-row').html(html);
            });
        }
    })


}