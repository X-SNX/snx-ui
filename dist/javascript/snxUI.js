/**
 * Created by DAC-Chen on 2014/11/26.
 */
(function ($) {
    var methods = {
        init: function (options) {
            var defaults = {
                //isDefault: 'true', //是否默认弹出样式,默认在？
                relEle: 'body', //相对的元素
                duration: 2000, //持续时间
                time: 200,
                direction: 'leftToRight' //运动方向
            };
            var settings = $.extend(defaults, options);
            return this.each(function () {
                $this = $(this);
                $(settings.relEle).css('position','relative');
                $this.fadeIn(settings.time).css({'top':0,'left':0});
                setTimeout(function () {
                    $this.fadeOut(settings.time);
                },settings.duration);
            });
        },
        close: function (options) {
            var time = $.extend(200, options);
            return this.each(function () {
                $this = $(this);
                $this.prepend('<i class="fa fa-close"></i>');
                $this.on('click', '.fa-close', function (event) {
                   $(this).parent().fadeOut(time);
                   event.stopPropagation()
                });
            });
        }
    };
    $.fn.alert = function (options) {
        var method = arguments[0];
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }
    };
})(jQuery);



$(document).ready(function(){
    $('.btn-dropdown').bind('click',function(event){
        var dropdownName;
        var $this   = $(this);
        dropdownName = $this.attr('data-dropdown');//获取用户的输入标记
        $('.dropdown-list').slideUp(200);
        if($(dropdownName).is(':visible')){
            $(dropdownName).slideUp(200);
        }else{
            $(dropdownName).slideDown(200);
        }
        event.stopPropagation();
    });
    $(document).bind('click',function(e){//点击空白区域隐藏弹出
        var target  = $(e.target);
        if(target.closest('.dropdown-list').length === 0){
            $('.dropdown-list').slideUp(200);
        }
        e.stopPropagation();
    });

    //解决divider的大小自适应,效率很可能是问题。
    $('.dropdown-list').each(function(){
        var width = $(this).width();
        $(this).find('.divider').css({
            "border-left": (width / 2) + "px solid transparent",
            "border-right": (width / 2) + "px solid transparent"
        });
    });

    $(window).resize(function() {
        $('.dropdown-list').each(function(){
            var width = $(this).width();
            $(this).find('.divider').css({
                "border-left": (width / 2) + "px solid transparent",
                "border-right": (width / 2) + "px solid transparent"
            });
        });
    });

});
/**
 * Created by Didi on 2014/10/16.
 */

$(document).ready(function(){

    $('.form').each(function(){
        $(this).find('.file').attr("tabIndex", "0");//使得form中的span具有tab属
    });
    /*使input-info正方形*/
    $('.input-info').each(function(){
        var height = $(this).parent('.input-group')
            .children('input').height();
        $(this).css({"width":(height)+"px"});
    });
    /*使得disabled可用*/
    $('input[type="radio"]').each(function(){
        if($(this).attr('disabled')){
            var radioid=$(this).attr('id');
            $(this).wrap('<div class="radio-input" disabled="disabled"></div>');
            $(this).after('<label for='+radioid+' disabled="disabled"></label>');
        }else{
        var radioid1=$(this).attr('id');
        $(this).wrap('<div class="radio-input"></div>');
        $(this).after('<label for='+radioid1+'></label>');
        }

    });

    $('input[type="checkbox"]').each(function(){
        if($(this).attr('disabled')){
            var checkboxid=$(this).attr('id');
            $(this).wrap('<div class="checkbox-input" disabled="disabled"></div>');
            $(this).after('<label for='+checkboxid+' disabled="disabled"></label>');
        }else {
            var checkboxid1 = $(this).attr('id');
            $(this).wrap('<div class="checkbox-input"></div>');
            $(this).after('<label for=' + checkboxid1 + '></label>');
        }
    });

    $(function () {//按钮样式的Checkbox、Radio
        $('input[type="checkbox"]:checked').each(function (){
            $(this).parent('.checkbox-input').parent('.btn').addClass('active');
        });
        $('input[type="checkbox"]:not(:checked)').each(function (){
            $(this).parent('.checkbox-input').parent('.btn').removeClass('active');
        });
        $('input[type="checkbox"]').click(function () {
            $('input[type="checkbox"]:checked').each(function (){
                $(this).parent('.checkbox-input').parent('.btn').addClass('active');
            });
            $('input[type="checkbox"]:not(:checked)').each(function (){
                $(this).parent('.checkbox-input').parent('.btn').removeClass('active');
            })
        });
        $('input[type="radio"]:checked').each(function (){
            $(this).parent('.radio-input').parent('.btn').addClass('active');
        });
        $('input[type="radio"]:not(:checked)').each(function (){
            $(this).parent('.radio-input').parent('.btn').removeClass('active');
        });
        $('input[type="radio"]').click(function () {
            $('input[type="radio"]:checked').each(function (){
                $(this).parent('.radio-input').parent('.btn').addClass('active');
            });
            $('input[type="radio"]:not(:checked)').each(function (){
                $(this).parent('.radio-input').parent('.btn').removeClass('active');
            })
        });

    });
});

(function ($) {
    var methods = {
        cycle: function (options) {
            var defaults = {
                pgn: '.pgn-circle', //pager的容器
                pgnStyle: '.pgn-choosed', //页码被选中后的类名
                pgnChoosed: 1,  //默认选中的页码
                leftButton: '.pgn-pre', //向左的按钮
                rightButton: '.pgn-next', //向右的按钮
                autoPlay: false, //自动播放
                timeCircle: 5000 //自动播放的时间
            };
            var settings = $.extend(defaults, options);
            var touchEvents = {
                touchstart: 'touchstart',
                touchmove: 'touchmove',
                touchend: 'touchend'
            };

            var $this = $(this);
            var imgs = [];
            var i = 0, flag = 0, imgChoosed;
            $(this).find('.scroll-body').each(function () {
                imgs[i] = $(this);
                i++;
            });

            function rightToLeft(){
                imgChoosed = $this.find('.img-choosed');
                flag = imgChoosed.closest('.scroll-body').index();
                if(flag+1 === imgs.length) flag = -1;
                imgChoosed.addClass('c-slider');
                $(imgs[flag+1]).show().addClass('u-slider');
                setTimeout(function () {
                    imgChoosed.removeClass('c-slider img-choosed');
                    $(imgs[flag+1]).removeClass('u-slider').addClass('img-choosed');
                },500);
            }
            function leftToRight(){
                imgChoosed = $this.find('.img-choosed');
                flag = imgChoosed.closest('.scroll-body').index();
                if(flag+1 === imgs.length) flag = -1;
                imgChoosed.addClass('c-l-slider');
                $(imgs[flag+1]).show().addClass('u-l-slider');
                setTimeout(function () {
                    imgChoosed.removeClass('c-l-slider img-choosed');
                    $(imgs[flag+1]).removeClass('u-l-slider').addClass('img-choosed');
                },500);
            }
            function auto(){
                if(settings.autoPlay){
                    setInterval(function(){
                        leftToRight();
                    },6000);
                }
            }
            return this.each(function () {
                var startX,endX;
                var type = 'mobile';
                if(!navigator.userAgent.match(/mobile/i)){
                    touchEvents.touchstart = 'mousedown';
                    touchEvents.touchmove = 'mousemove';
                    touchEvents.touchend = 'mouseup';
                    type = 'pc';
                }
                $(this).children().bind(touchEvents.touchstart, function (event) {
                    event.preventDefault();
                    startX = (type==='mobile')?event.originalEvent.touches[0].pageX:event.pageX;

                }).bind(touchEvents.touchmove, function (event) {
                    event.preventDefault();

                }).bind(touchEvents.touchend, function (event) {
                    event.preventDefault();
                    endX = (type==='mobile')?event.originalEvent.changedTouches[0].pageX:event.pageX;
                    if((startX-endX)>40) {
                        rightToLeft();
                    }
                    else if((startX-endX)<-40) {
                        leftToRight();
                    }
                });

                $(settings.leftButton).bind('click', function () {
                    rightToLeft();
                });
                $(settings.rightButton).bind('click', function () {
                    leftToRight();
                });
                auto();
            });
        },
        stop: function (options) {

        }
    };
    $.fn.imgScroll = function (options) {
        var method = arguments[0];
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.cycle.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }
    };
})(jQuery);

(function ($) {
    var methods = {
        organ: function (options) {
            var organs,organ;
            return this.each(function () {
                organs = $(this).children('.list-item');
                organs.click(function () {
                    organ = $(this);
                    organ.siblings('.list-content').not($(this).next()).slideUp(200);
                    organ.next().slideToggle(200);
                });
            });
        },
        swipe: function (options) {
            var defaults = {
                content: '删除'
            };
            var settings = $.extend(defaults,options);
            var touchEvents = {
                touchstart: 'touchstart',
                touchmove: 'touchmove',
                touchend: 'touchend'
            };
            return this.each(function () {
                var startX,endX;
                var type = 'mobile';
                if(!navigator.userAgent.match(/mobile/i)){
                    touchEvents.touchstart = 'mousedown';
                    touchEvents.touchmove = 'mousemove';
                    touchEvents.touchend = 'mouseup';
                    type = 'pc';
                }
                $(this).children().children().append('<span>'+settings.content+'</span>');
                $(this).children().bind(touchEvents.touchstart, function (event) {
                    event.preventDefault();
                    startX = (type==='mobile')?event.originalEvent.touches[0].pageX:event.pageX;

                }).bind(touchEvents.touchmove, function (event) {
                    event.preventDefault();

                }).bind(touchEvents.touchend, function (event) {
                    event.preventDefault();
                    endX = (type==='mobile')?event.originalEvent.changedTouches[0].pageX:event.pageX;
                    if((startX-endX)>20) {
                        $(this).siblings().children().removeClass('list-touchmoved');
                        $(this).children().addClass('list-touchmoved');
                    }
                    else if ((startX-endX)<-10) {
                        $(this).children().removeClass('list-touchmoved');
                    }
                });
                $('.list-touchmovable').on(touchEvents.touchstart,'.list-touchmoved>span', function (event) {
                    event.preventDefault();
                    //$(this).parents('.list-item').hide();
                    $(this).parents('.list-item').animate({height:0},200, function () {
                        methods.destroy($(this));
                    });
                });
            });
        },
        //什么算是destroy。再考虑下啊，，
        destroy: function (options) {
            options.hide();
        }
    };
    $.fn.listGroup = function (options) {
        var method = arguments[0];
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.organ.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }
    };
})(jQuery);



$(document).ready(function() {

    $('.btn-modal').click(function (event) {
        var $this = $(this);
        var modalName = $this.attr('data-modal');//获取用户的输入标记
        $(modalName).show();//识别了用户定义的id之后就直接显示
        $(modalName).find('.content').css({'opacity':0.6});
        $(modalName).find('.content').slideDown(200).fadeTo(10,1);
        event.stopPropagation();
    });
    $(document).bind('click',function(e){//点击空白区域隐藏弹出模态框
        var target  = $(e.target);
        if(target.closest('.modal-header').length == 0
            && target.closest('.modal-body').length == 0
            && target.closest('.modal-footer').length == 0){
            $('.content').hide();
            $('.modal').hide();
        }
        e.stopPropagation();
    });

    //改变id为close的按钮点击隐藏
    $('.close').click(function (event) {
        $('.content').hide();
            $('.modal').hide();
        event.stopPropagation();
    });

});


$(document).ready(function(){
    $('.nav').each(function(){
        var $this = $(this);
        $this.find('.form ').css({'margin-top':'calc(0.5em - 1px)'});
        $this.find('.form .input-xl').parents(".form").css({'margin-top':'calc(0.2em - 1px)'});
        $this.find('.form .input-lg').parents(".form").css({'margin-top':'calc(0.3636em - 1px)'});
        $this.find('.form .input-sm').parents(".form").css({'margin-top':'calc(0.65em - 1px)'});
        $this.find('.form .input-xs').parents(".form").css({'margin-top':'calc(0.8em - 1px)'});
    });
});

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
$(document).ready(function () {
    $('.label-removed').children('i').on('click', function () {
        $(this).parent().fadeOut();
    });
});




$(document).ready(function() {

    $('.popup-bottom').each(function(){
        var $width1 = $(this).parent('.popup').outerWidth();
        var width1 = Math.abs(((240-($width1))/2));//解决超长按钮居中问题
        if(240>$width1){
            $(this).css({'left': '-' + width1 + 'px'});
        }else{
            $(this).css({'left': + width1 + 'px'});
        }
        if($(this).find('.popup-header').length!==0) {
            $(this).find('.popup-triangle').css({'display': 'none'});
            $(this).prepend('<span class="popup-triangle"></span>');
            $(this).find('.popup-triangle').css({'color':'#d6d6d6'});
        }
    });

    $('.popup-top').each(function(){
        var $width2 = $(this).parent('.popup').outerWidth();
        var width2 = Math.abs(((240-($width2))/2));//解决超长按钮居中问题
        if(240>$width2){
            $(this).css({'left': '-' + width2 + 'px'});
        }else{
            $(this).css({'left': + width2 + 'px'});
        }
    });
    $('.popup-left').each(function(){
        var $width3 = $(this).parent('.popup').outerWidth();
        $(this).css({'right':(($width3)+18)+'px'});
        var $height1 = $(this).outerHeight();
        $(this).find('.popup-triangle').css({'top':((($height1)-30)/2)+'px'});
        var $height2 = $(this).parent('.popup').outerHeight();
        var height2 = Math.abs(((($height1)-($height2))/2));
        if($height1>$height2) {
            $(this).css({'top': '-' + height2 + 'px'});
        }else{
            $(this).css({'top': height2 + 'px'});
        }
    });
    $('.popup-right').each(function(){
        var $width4 = $(this).parent('.popup').outerWidth();
        $(this).css({'left':(($width4)+18)+'px'});
        var $height3 = $(this).outerHeight();
        $(this).find('.popup-triangle').css({'top':((($height3)-30)/2)+'px'});
        var $height4 = $(this).parent('.popup').outerHeight();
        var height4 = Math.abs(((($height3)-($height4))/2));
        if($height3>$height4) {
            $(this).css({'top': '-' + height4 + 'px'});
        }else{
            $(this).css({'top': height4 + 'px'});
        }
    });
    $('.popup').bind('click',function (event) {//点击弹出,无需绑定ID
        //alert("ha");
        var $this=$(this).find('.popup-list');
        //alert($this);
        $('.popup-list').fadeOut(300);
        if($this.is(':visible')){
            $this.fadeOut(300);
        }else{
            $this.fadeIn(300);
        }
        event.stopPropagation();
    });

    $(document).bind('click',function(e){//点击空白区域隐藏(仍有问题)
        var target  = $(e.target);
        if(target.closest('.popup-list').length == 0){
            $('.popup-list').fadeOut(300);
        }
        e.stopPropagation();
    });
});

/**
 * Created by DAC-Chen on 2014/11/12.
 */

(function ($) {

    var methods = {
        /*
         init作为默认方法，主要内容是样式的设定，这些样式也可以通过css设定
         可以以此为入口根据参数判断执行其他方法，但不妨碍其他方法的直接调用。
         */
        init: function () {
            var settings = this.settings;
            var obj = this;
            return this.each(function () {
                var pro = $(this).children();
                pro.css('width', settings.curValue + '%');
                if (settings.hasText === true)
                    pro.text(settings.curValue + '%');
                if (settings.hasStrip === true)
                    pro.addClass('probar-stripe');
                if (settings.hasAnimatedStrip === true)
                    pro.addClass('animate-stripe');
                if (settings.hasAnimation === true)
                    methods.animate($(this),
                        settings.start,
                        settings.end,
                        settings.duration,
                        settings.hasText);
            });
        },
        /*
        start作为方法可以直接被调用
        触发进度条开始加载，所有参数暂定默认
        */
        start: function () {

        },
        /*
        stop作为方法可以直接被调用
        暂停进度条加载，还没有需要的参数
        */
        //stop: function () {
        //    clearInterval(setInt);
        //},
        /*
        done作为方法可以直接被调用
        触发进度条快速加载完毕【还未想到比较好的实现方法】
        */
        done: function () {

        },
        /*
         animate作为方法可以直接被调用
         默认参数为start,end,duration三项。
         该方法的实现还可以通过：在init传入hasAnimation参数调用。
         */
        animate: function (obj,start,end,duration,hasText) {
            var obj = this||obj;
            var start = start||0;
            var end = end||100;
            var duration = duration||7000;
            return obj.each(function () {
                var pro = obj.children().css('width',0+'%');
                if(start < end){
                    pro.animate({
                        width:end+'%'},{
                        duration:duration
                    });
                    if(hasText === 'true'){
                        setInterval(function () {
                            pro.text(parseInt((pro.innerWidth()/pro.parent().width())*100) + '%');
                        },duration/(end-start));
                    }
                }
            });
        }
    };
    
    $.fn.progress = function (options) {
        this.defaults = {
            curValue: 0,
            hasText: true,
            hasStrip: false,
            hasAnimatedStrip: false,
            hasAnimation: false,
            timeInt: "",

            start: 0,
            end: 100,
            duration: 7000
        };
        this.settings = $.extend({}, this.defaults, options);
        var method = arguments[0];
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }
    };
})(jQuery);
(function ($, window) {
    var methods = {
        init: function () {
            var settings = this.settings;

            return this.each(function () {
                //get the $(this)
                var cur = $(this);
                var tar = settings.target;
                var choosed = settings.choosed;
                var anchor = [];
                var num=0;
                var offsets = [];
                var con;
                if(cur[0] === window) con = settings.container;
                else con = cur;
                $(tar).find('[href]').each(function () {
                    anchor[num] = $(this);
                    num++;
                });

                //监听滚动事件
                var flag = 0;
                cur.scroll(function () {
                    if(flag === 0||flag ===1 ) {
                        for(var i = 0; i<num; i++){
                            var temp1 = anchor[0].attr('href').replace(/#/,'');
                            if(i<num-1) {
                                var temp2 = anchor[i+1].attr('href').replace(/#/,'');
                                //offsets[i] = $(temp2).offset().top-$(temp1).offset().top;
                                offsets[i] = document.getElementById(temp2).offsetTop
                                -document.getElementById(temp1).offsetTop;
                            }
                            else if(i === (num-1)) offsets[i] = con[0].scrollHeight-document.getElementById(temp1).offsetTop;
                        }
                        flag++;
                    }
                    for(var j = 0; j<num; j++){
                        var tars = anchor[j].attr('href');
                        var baseOffset = document.getElementById(anchor[0].attr('href').replace(/#/,'')).offsetTop;
                        if($(this).scrollTop() < offsets[j]+baseOffset-1){
                            //监听中发生样式改变在这里修改。
                            $(tar).children().removeClass(choosed);
                            $('[href="'+tars+'"]').parent().addClass(choosed);
                            break;
                        }
                    }
                });
            });
        }
    };
    $.fn.scrollMonitor = function (options) {
        this.defaults = {
            target: [],
            container: $('body'),
            choosed: ''
        };
        this.settings = $.extend({}, this.defaults, options);
        var method = arguments[0];
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }
    };
})(jQuery, window);


(function ($) {
    var methods = {
        init: function (options) {

            return this.each(function () {
                var $this = $(this);

                var td_num = 0;
                var thclone = $this.find('table').clone();
                var obj = $('<div class="thclone table-responsive"></div>');
                $this.before(obj);
                obj.prepend(thclone);
                $this.prev('.thclone').find('th').each(function () {
                    var td_width = $this.find('tbody').find('td:nth-child('+(td_num+1)+')').width();
                    $(this).width(td_width);
                    $this.find('tbody').find('td:nth-child('+(td_num+1)+')').width(td_width)
                    td_num++;
                });
                $this.prev('.thclone').find('tbody').hide();
                $this.find('thead').hide();
                $(window).resize(function () {
                    td_num = 0;
                    $this.prev('.thclone').find('th').each(function () {
                        var td_width = $this.find('tbody').find('td:nth-child('+(td_num+1)+')').width();
                        $(this).width(td_width);
                        td_num++;
                    });

                });

                $this.bind('scroll', function () {
                    $(this).prev('.thclone').scrollLeft($(this).scrollLeft());
                });
            });
        }
    };
    $.fn.headFixed = function (options) {
        var method = arguments[0];
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }
    };
})(jQuery);

//投入更多的情感。
//tab切换的动画~急需考虑。
//------------------------------------------------------------
(function ($,window,document,undefined) {
    var methods = {
        init: function (options) {
            var tab,tabs,tab_item;
            var index,cur,tab_content;
            var settings = $.extend({}, this.defaults, options);
            return this.each(function () {
                tab = $(this);
                tabs = tab.children('.tabs');
                tab_item = tab.find('.tab-item');
                tab_item.hide();
                tab_item.eq(settings.defaultIndex-1).show();
                tabs.children('li').eq(settings.defaultIndex-1).addClass('tab-choosed');

                tabs.on('click', 'li',function () {
                    cur = $(this);
                    cur.siblings().removeClass('tab-choosed');
                    cur.addClass('tab-choosed');
                    index = cur.closest('li').index();
                    tab_content = cur.parent().siblings('.tab-content');
                    methods.setItemIndex(tab_content,index);
                });
                if(settings.scrollable === 'true') methods.scroll(tab_item);
            });
        },
        scroll: function (tabItem) {
            var index;
            var touchEvents = {
                touchstart: 'touchstart',
                touchmove: 'touchmove',
                touchend: 'touchend'
            };
            var startX,endX,startY,endY;
            var type = 'mobile';
            if(!navigator.userAgent.match(/mobile/i)){
                touchEvents.touchstart = 'mousedown';
                touchEvents.touchmove = 'mousemove';
                touchEvents.touchend = 'mouseup';
                type = 'pc';
            }
            tabItem.bind(touchEvents.touchstart, function (event) {
                event.preventDefault();
                startX = (type==='mobile')?event.originalEvent.touches[0].pageX:event.pageX;
                startY = (type==='mobile')?event.originalEvent.touches[0].pageY:event.pageY;
            }).bind(touchEvents.touchmove, function (event) {
                event.preventDefault();

            }).bind(touchEvents.touchend, function (event) {
                event.preventDefault();
                endX = (type==='mobile')?event.originalEvent.changedTouches[0].pageX:event.pageX;
                endY = (type==='mobile')?event.originalEvent.changedTouches[0].pageY:event.pageY;

                index = $(this).closest(tabItem).index();
                var $this = $(this);
                if($this.parent().parent().hasClass('tab-horizontal')){
                    var tabWidth = $this.outerWidth();
                    if((startX-endX)>20) {
                        if(index<2){
                            //$this.css({'position':'relative'}).animate({right:tabWidth},500, function () {
                            //    $this.hide();
                            //    $this.css({'position':'static'});
                            //    $this.next().show();
                            //});
                            $this.hide();
                            $this.next().show();
                            methods.setTabIndex($this.parent(),index+1);
                        }
                    }
                    else if((startX-endX)<-20) {
                        if(index>0){
                            $this.hide();
                            $this.prev().show();
                            methods.setTabIndex($this.parent(),index-1);
                        }
                    }
                }
                //现在这样的方法需要设定tabcontent的height。
                else if($this.parent().parent().hasClass('tab-vertical')){
                    if((startY-endY)>2) {
                        if(index<2){
                            $this.slideUp();
                            $this.next().show();
                            methods.setTabIndex($this.parent(),index+1);
                        }

                    }
                    else if((startY-endY)<-2) {
                        if(index>0){
                            $this.prev().slideDown(function () {
                                $this.hide();
                            });
                            methods.setTabIndex($this.parent(),index-1);
                        }
                    }
                }
            });
        },
        //这个地方的ele是tab-content，真的好么
        setItemIndex: function (ele,index) {
            ele.find('.tab-item').not('.tab-item:eq('+index+')').hide();
            ele.find('.tab-item:eq('+index+')').show();
        },
        setTabIndex: function (ele,index) {

            ele.siblings('.tabs').find('li:eq('+index+')').addClass('tab-choosed');
            ele.siblings('.tabs').find('li').not('li:eq('+index+')').removeClass('tab-choosed');
        }
    };

    var myPlugin = function (options) {
        $('.removeTextNodes').contents().filter(function() {
            return this.nodeType === 3;
        }).remove();

        this.defaults = {
            defaultIndex: 1,
            scrollable: 'true',
            tabs: '.tabs',
            tabItems: '.tab-item'
            //easing: 'none'
        };

        var method = arguments[0];
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }
    };

    $.fn.tabs = myPlugin;
})(jQuery,window,document);


$(document).ready(function() {
    $('.tooltip-bottom').each(function(){
        var $width1 = $(this).parent('.tooltip').outerWidth();
        var width1 = Math.abs(((220-($width1))/2));
        if(220>$width1)
        {
            $(this).css({'left': '-' + width1 + 'px'});
        }else{
            $(this).css({'left': + width1 + 'px'});
        }
    });
    $('.tooltip-top').each(function(){
        var $width2 = $(this).parent('.tooltip').outerWidth();
        $(this).css({'left':'-'+((220-($width2))/2)+'px'});
    });
    $('.tooltip-left').each(function(){
        var $width3 = $(this).parent('.tooltip').outerWidth();
        $(this).css({'right':(($width3)+15)+'px'});
        var $height1 = $(this).outerHeight();
        var  height1 = Math.abs(((($height1)-20)/2));
        $(this).find('.tooltip-triangle').css({'top':height1+'px'});
        var $height2 = $(this).parent('.tooltip').outerHeight();
        var height2 = Math.abs(((($height1)-($height2))/2));
        if($height1>$height2){
            $(this).css({'top':'-'+height2+'px'});
        }else{
            $(this).css({'top':height2+'px'});
        }
    });
    $('.tooltip-right').each(function(){
        var $width4 = $(this).parent('.tooltip').outerWidth();
        $(this).css({'left':(($width4)+15)+'px'});
        var $height3 = $(this).outerHeight();
        var height3 = Math.abs(((($height3)-20)/2));
        $(this).find('.tooltip-triangle').css({'top':height3+'px'});
        var $height4 = $(this).parent('.tooltip').outerHeight();
        var height4 = Math.abs(((($height3)-($height4))/2));
        if($height3>$height4){
            $(this).css({'top':'-'+height4+'px'});
        }else{
            $(this).css({'top':height4+'px'});
        }
    });

});