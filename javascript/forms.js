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