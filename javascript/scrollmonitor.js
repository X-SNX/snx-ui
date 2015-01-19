(function ($) {
    $.fn.scrollMonitor = function (options) {
        var defaults = {
            target: [],
            container: $('body')
        };
        var settings = $.extend(defaults,options);

        return this.each(function () {
            //get the $(this)
            var cur = $(this);
            var tar = settings.target;
            var anchor = $;
            var num=0;
            var offsets = [];
            var con;
            if(cur[0] === window) con = settings.container;
            else con = cur;
            $(tar).find('[href]').each(function () {
                anchor[num] = $(this);
                num++;
            });

            //监听滚动事件
            var flag = 0;
            cur.scroll(function () {
                if(flag === 0) {
                    for(var i = 0; i<num; i++){
                        var temp1 = anchor[0].attr('href').replace(/#/,'');
                        if(i<num-1) {
                            var temp2 = anchor[i+1].attr('href').replace(/#/,'');
                            //offsets[i] = $(temp2).offset().top-$(temp1).offset().top;
                            offsets[i] = document.getElementById(temp2).offsetTop
                            -document.getElementById(temp1).offsetTop;
                        }
                        else if(i === (num-1)) offsets[i] = con[0].scrollHeight-document.getElementById(temp1).offsetTop;
                    }
                    flag++;
                }
                for(var j = 0; j<num; j++){
                    var tars = anchor[j].attr('href');
                    if($(this).scrollTop() < offsets[j]){
                        //监听中发生样式改变在这里修改。
                        $(tar).find('li').removeClass('choosed');
                        $('[href="'+tars+'"]').parent().addClass('choosed');
                        break;
                    }
                }
            });
        });
    };
})(jQuery);



