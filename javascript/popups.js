

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
