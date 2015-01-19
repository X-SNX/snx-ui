//投入更多的情感。
//tab切换的动画~急需考虑。
//------------------------------------------------------------
(function ($,window,document,undefined) {
    var methods = {
        init: function (options) {
            var tab,tabs,tab_item;
            var index,cur,tab_content;
            var settings = $.extend({}, this.defaults, options);
            return this.each(function () {
                tab = $(this);
                tabs = tab.children('.tabs');
                tab_item = tab.find('.tab-item');
                tab_item.hide();
                tab_item.eq(settings.defaultIndex-1).show();
                tabs.children('li').eq(settings.defaultIndex-1).addClass('tab-choosed');

                tabs.on('click', 'li',function () {
                    cur = $(this);
                    cur.siblings().removeClass('tab-choosed');
                    cur.addClass('tab-choosed');
                    index = cur.closest('li').index();
                    tab_content = cur.parent().siblings('.tab-content');
                    methods.setItemIndex(tab_content,index);
                });
                if(settings.scrollable === 'true') methods.scroll(tab_item);
            });
        },
        scroll: function (tabItem) {
            var index;
            var touchEvents = {
                touchstart: 'touchstart',
                touchmove: 'touchmove',
                touchend: 'touchend'
            };
            var startX,endX,startY,endY;
            var type = 'mobile';
            if(!navigator.userAgent.match(/mobile/i)){
                touchEvents.touchstart = 'mousedown';
                touchEvents.touchmove = 'mousemove';
                touchEvents.touchend = 'mouseup';
                type = 'pc';
            }
            tabItem.bind(touchEvents.touchstart, function (event) {
                event.preventDefault();
                startX = (type==='mobile')?event.originalEvent.touches[0].pageX:event.pageX;
                startY = (type==='mobile')?event.originalEvent.touches[0].pageY:event.pageY;
            }).bind(touchEvents.touchmove, function (event) {
                event.preventDefault();

            }).bind(touchEvents.touchend, function (event) {
                event.preventDefault();
                endX = (type==='mobile')?event.originalEvent.changedTouches[0].pageX:event.pageX;
                endY = (type==='mobile')?event.originalEvent.changedTouches[0].pageY:event.pageY;

                index = $(this).closest(tabItem).index();
                var $this = $(this);
                if($this.parent().parent().hasClass('tab-horizontal')){
                    var tabWidth = $this.outerWidth();
                    if((startX-endX)>20) {
                        if(index<2){
                            //$this.css({'position':'relative'}).animate({right:tabWidth},500, function () {
                            //    $this.hide();
                            //    $this.css({'position':'static'});
                            //    $this.next().show();
                            //});
                            $this.hide();
                            $this.next().show();
                            methods.setTabIndex($this.parent(),index+1);
                        }
                    }
                    else if((startX-endX)<-20) {
                        if(index>0){
                            $this.hide();
                            $this.prev().show();
                            methods.setTabIndex($this.parent(),index-1);
                        }
                    }
                }
                //现在这样的方法需要设定tabcontent的height。
                else if($this.parent().parent().hasClass('tab-vertical')){
                    if((startY-endY)>2) {
                        if(index<2){
                            $this.slideUp();
                            $this.next().show();
                            methods.setTabIndex($this.parent(),index+1);
                        }

                    }
                    else if((startY-endY)<-2) {
                        if(index>0){
                            $this.prev().slideDown(function () {
                                $this.hide();
                            });
                            methods.setTabIndex($this.parent(),index-1);
                        }
                    }
                }
            });
        },
        //这个地方的ele是tab-content，真的好么
        setItemIndex: function (ele,index) {
            ele.find('.tab-item').not('.tab-item:eq('+index+')').hide();
            ele.find('.tab-item:eq('+index+')').show();
        },
        setTabIndex: function (ele,index) {

            ele.siblings('.tabs').find('li:eq('+index+')').addClass('tab-choosed');
            ele.siblings('.tabs').find('li').not('li:eq('+index+')').removeClass('tab-choosed');
        }
    };

    var myPlugin = function (options) {
        $('.removeTextNodes').contents().filter(function() {
            return this.nodeType === 3;
        }).remove();

        this.defaults = {
            defaultIndex: 1,
            scrollable: 'true',
            tabs: '.tabs',
            tabItems: '.tab-item'
            //easing: 'none'
        };

        var method = arguments[0];
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }
    };

    $.fn.tabs = myPlugin;
})(jQuery,window,document);