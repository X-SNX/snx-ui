
'use strict';

function sidebarFixed() {
    var $detail = $('#detail');
    var $content = $('#content');
    var detailOffset = $detail.offset().top;
    $(window).scroll(function () {
        if($(window).scrollTop() > detailOffset)
        {
            $detail.css({
                'position':'fixed',
                'top':'0'});
            $content.css('margin-left',250+'px');
        }
        else {
            $detail.css('position','static');
            $content.css('margin-left',0);
        }
    });
}

function menuChoosed() {
    var $detail = $('#detail');
    $detail.find('li').bind('click', function () {
        $(this).siblings().removeClass('choosed').end().addClass('choosed');
    });
}

function codeDisplay() {
    $('.code-display').bind('click', function () {
        $(this).parent().next('.code').slideToggle();
    });
}

function sample() {
    $(window).scrollMonitor({target: '#det', choosed: 'choosed'});
    $('.table-headfixed').headFixed();
    $('.tab-vertical').tabs('init',{defaultIndex:3});
    $('.tab-horizontal').tabs();
    $('.removeTextNodes').contents().filter(function() {
        return this.nodeType === 3;
    }).remove();

    if($('.active').closest('li').index() === 2) {
        $('.list-touchmovable').listGroup('swipe',{content:'你在看什么'});
        $('.list-organ').listGroup('organ');
        $('.progressbar.active').progress("animate");

        $('.alert').alert('close');
        $('.test-alert').click(function () {
            $('.alert-hide').alert();
        });

        //$('.scrollview').scrollMonitor({target: '#scroll-menu', choosed: 'scroll-choosed'});

        $('.images').imgScroll('cycle',{leftButton:'.imgscroll-left',rightButton:'.imgscroll-right'});
    }
}

function goToTop() {
    $("#goToTop").hide();//隐藏go to top按钮
    $(window).scroll(function(){
        if($(this).scrollTop()>1){//当window的scrolltop距离大于1时，go to top按钮淡出，反之淡入
            $("#goToTop").show(300);
        } else {
            $("#goToTop").hide(300);
        }
    });

    // 给go to top按钮一个点击事件
    $("#goToTop").click(function(event){
        $("html,body").animate({scrollTop:0},300);
        event.stopPropagation();
        return false;
    });
}

$(document).ready(function () {
    sidebarFixed();
    menuChoosed();
    goToTop();
    codeDisplay();
    sample();
});
