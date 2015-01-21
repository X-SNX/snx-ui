
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

$(document).ready(function () {
    sidebarFixed();
    menuChoosed();
    codeDisplay();
    $(window).scrollMonitor({target:'#det'});
    $('.table-headfixed').headFixed();
    $('.tab-vertical').tabs('init',{defaultIndex:3});
    $('.tab-horizontal').tabs();
    $('.removeTextNodes').contents().filter(function() {
        return this.nodeType === 3;
    }).remove();
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
        $('.list-item').find(".list-touchmoved").each(function(){
            var $this = $(this);
            $this.removeClass("list-touchmoved");
            $this.find(".btn").css({
                "display":"inline-block"
            })
        });
        event.stopPropagation();
        return false;
    });
});
