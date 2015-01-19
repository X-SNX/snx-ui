$(document).ready(function () {
    var menus = $('#menu').children().children();
    menus.find('ul').hide();
    menus.click(function () {
        menus.find('ul').hide();
        menus.removeClass('.selected')
//        $('.selected').children().hide();
        $(this).find('ul').show();
        $(this).addClass('.selected');
    });

    var categories = menus.children('ul');
    var now;
    var now_menus = ['#style','#addition','#responsive'];
    var now_menu;
    categories.children('li').click(function () {
        now = $(this);
        for(var i = 1; i <= now_menus.length; i++) {
            if($(this).is('li:nth-child('+i+')')) now_menu = i-1;
        }
        categories.children('li').css('color','#cccccc');
        $('html,body').animate({scrollTop:$(now_menus[now_menu]).offset().top},200, function () {
            now.css('color','#99d2f5');
        });
    });
});
