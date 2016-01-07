$(document).ready(function () {

    $(document).bind('click',function(e){//点击空白区域隐藏弹出
        var target  = $(e.target);
        if(target.closest('.colors').length === 0){
            $('.colors').hide(300);
        }
        if(target.closest('.calendar').length === 0){
            $('.calendar').slideUp(300);
        }
        e.stopPropagation();
    });
//    样式覆盖
    var inputNumber = $('input[type="number"]');
    $('<div class="number"><input type="text" value="0"><div><div>▲</div><div>▼</div></div></div>')
        .insertAfter(inputNumber);
    inputNumber.hide();

    var inputColor = $('input[type="color"]');
    $('<div class="color"><div><div></div></div><div>▼</div></div>')
        .insertAfter(inputColor);
    inputColor.hide();

    var inputDate = $('input[type="date"]');
    $('<div class="date"><input type="text"></div>').insertAfter(inputDate);
    inputDate.hide();

//    .number

    var num;
    $('.number>div>div:first-child').click(function () {
        num = $(this).parents('.number').find('input').prop('value');
        $(this).parents('.number').find('input').prop('value',parseInt(num)+parseInt(1));
    });
    $('.number>div>div:last-child').click(function () {
        num = $(this).parents('.number').find('input').prop('value');
        $(this).parents('.number').find('input').prop('value',parseInt(num)-parseInt(1));
    });

//    .color

    $('<div class="colors"></div>').appendTo('.color');
    var arrColor = [
        {r:239,g:158,b:184},//うすもも
        {r:235,g:125,b:148},//サイバーピンク
        {r:232,g:96,b:122},//ピンク
        {r:226,g:15,b:98},//べに
        {r:176,g:6,b:52},//えんじ
        {r:134,g:42,b:14},//ブラウン
        {r:227,g:29,b:52},//あか
        {r:227,g:29,b:52},//朱色
        {r:240,g:142,b:35},//オレンジ
        {r:245,g:174,b:41},//やまぶき
        {r:254,g:236,b:52},//イエロー
        {r:208,g:138,b:41},//キャメル
        {r:58,g:22,b:1},//こげ茶
        {r:110,g:106,b:64},//オリーブドラブ
        {r:176,g:207,b:90},//若草
        {r:105,g:182,b:64},//きみどり
        {r:22,g:160,b:68},//グリーン
        {r:8,g:95,b:81},//ビリジアン
        {r:151,g:211,b:225},//ベビーブルー
        {r:60,g:185,b:195},//あさぎ
        {r:25,g:159,b:225},//スカイブルー
        {r:12,g:100,b:174},//ウルトラマリン
        {r:67,g:78,b:156},//青紫
        {r:165,g:121,b:178},//藤
        {r:62,g:32,b:129},//紫
        {r:23,g:50,b:88},//ブルーブラック
        {r:113,g:111,b:99},//濃グレー
        {r:170,g:170,b:158},//グレー
        {r:255,g:255,b:255},//ホワイト
        {r:0,g:0,b:0},//スミ
        {r:151,g:156,b:154},//シルバー
        {r:144,g:123,b:82},//シルバー青口
        {r:155,g:119,b:84},//シルバー赤口
        {r:224,g:141,b:184},//蛍光ピンク
        {r:243,g:169,b:134},//蛍光オレンジ
        {r:146,g:201,b:139}//蛍光グリーン
    ];
    for(var i = 0; i < 36; i++) {
        $('<span></span>').appendTo('.colors').css('background-color','rgb('+arrColor[i].r+','+arrColor[i].g+','+arrColor[i].b+')');
    }
    $('<div></div>').appendTo('.colors');

    var theColor = $('.colors');
    theColor.hide();
    $('.color').children('div:nth-child(2)').click(function(e){
        $(this).parent().find('.colors').toggle(300);
        $('.calendar').slideUp(300);
        e.stopPropagation();
    });
    theColor.children('span').click(function(){
        $(this).parents('.color').find('div:nth-child(1)').find('div').css('background-color',$(this).css('background-color'));
        $(this).parent().hide();
    }).mouseover(function(){
        $(this).parent().find('div').append('<label></label>');
        var theLabel = $(this).parent().find('div label');
        theLabel.text('Choose color : '+$(this).css('background-color'));
        theLabel.css({'display':'inline-block'});
    }).mouseout(function () {
        $(this).parent().find('div').text('');
    });

//    date

    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    $('<div class="calendar"><div></div><table><thead><tr><td>Sun</td><td>Mon</td><td>Tue</td>' +
        '<td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td></tr></thead>' +
        '<tbody></tbody></table></div>').appendTo('.date');
    $('.calendar').hide();

//    获取今天的日期
    var today = new Date();
    today.setDate(today.getDate());
    var tYear = today.getFullYear();
    var tMonth = today.getMonth()+1;
    var tDate = today.getDate();
    var theDate = $('.date');
    theDate.find('input').attr('value',tMonth+'/'+tDate+'/'+tYear);

    theDate.find('input').click(function(e){
        $(this).parent().children('.calendar').slideToggle(300);
        $('.colors').hide(300);
        e.stopPropagation();
    });

    $.calPanel = function (date) {
        var tDate = date || new Date(),
            tYear = tDate.getFullYear(),
            tMonth = tDate.getMonth(),
            currentDays = new Date(tYear,tMonth+1,0).getDate(),
            preDays = new Date(tYear,tMonth,0).getDate(),
            firstDay = new Date(tYear,tMonth,1),
            firstCell = firstDay.getDay() === 0 ? 7 : firstDay.getDay(),
            lastCell = 42 - currentDays - firstCell;
        var preMonth = [];
        for(var i = firstCell; i >0; i--) {
            preMonth.push(new Date(tYear,tMonth-1,preDays-i+1));
        }
        var currentMonth = [];
        for(var j = 0; j<currentDays; j++) {
            currentMonth.push(new Date(tYear,tMonth,j+1));
        }
        var nextMonth = [];
        for(var k = 0; k<lastCell; k++) {
            nextMonth.push(new Date(tYear,tMonth+1,k+1));
        }
        preMonth = preMonth.concat(currentMonth,nextMonth);
        return preMonth;
    };

    var calendar = $('.calendar');  //日历的容器div
    var curYear, curMonth;
    var tbody = calendar.find('tbody');
    var current = calendar;

    $.calUI = function (date) {
        //获取前后三个月的日历
        var calpanel = $.calPanel(date); //日历面板

        curYear = calpanel[7].getFullYear();
        curMonth = calpanel[7].getMonth();
        current.children('div').append('<i class="fa fa-2x fa-chevron-circle-left"></i><span>'+
            months[calpanel[7].getMonth()]+'</span>'+
            '<span>'+calpanel[7].getFullYear()+'</span>' +
            '<i class="fa fa-2x fa-chevron-circle-right"></i>');

        var curRow,curDay;
        for(var i = 0; i<42; i++){
            if(i % 7 === 0) tbody.append('<tr></tr>');
            curRow = tbody.children('tr:last-child');
            curDay = calpanel[i].getDate()
            if(i<7) {
                if(curDay>7) curRow.append('<td class="premonth">'+curDay+'</td>');
                else curRow.append('<td>'+curDay+'</td>');
            }
            else if(i>27) {
                if(curDay<15) curRow.append('<td class="nextmonth">'+curDay+'</td>');
                else curRow.append('<td>'+curDay+'</td>');
            }
            else curRow.append('<td>'+curDay+'</td>');
        }
    };

    $.calUI();

    $.changeMonth = function (cur) {
        current = cur.parents('.calendar');
        tbody = current.find('tbody');
        current.find('tbody').empty();
        current.children('div').empty();
    };

//  DOM结构没有刷新？
    calendar.on('click','i:first',function (e) {
        $.changeMonth($(this));
        $.calUI(new Date(curYear,curMonth-1,1));
        e.stopPropagation();
    });
    calendar.on('click','i:last',function (e) {
        $.changeMonth($(this));
        $.calUI(new Date(curYear,curMonth+1,1));
        e.stopPropagation();
    });

    current.find('tbody').on('click','td', function () {
        if($(this).is('.premonth')) {
            $.changeMonth($(this));
            $.calUI(new Date(curYear,curMonth-1,1));
        }
        else if($(this).is('.nextmonth')) {
            $.changeMonth($(this));
            $.calUI(new Date(curYear,curMonth+1,1));
        }
        else {
            $(this).parents('.date').find('input').attr('value',(curMonth+1)+'/'+$(this).text()+'/'+curYear);
            $(this).parents('.calendar').hide();
        }
    });
});