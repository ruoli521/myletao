$(function () {

    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.001, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });

    getCategoryLeftData();
    getCategoryRightData(1);
    categoryLeftClick();

});


function getCategoryLeftData() {
    $.ajax({
        url: '/category/queryTopCategory',
        success: function (data) {
            console.log(data);

            var html = template('categoryLeftTmp', data);

            $('.category-left ul').html(html);

            $('.category-left ul li:eq(0)').addClass('active');
        }
    })
};


function getCategoryRightData(id) {
    $.ajax({
        url: '/category/querySecondCategory',
        data: {
            'id': id
        },
        success: function (data) {
            console.log(data);
            var html = template('categoryRightTmp', data);
            if (data.rows.length) {
                $('.category-right .mui-scroll').html(html);
            } else {
                $('.category-right .mui-scroll').html('<p>没有数据</p>');
            }
        }
    })
};


function categoryLeftClick() {
    $('.category-left').on('click','ul li a',function(e){
        $('.category-left ul li').removeClass('active');
        $(e.target.parentNode).addClass('active');
        var id =$(e.target).data('id');
        getCategoryRightData(id);
    });
}