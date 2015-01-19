/**
 * Created by Didi on 2015/01/14.
 */
$(document).ready(function(){
    $(".codebutton").click(function(event){
        $(this).parents(".fieldset").next(".code").slideToggle(300);
        event.stopPropagation();
    });
    function css(){
        var $this = $("#css");
        $this.siblings("#cssMenu").show(300);
        $this.siblings("#back").show(300);
        $this.siblings("#group").hide(300);
        $this.siblings("#js").hide(300);
    }
    function group(){
        var $this = $("#group");
        $this.css({
            "margin-top":"30px",
            "border-top":"1px solid #fff"
        });
        $this.siblings("#groupMenu").show(300);
        $this.siblings("#back").show(300);
        $this.siblings("#css").hide(300);
        $this.siblings("#js").hide(300);
    }
    function js(){
        var $this = $("#js");
        $this.css({
            "margin-top":"30px",
            "border-top":"1px solid #fff"
        });
        $this.siblings("#jsMenu").show(300);
        $this.siblings("#back").show(300);
        $this.siblings("#group").hide(300);
        $this.siblings("#css").hide(300);
    }
    function back(){
        var $this = $("#back");
        $("#cssMenu li").removeClass("active");
        $("#groupMenu li").removeClass("active");
        $("#jsMenu li").removeClass("active");
        $this.siblings("#cssMenu").hide(300);
        $this.siblings("#groupMenu").hide(300);
        $this.siblings("#jsMenu").hide(300);
        $this.hide(300);
        $this.siblings("#group").show(300);
        $this.siblings("#css").show(300);
        $this.siblings("#js").show(300);
        $("#group").css({
            "margin-top":"0",
            "border-top":"0"
        });
        $("#js").css({
            "margin-top":"0",
            "border-top":"0"
        });
    }
    $("#css").click(function(event){/*CSS*/
        css();
        event.stopPropagation();
    });
    $("#group").click(function(event){/*Group*/
        group();
        event.stopPropagation();
    });
    $("#js").click(function(event){/*JS*/
        js();
        event.stopPropagation();
    });
    $("#back").click(function(event) {/*JS*/
        back();
        event.stopPropagation();
    });
    $("#cssMenu li").click(function(event){
        var $this = $(this);
        $this.siblings().removeClass("active");
        $("#groupMenu li").removeClass("active");
        $("#jsMenu li").removeClass("active");
        $this.addClass("active");
        event.stopPropagation();
    });
    $("#groupMenu li").click(function(event){
        var $this = $(this);
        $this.siblings().removeClass("active");
        $("#cssMenu li").removeClass("active");
        $("#jsMenu li").removeClass("active");
        $this.addClass("active");
        event.stopPropagation();
    });
    $("#jsMenu li").click(function(event){
        var $this = $(this);
        $this.siblings().removeClass("active");
        $("#groupMenu li").removeClass("active");
        $("#cssMenu li").removeClass("active");
        $this.addClass("active");
        event.stopPropagation();
    });
    $(window).scroll(function () {
        $("#back").click(function(event) {/*JS*/
            back();
            event.stopPropagation();
        });
        var a = $("#Grids").offset().top;
        if (a <= $(window).scrollTop()) {
            css();
            var $this = $("#css");
            $this.show(300);
            $this.siblings("#groupMenu").hide(300);
            $this.siblings("#jsMenu").hide(300);
            $("#cssMenu").children("li").siblings().removeClass("active");
            $("#cssMenu").children("li").eq(0).addClass("active");
        }else{
            back();
        }
        var b = $("#Buttons").offset().top;
        if (b <= $(window).scrollTop()) {
            $("#cssMenu li").eq(1).siblings().removeClass("active");
            $("#cssMenu li").eq(1).addClass("active");
        }
        var c = $("#Forms").offset().top;
        if (c <= $(window).scrollTop()) {
            $("#cssMenu li").eq(2).siblings().removeClass("active");
            $("#cssMenu li").eq(2).addClass("active");
        }
        var d = $("#Tables").offset().top;
        if (d <= $(window).scrollTop()) {
            $("#cssMenu li").eq(3).siblings().removeClass("active");
            $("#cssMenu li").eq(3).addClass("active");
        }
        var e = $("#Images").offset().top;
        if (e <= $(window).scrollTop()) {
            $("#cssMenu li").eq(4).siblings().removeClass("active");
            $("#cssMenu li").eq(4).addClass("active");
        }
    });
});