
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
    $('.code-display').find('button').bind('click', function () {
        $(this).next('.code').slideToggle();
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
});