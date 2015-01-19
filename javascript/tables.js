(function ($) {
    var methods = {
        init: function (options) {

            return this.each(function () {
                var $this = $(this);

                var td_num = 0;
                var thclone = $this.find('table').clone();
                var obj = $('<div class="thclone table-responsive"></div>');
                $this.before(obj);
                obj.prepend(thclone);
                $this.prev('.thclone').find('th').each(function () {
                    var td_width = $this.find('tbody').find('td:nth-child('+(td_num+1)+')').width();
                    $(this).width(td_width);
                    $this.find('tbody').find('td:nth-child('+(td_num+1)+')').width(td_width)
                    td_num++;
                });
                $this.prev('.thclone').find('tbody').hide();
                $this.find('thead').hide();
                $(window).resize(function () {
                    td_num = 0;
                    $this.prev('.thclone').find('th').each(function () {
                        var td_width = $this.find('tbody').find('td:nth-child('+(td_num+1)+')').width();
                        $(this).width(td_width);
                        td_num++;
                    });

                });

                $this.bind('scroll', function () {
                    $(this).prev('.thclone').scrollLeft($(this).scrollLeft());
                });
            });
        }
    };
    $.fn.headFixed = function (options) {
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
