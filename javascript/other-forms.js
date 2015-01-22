$(document).ready(function () {
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
    })
    $('.number>div>div:last-child').click(function () {
        num = $(this).parents('.number').find('input').prop('value');
        $(this).parents('.number').find('input').prop('value',parseInt(num)-parseInt(1));
    });

//    .color

    $('<div class="colors"></div>').appendTo('.color');
    var x = 201, y = 193 , z = 225;
    for(var i = 0; i < 36; i++) {

        $('<span></span>').appendTo('.colors').css('background-color','rgb('+x+','+y+','+z+')');
    }
    $('<div></div>').appendTo('.colors');

    $('.colors').hide();
    $('.color').children('div:nth-child(2)').click(function(){
        $(this).parent().find('.colors').toggle();
    });

    $('.colors').children('span').click(function(){
        $(this).parents('.color').find('div:nth-child(1)').find('div').css('background-color',$(this).css('background-color'));
        $(this).parent().hide();
    }).mouseover(function(){
        $(this).parent().find('div').text($('.color').find('div').find('div').first().css('background-color'));
    }).mouseout(function () {
        $(this).parent().find('div').text('');
    })

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
    $('.date').find('input').attr('value',tMonth+'/'+tDate+'/'+tYear);

    $('.date').find('input').click(function(){
        $(this).parent().children('.calendar').toggle();
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
    }

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
    }

    $.calUI();

    $.changeMonth = function (cur) {
        current = cur.parents('.calendar');
        tbody = current.find('tbody');
        current.find('tbody').empty();
        current.children('div').empty();
    }

//  DOM结构没有刷新？
    calendar.on('click','i:first',function () {
        $.changeMonth($(this));
        $.calUI(new Date(curYear,curMonth-1,1));
    });
    calendar.on('click','i:last',function () {
        $.changeMonth($(this));
        $.calUI(new Date(curYear,curMonth+1,1));
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