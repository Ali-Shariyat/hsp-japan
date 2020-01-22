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
$("[data-open-black-page]").click(function () {
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
            console.log($this.parents(".slider").find(".chevron-left:not(.chevrons-right)"));
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
        if ($(this).width() > 991 && $(this).width() < 1400) {
            $this.attr("data-disable-number", $this.attr("data-disable-number-custom-l"));
            if ($this.find(".this-slider .item").length <= $this.attr("data-disable-number")) {
                option["draggable"] = false;
                $this.find(".this-slider").flickity('destroy').flickity(option);
            } else {
                option["draggable"] = true;
                option["groupCells"] = eval($this.attr("data-disable-number"));
                $this.find(".this-slider").flickity('destroy').flickity(option);
            }

        }
        if ($(this).width() > 1400) {
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

$(".timer-slider-left .this-slider").on('select.flickity', function () {
    // set selected nav cell
    $('.nav-slider-main').find('.is-nav-selected').removeClass('is-nav-selected');
    var $selected = $('.nav-slider-main .item').eq($(this).find(".is-selected").index())
        .addClass('is-nav-selected');
    // scroll nav
    var scrollY = $selected.position().top + $('.nav-slider .this-slider').scrollTop() - ($('.nav-slider .this-slider').height() + $('.nav-slider-main .item').height()) / 2.43;
    $('.nav-slider .this-slider').animate({
        scrollTop: scrollY
    });
});
$('.nav-slider').on('click', '.item', function (event) {
    var index = $(event.currentTarget).index();
    $('.timer-slider-left .this-slider').flickity('select', index);
});
$('.nav-slider').on('click', '.chevron-up', function (event) {
    var index = $(event.currentTarget).index();
    $('.timer-slider-left .this-slider').flickity('previous');
});
$('.nav-slider').on('click', '.chevron-down', function (event) {
    var index = $(event.currentTarget).index();
    $('.timer-slider-left .this-slider').flickity('next');
});


// $('.product-slider-main .this-slider').on("dragStart.flickity dragMove.flickity dragEnd.flickity select.flickity", function (event) {
//     var index = $(this).find(".item.is-selected").index();
//     $(this).parents(".product-slider").find(".product-slider-nav .this-slider .item:not(.eq-stop)").eq(index).addClass("is-selected").siblings(".item").removeClass("is-selected");
//     // $('.timer-slider-left .this-slider').flickity( 'select', index );
// });
// $(document).on("click", '.product-slider .product-slider-nav .this-slider .item:not(.eq-stop)', function (event) {
//     var index = $(this).index();
//     $(this).addClass("is-selected").siblings(".item").removeClass("is-selected");
//     $(this).parents(".product-slider").find(".product-slider-main .this-slider").flickity('select', index);
// });

$('[data-slider][data-timer-set]').each(function (i, container) {
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

    $slider.on('select.flickity', function () {
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
    $prev.on('click', function () {
        resetProgressbar();
        $slider.flickity('previous');
        startProgressbar();
    });
    // next
    var $next = $container.find('.next');
    $next.on('click', function () {
        resetProgressbar();
        $slider.flickity('next');
        startProgressbar();
    });

    $bar = $container.find('[data-timer-slider] span');

    $slider.parents(".pause-timer").on({
        mouseenter: function () {
            isPause = true;
        },
        mouseleave: function () {
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
        if (isPause === false) {
            percentTime += 1 / (time + 0.1);
            $bar.css({
                width: percentTime + "%"
            });
            if (percentTime >= 100) {
                $slider.flickity('next', true);
                startProgressbar();
            }
        }
    }


    function resetProgressbar() {
        $bar.css({
            width: 0 + '%'
        });
        clearTimeout(tick);
    }

    startProgressbar();
});
//==================
// rating
//==================
$(document).on("click", ".rating", function () {
    var check_number = $(this).find(".br-current").attr("data-rating-value") == undefined ? 0 : $(this).find(".br-current").attr("data-rating-value");
    $(this).find("[data-set-rating-number]").text(check_number + "/5");
    console.log($(this).find(".br-current").attr("data-rating-value"));
});
if ($('[data-rating]').length) {
    $('[data-rating]').barrating({
        onSelect: function (t, e, n) {
            $(n.currentTarget).parents(".rating").trigger("click");
        }
    });
}

//==================
//nice number
//==================
if ($('[data-number-spinner]').length) {
    $('[data-number-spinner]').niceNumber({
        autoSize: false,
        autoSizeBuffer: 1,
    });
}
$(document).on("click", ".nice-number", function (e) {
    e.stopPropagation();
});
$(document).on("click", ".product-slider-more-slider a", function (e) {
    $(".slider-pop-up .this-slider .flickity-slider").append($(".product-slider-main .this-slider .flickity-slider").html());
    $(".slider-pop-up .this-slider .flickity-slider").find(".item").removeAttr("style").removeAttr("aria-hidden");
    $(".slider-pop-up .product-slider-nav").find(".item").removeClass("col-xl-12");
    $(".slider-pop-up .this-slider").resize();
    var slider_refresh = function () {
        $(".slider-pop-up .this-slider").resize();
    };
    setTimeout(slider_refresh, 150);
    setTimeout(slider_refresh, 200);
});
$('.slider-pop-up').on('hidden.bs.modal', function (e) {
    $(".slider-pop-up .this-slider .flickity-slider").find(".item").remove();
})
//==================
// tabs click
//==================
$(document).on("click", ".tabs .nav .nav-item", function (e) {
    var $this = $(this);
    $this.addClass("active").siblings(".nav-item").removeClass("active");
    $this.parents(".tabs").find(".tab-content > li").eq($this.index()).addClass("active").siblings("li").removeClass("active");
    e.stopPropagation();
    e.preventDefault();
});
//==================
// vertical slider
//==================
//
$(function () {
    console.log();
    if ($('#va-accordion').length) {
        $('#va-accordion').vaccordion({
            accordionW: "100%",
            accordionH: $(".item-get-height").height() * 2,
            animSpeed: 400,
            animOpacity: 0.7,
            visibleSlices: 2
        });
    }
});

$(document).on("click", "[data-close]", function () {
    var $this = $(this);
    $(this).parents("[data-main-close]").fadeOut();
    setTimeout(function () {
        $this.parents("[data-main-close]").remove();
    }, 800);
});
$(document).on("dblclick", ".va-wrapper", function () {
    setTimeout(function () {
        $('#va-accordion').vaccordion({
            accordionW: "100%",
            accordionH: 440,
            animSpeed: 400,
            animOpacity: 0.7,
            visibleSlices: 2
        });
    }, 1000);
});
$(document).on("click", ".va-container", function () {
    $(".va-wrapper").trigger("dblclick");
});
$(document).on("click", ".va-nav", function (e) {
    e.stopPropagation();
    e.preventDefault();
});
// $(window).on('ready load resize orientationchange', function () {
//     $(".vertical-slider").each(function () {
//         var $this = $(this),
//             find_this_slider = $this.find(".this-vertical-slider");
//         find_this_slider.height(find_this_slider.find(".item").outerHeight(true) * 2)
//     });
//     $(".vertical-slider-chevron").each(function () {
//         $(this, ".chevron-down").click(function () {
//             var $selected_vertical = $('.vertical-slider .item.active:last').next(".item");
//             // scroll nav
//             var scrollY = $selected_vertical.position().top;
//             $('.vertical-slider .this-vertical-slider').animate({
//                 scrollTop: scrollY
//             });
//             $('.vertical-slider .item.active:last').nextAll(".item").slice(0, 2).addClass("active");
//             $('.vertical-slider .item.active:last').prevAll(".item").not($('.vertical-slider .item.active:last').prev(".item")).removeClass("active");
//             console.log(scrollY);
//             // $('.vertical-slider .item.active:last').next(".item").addClass("active");
//             // $('.vertical-slider .item.active:last').next(".item").addClass("active")
//         })
//     })
// })
$(".edit-form").click(function (e) {
    $(this).parents("form").find("[data-switch-disabled]").each(function () {
        if ($(this).hasAttr("disabled")) {
            $(this).removeAttr("disabled");
        } else {
            $(this).attr("disabled", "disabled");
        }
    });
    $(this).addClass("disabled");
    e.stopPropagation();
    e.preventDefault();
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
// $(window).scroll(function () {
//     $("[data-sticky-to-top]").each(function () {
//         $(this).height($(this).find(" [data-sticky-main]").height())
//     });
//     if ($(window).scrollTop() >= $("[data-sticky-to-top]").offset().top) {
//         $("[data-sticky-to-top] [data-sticky-main]").each(function () {
//             $(this).css({
//                 "position": "fixed",
//                 top: 0,
//                 left: $(this).parent().offset().left ,
//                 width:$(this).parent().width()
//             })
//         })
//     }else{
//         $("[data-sticky-to-top] [data-sticky-main]").each(function () {
//             $(this).removeAttr("style")
//         })
//     }
// });
if ($('[data-sticky-to-top]').length) {
    $('[data-sticky-to-top]').stickySidebar({
        topSpacing: 20,
        containerSelector: '[data-sticky-to-top]',
        innerWrapperSelector: '[data-sticky-main]',
    });
}
$(window).on('ready load resize change', function () {
    if ($("[data-scrollbar]").length) {
        $("[data-scrollbar]").each(function () {
            var $this = $(this);
            $this.scrollbar({
                "showArrows": true,
                "scrollx": "advanced",
                "scrolly": "advanced"
            });
        });
    }
});
$("[data-dropdown-sidebar] .dropdown-head").click(function () {
    var $this = $(this);
    if (!$this.hasClass("active")) {
        $this.addClass("active");
        $this.siblings(".dropdown-main").stop().slideDown("normal",function () {
            $(this).css("height","")
        });
    }else{
        $this.removeClass("active");
        $this.siblings(".dropdown-main").stop().slideUp("normal",function () {
            $(this).css("height","")
        });
    }
});
$(document).on("click","[data-open-popup]",function () {
    var $this = $(this),
        $this_find_attr_value = $this.attr("data-open-popup");
    $("[data-popup="+$this_find_attr_value+"]").addClass("active");
});
$(document).on("click","[data-close-btn]",function () {
    var $this = $(this);
    $this.parents("[data-close]").removeClass("active")
});

$("[data-gallery]").each(function () {
    var $this = $(this);
    $this.find("[data-filter]").click(function (e) {
        $(this).parents("[data-close]").find("[data-close-btn]").trigger("click");
        $(this).find("a").addClass("color-white bgc-navy").parent().siblings("li").find("a").removeClass("color-white bgc-navy").addClass("color-black-blur-6");
        $this.find(".gallery-items").isotope({filter: "[data-filtering="+$(this).attr("data-filter")+"]"});
        e.preventDefault();
    });
    $(".gallery-items").isotope({
        itemSelector: '.item',
        masonry: {
            columnWidth: '.grid-sizer'
        }
    })
});
$(".gheart").click(function (e) {
    if (!$(this).hasClass("active")) {
        $(this).addClass("active");
    }else{
        $(this).removeClass("active");
    }
    e.preventDefault();
})
$(window).scroll(function () {
    if ($(window).scrollTop() >= $(".header-big").offset().top) {
        $(".header-big").addClass("active");
    }else{
        $(".header-big").removeClass("active");
    }
});
//==================
// page loader
//==================
$(window).on("load", function () {
    setTimeout(function () {
        if ($(".loading")[0]) {
            $(".loading").fadeOut();
        }
    }, 150);
});