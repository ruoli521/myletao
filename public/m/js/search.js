

$(function(){

    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();


});

function addHistory(){
    $('.btn-search').on('click',function(){
        var search =$('.search-input').val().trim();
        if(!search){
            alert('请输入要搜索的商品');
            return; 
        }

        var historyData =localStorage.getItem('historyData');
        if(historyData){
            historyData =JSON.parse(historyData);
        }else {
            historyData =[];
        }

        if(historyData.indexOf(search)==-1){
            historyData.push(search);
            localStorage.setItem('historyData',JSON.stringify(historyData));

            queryHistory();
        }

        $('.search-input').val('');
        window.location.href="productlist.html?search="+search;
    });
};

function queryHistory(){
    var historyData =localStorage.getItem('historyData');

    if(historyData){
        historyData =JSON.parse(historyData);
    }else {
        historyData =[];
    }

    historyData =historyData.reverse();

    var html =template('searchHistoryTmp',{'rows':historyData});

    $('.search-history-list ul').html(html);
};

function deleteHistory(){
    $('.search-history-list').on('click','.btn-delete',function(){
        var history =$(this).parent().data('history');
        var historyData =localStorage.getItem('historyData');

        if(historyData){
            historyData =JSON.parse(historyData);
        }else {
            historyData= [];
        }
        var historyIndex =historyData.indexOf(history+"");
        historyData.splice(historyIndex,1)

        localStorage.setItem('historyData',JSON.stringify(historyData));

        queryHistory();
    })
};

function clearHistory(){
    $('.btn-clear').on('click',function(){
        localStorage.setItem('historyData','');
        queryHistory(); 
    });
};