//==================
// has attr plugin
//==================
$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};
//==================
// black page of menu
//==================
$(".black-page , .close-menu i").click(function () {
    $(".menu-items").css({left: ""});
    $(".black-page").fadeOut();
    $("[data-close-btn]").trigger("click");
    $("html").removeAttr("style");
});
$("[data-open-black-page]").click(function(){
    $(".black-page").fadeIn();
})
//==================
// menu btn
//==================
$(".dropdown > div > i.icon-font-plus-menu").click(function () {
    $(this).closest("li").find(" > ul.menu-down").stop().slideToggle();
    $(this).toggleClass("icon-font-plus-menu");
    $(this).toggleClass("icon-font-remove-menu");
});

$(".menu-small-icon").click(function (e) {
    $(".menu-items").css({left: 0});
    $(".black-page").fadeIn();
    $("html").css({overflow: "hidden"});
    e.stopPropagation();
    e.preventDefault();
});

//==================
// rail
//==================
var set_rail = function (e) {
    var $this = $(this);
    var $this_select_parent = $this.parents("[data-add-rail]");
    var $this_select_rail = $this_select_parent.find(".rail");
    var $this_select_active = $this_select_parent.find(".active");
    $this_select_rail.width($this_select_active.width());
    $this_select_rail.css({
        top: $this_select_active.position().top + $this_select_active.height(),
        left: $this_select_active.position().left
    })
};
$("[data-add-rail] .header-item.active").trigger("mouseover");
$("[data-add-rail] .header-item").mouseenter(function (e) {
    var $this = $(this);
    var $this_select_parent = $this.parents("[data-add-rail]");
    var $this_select_rail = $this_select_parent.find(".rail");
    $this_select_rail.width($this.width());
    $this_select_rail.css({
        top: $this.position().top + $this.height(),
        left: $this.position().left
    })
});
$("[data-add-rail] .header-item").mouseleave(set_rail);
$("[data-add-rail] .header-item").each(set_rail);

//==================
// hover item
//==================
$("[data-hover] .item").hover(function () {
    var $this = $(this);
    $this.addClass("active").siblings(".item").removeClass("active");
    $this.parents("[data-hover]").siblings("[data-hover-main]").find(".item-main").eq($this.index()).addClass("active").siblings(".item-main").removeClass("active")
});

//==================
// slider
//==================
$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};
$('[data-slider]').each(function () {
    var $this = $(this);
    var option = {
        cellAlign: $this.attr("data-cell-align"),
        asNavFor: $this.attr("data-nav-select"),
        contain: true,
        groupCells: eval($this.attr("data-disable-number")),
        wrapAround: eval($this.attr("data-loop")),
        setGallerySize: false,
        resize: true,
        prevNextButtons: false,
        cellSelector: ".item",
        pageDots: eval($this.attr("data-items-nav")),
        autoPlay: eval($this.attr("data-autoPlay")),
        pauseAutoPlayOnHover: eval($this.attr("data-pauseAutoPlayOnHover")),
        rightToLeft: false,
        fade: eval($this.attr("data-fade")),
    };
    $this.find(".this-slider").flickity(option);
    $this.find(".this-slider").trigger("dragMove.flickity");
    var trigger_slider = function (event, pointer, moveVector) {
        if ($this.find(".this-slider .item:first").hasClass("is-selected")) {
            $this.parents(".slider").find(".chevron-left:not(.chevrons-right)").attr("disabled", "disabled");
        } else {
            $this.parents(".slider").find(".chevron-left:not(.chevrons-right)").removeAttr("disabled", "disabled");
        }
        if ($this.find(".this-slider .item:last").hasClass("is-selected")) {
            $this.parents(".slider").find(".chevron-right:not(.chevrons-right)").attr("disabled", "disabled");
        } else {
            $this.parents(".slider").find(".chevron-right:not(.chevrons-right)").removeAttr("disabled", "disabled");
        }


        if ($this.find(".this-slider .item:first").hasClass("is-selected")) {
            $this.parents(".slider").find(".chevron-left.chevrons-right").attr("disabled", "disabled");
            $this.parents(".slider").find(".chevron-right.chevrons-right").removeAttr("disabled", "disabled");
        }
        if ($this.find(".this-slider .item:last").hasClass("is-selected")) {
            $this.parents(".slider").find(".chevron-left.chevrons-right").removeAttr("disabled", "disabled");
            $this.parents(".slider").find(".chevron-right.chevrons-right").attr("disabled", "disabled");
        }
    };
    $this.find(".this-slider").on("dragStart.flickity dragMove.flickity dragEnd.flickity select.flickity", trigger_slider);
    // $this.find(".this-slider").mouseenter(function () {
    //     $this.find("[data-timer-slider]").addClass("pause-timer");
    // });
    // $this.find(".this-slider").on( "change.flickity",function () {
    //     $this.find("[data-timer-slider]").addClass("active").removeClass("pause-timer");
    // });

    if ($this.siblings(".slider-title").find(".chevron-left").length) {
        $this.siblings(".slider-title").find(".chevron-left").click(function () {
            $(this).parents(".slider-title").siblings("[data-slider]").find(".this-slider").flickity('previous');
            $this.find(".this-slider").trigger("dragMove.flickity");
        });
    } else {
        $this.find(".chevron-left").click(function () {
            $this.find(".this-slider").flickity('previous');
            $this.find(".this-slider").trigger("dragMove.flickity");
        });
    }
    if ($this.siblings(".slider-title").find(".chevron-right").length) {
        $this.siblings(".slider-title").find(".chevron-right").click(function () {
            $(this).parents(".slider-title").siblings("[data-slider]").find(".this-slider").flickity('next');
            $this.find(".this-slider").trigger("dragMove.flickity");
        });
    } else {
        $this.find(".chevron-right").click(function () {
            $this.find(".this-slider").flickity('next');
            $this.find(".this-slider").trigger("dragMove.flickity");
        });
    }
    $(window).on('ready load resize orientationchange', function () {
        var page_dots_length = $this.find(".flickity-page-dots").length ? $this.find(".flickity-page-dots").outerHeight(true) : 0;
        $this.height($this.find(".item").outerHeight(true) + page_dots_length);
        $this.find(".this-slider").height($this.find(".item").outerHeight(true) + page_dots_length);


        if ($(this).width() <= 350) {
            $this.attr("data-disable-number", $this.attr("data-disable-number-xxs"));
            if ($this.find(".this-slider .item").length <= $this.attr("data-disable-number")) {
                option["draggable"] = false;
                $this.find(".this-slider").flickity('destroy').flickity(option);
            } else {
                option["draggable"] = true;
                option["groupCells"] = eval($this.attr("data-disable-number"));
                $this.find(".this-slider").flickity('destroy').flickity(option);

                $this.find(".this-slider").flickity('selectCell', 1);


            }
        }
        if ($(this).width() > 350 && $(this).width() < 450) {
            $this.attr("data-disable-number", $this.attr("data-disable-number-xs"));
            if ($this.find(".this-slider .item").length <= $this.attr("data-disable-number")) {
                option["draggable"] = false;
                $this.find(".this-slider").flickity('destroy').flickity(option);
            } else {
                option["draggable"] = true;
                option["groupCells"] = eval($this.attr("data-disable-number"));
                $this.find(".this-slider").flickity('destroy').flickity(option);

                $this.find(".this-slider").flickity('selectCell', 1);


            }
        }
        if ($(this).width() > 450 && $(this).width() < 767) {
            $this.attr("data-disable-number", $this.attr("data-disable-number-s"));
            if ($this.find(".this-slider .item").length <= $this.attr("data-disable-number")) {
                option["draggable"] = false;
                $this.find(".this-slider").flickity('destroy').flickity(option);
            } else {
                option["draggable"] = true;
                option["groupCells"] = eval($this.attr("data-disable-number"));
                $this.find(".this-slider").flickity('destroy').flickity(option);

                $this.find(".this-slider").flickity('selectCell', 1);


            }
        }
        if ($(this).width() > 767 && $(this).width() < 991) {
            $this.attr("data-disable-number", $this.attr("data-disable-number-m"));
            if ($this.find(".this-slider .item").length <= $this.attr("data-disable-number")) {
                option["draggable"] = false;
                $this.find(".this-slider").flickity('destroy').flickity(option);
            } else {
                option["draggable"] = true;
                option["groupCells"] = eval($this.attr("data-disable-number"));
                $this.find(".this-slider").flickity('destroy').flickity(option);
            }
        }
        if ($(this).width() >= 992) {
            $this.attr("data-disable-number", $this.attr("data-disable-number-l"));
            if ($this.find(".this-slider .item").length <= $this.attr("data-disable-number")) {
                option["draggable"] = false;
                $this.find(".this-slider").flickity('destroy').flickity(option);
            } else {
                option["draggable"] = true;
                option["groupCells"] = eval($this.attr("data-disable-number"));
                $this.find(".this-slider").flickity('destroy').flickity(option);
            }
        }
        if ($(this).width() > 1200) {
            $this.attr("data-disable-number", $this.attr("data-disable-number-xl"));
            if ($this.find(".this-slider .item").length <= $this.attr("data-disable-number")) {
                option["draggable"] = false;
                $this.find(".this-slider").flickity('destroy').flickity(option);
            } else {
                option["draggable"] = true;
                option["groupCells"] = eval($this.attr("data-disable-number"));
                $this.find(".this-slider").flickity('destroy').flickity(option);
            }

        }
    });

});

$(".timer-slider-left .this-slider").on( 'select.flickity', function() {
    // set selected nav cell
    $('.nav-slider-main').find('.is-nav-selected').removeClass('is-nav-selected');
    var $selected = $('.nav-slider-main .item').eq($(this).find(".is-selected").index())
        .addClass('is-nav-selected');
    // scroll nav
    var scrollY = $selected.position().top + $('.nav-slider .this-slider').scrollTop() - ( $('.nav-slider .this-slider').height() + $('.nav-slider-main .item').height() ) / 2.43;
    $('.nav-slider .this-slider').animate({
        scrollTop: scrollY
    });
});
$('.nav-slider').on( 'click', '.item', function( event ) {
    var index = $( event.currentTarget ).index();
    $('.timer-slider-left .this-slider').flickity( 'select', index );
});
$('.nav-slider').on( 'click', '.chevron-up', function( event ) {
    var index = $( event.currentTarget ).index();
    $('.timer-slider-left .this-slider').flickity( 'previous' );
});
$('.nav-slider').on( 'click', '.chevron-down', function( event ) {
    var index = $( event.currentTarget ).index();
    $('.timer-slider-left .this-slider').flickity( 'next' );
    console.log("asf");
});
$('[data-slider][data-timer-set]').each(function (i,container) {
    var $this = $(this);
    var time = 5;
    var $bar,
        $slider,
        isPause,
        tick,
        percentTime;
    var $container = $(container);
    var $slider = $container.find('.this-slider');
    var flkty = $slider.data('flickity');
    var selectedIndex = flkty.selectedIndex;

    var slideCount = flkty.slides.length;
    // var $pagers = $container.find('.gallery__page-dots');

    // for (i = 0; i < slideCount; i++) {
    //     $pagers.append('<li class="gallery__page-dot-item"></li>');
    // }

    // var $pager = $pagers.find('li');

    // var $caption = $container.find('.gallery__caption .image-caption');

    $slider.on( 'select.flickity', function() {
        // set image caption using img's alt
        // $caption.text( flkty.selectedElement.children[0].alt );
        // $pager.filter('.is-selected').removeClass('is-selected');
        // $pager.eq(flkty.selectedIndex).addClass('is-selected');
    });

    // $pagers.on( 'click', 'li', function() {
    //     var index = $(this).index();
    //     resetProgressbar();
    //     $slider.flickity( 'select', index );
    //     startProgressbar();
    // });

    // previous
    var $prev = $container.find('.prev');
    $prev.on( 'click', function() {
        resetProgressbar();
        $slider.flickity('previous');
        startProgressbar();
    });
    // next
    var $next = $container.find('.next');
    $next.on( 'click', function() {
        resetProgressbar();
        $slider.flickity('next');
        startProgressbar();
    });

    $bar = $container.find('[data-timer-slider] span');

    $slider.parents(".pause-timer").on({
        mouseenter: function() {
            isPause = true;
        },
        mouseleave: function() {
            isPause = false;
        }
    })

    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        isPause = false;
        tick = setInterval(interval, 12);
    }

    function interval() {
        if(isPause === false) {
            percentTime += 1 / (time+0.1);
            $bar.css({
                width: percentTime+"%"
            });
            if(percentTime >= 100) {
                $slider.flickity('next', true);
                startProgressbar();
            }
        }
    }


    function resetProgressbar() {
        $bar.css({
            width: 0+'%'
        });
        clearTimeout(tick);
    }

    startProgressbar();
});