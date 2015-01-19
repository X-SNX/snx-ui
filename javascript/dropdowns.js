

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
        if(target.closest('.dropdown-list').length == 0){
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