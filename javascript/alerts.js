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
