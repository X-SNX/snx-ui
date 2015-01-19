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