

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