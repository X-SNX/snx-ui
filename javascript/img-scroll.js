
(function ($) {
    var methods = {
        cycle: function (options) {
            var defaults = {
                pgn: '.pgn-circle', //pager的容器
                pgnStyle: '.pgn-choosed', //页码被选中后的类名
                pgnChoosed: 1,  //默认选中的页码
                leftButton: '.pgn-pre', //向左的按钮
                rightButton: '.pgn-next', //向右的按钮
                autoPlay: false, //自动播放
                timeCircle: 5000 //自动播放的时间
            };
            var settings = $.extend(defaults, options);
            var touchEvents = {
                touchstart: 'touchstart',
                touchmove: 'touchmove',
                touchend: 'touchend'
            };

            var $this = $(this);
            var imgs = [];
            var i = 0, flag = 0, imgChoosed;
            $(this).find('.scroll-body').each(function () {
                imgs[i] = $(this);
                i++;
            });

            function rightToLeft(){
                imgChoosed = $this.find('.img-choosed');
                flag = imgChoosed.closest('.scroll-body').index();
                if(flag+1 === imgs.length) flag = -1;
                imgChoosed.addClass('c-slider');
                $(imgs[flag+1]).show().addClass('u-slider');
                setTimeout(function () {
                    imgChoosed.removeClass('c-slider img-choosed');
                    $(imgs[flag+1]).removeClass('u-slider').addClass('img-choosed');
                },500);
            }
            function leftToRight(){
                imgChoosed = $this.find('.img-choosed');
                flag = imgChoosed.closest('.scroll-body').index();
                if(flag+1 === imgs.length) flag = -1;
                imgChoosed.addClass('c-l-slider');
                $(imgs[flag+1]).show().addClass('u-l-slider');
                setTimeout(function () {
                    imgChoosed.removeClass('c-l-slider img-choosed');
                    $(imgs[flag+1]).removeClass('u-l-slider').addClass('img-choosed');
                },500);
            }
            function auto(){
                if(settings.autoPlay){
                    setInterval(function(){
                        leftToRight();
                    },6000);
                }
            }
            return this.each(function () {
                var startX,endX;
                var type = 'mobile';
                if(!navigator.userAgent.match(/mobile/i)){
                    touchEvents.touchstart = 'mousedown';
                    touchEvents.touchmove = 'mousemove';
                    touchEvents.touchend = 'mouseup';
                    type = 'pc';
                }
                $(this).children().bind(touchEvents.touchstart, function (event) {
                    event.preventDefault();
                    startX = (type==='mobile')?event.originalEvent.touches[0].pageX:event.pageX;

                }).bind(touchEvents.touchmove, function (event) {
                    event.preventDefault();

                }).bind(touchEvents.touchend, function (event) {
                    event.preventDefault();
                    endX = (type==='mobile')?event.originalEvent.changedTouches[0].pageX:event.pageX;
                    if((startX-endX)>40) {
                        rightToLeft();
                    }
                    else if((startX-endX)<-40) {
                        leftToRight();
                    }
                });

                $(settings.leftButton).bind('click', function () {
                    rightToLeft();
                });
                $(settings.rightButton).bind('click', function () {
                    leftToRight();
                });
                auto();
            });
        },
        stop: function (options) {

        }
    };
    $.fn.imgScroll = function (options) {
        var method = arguments[0];
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.cycle.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }
    };
})(jQuery);
