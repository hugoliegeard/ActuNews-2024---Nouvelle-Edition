(function ($) {
	"use strict";

/*===========================================
	=           Preloader       =
=============================================*/
function preloader() {
	$('#preloader').delay(0).fadeOut();
};

$(window).on('load', function () {
	preloader();
	mainSlider();
	wowAnimation();
});


/*===========================================
	=            Mobile Menu      =
=============================================*/
//SubMenu Dropdown Toggle
if ($('.tgmenu__wrap li.menu-item-has-children ul').length) {
	$('.tgmenu__wrap .navigation li.menu-item-has-children').append('<div class="dropdown-btn"><span class="plus-line"></span></div>');
}

//Mobile Nav Hide Show
if ($('.tgmobile__menu').length) {

	var mobileMenuContent = $('.tgmenu__wrap .tgmenu__main-menu').html();
	$('.tgmobile__menu .tgmobile__menu-box .tgmobile__menu-outer').append(mobileMenuContent);

	//Dropdown Button
	$('.tgmobile__menu li.menu-item-has-children .dropdown-btn').on('click', function () {
		$(this).toggleClass('open');
		$(this).prev('ul').slideToggle(300);
	});
	//Menu Toggle Btn
	$('.mobile-nav-toggler').on('click', function () {
		$('body').addClass('mobile-menu-visible');
	});

	//Menu Toggle Btn
	$('.tgmobile__menu-backdrop, .tgmobile__menu .close-btn').on('click', function () {
		$('body').removeClass('mobile-menu-visible');
	});
}


/*===========================================
	=          Data Background       =
=============================================*/
$("[data-background]").each(function () {
	$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
})

/*===========================================
	=           Data Color             =
=============================================*/
$("[data-bg-color]").each(function () {
	$(this).css("background-color", $(this).attr("data-bg-color"));
});


/*===========================================
	=     Menu sticky & Scroll to top      =
=============================================*/
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 350) {
		$("#sticky-header").removeClass("sticky-menu");
		$('.scroll-to-target').removeClass('open');
        $("#header-fixed-height").removeClass("active-height");

	} else {
		$("#sticky-header").addClass("sticky-menu");
		$('.scroll-to-target').addClass('open');
        $("#header-fixed-height").addClass("active-height");
	}
});


/*===========================================
	=              Scroll Up         =
=============================================*/
if ($('.scroll-to-target').length) {
  $(".scroll-to-target").on('click', function () {
    var target = $(this).attr('data-target');
    // animate
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 1000);

  });
}


/*===========================================
	=            OffCanvas Active     =
=============================================*/
$('.offcanvas-toggle a').on('click', function () {
	$('body').addClass('offCanvas__menu-visible');
	return false;
});

$('.offCanvas__overlay, .offCanvas__toggle').on('click', function () {
	$('body').removeClass('offCanvas__menu-visible');
});


/*===========================================
	=        Search Active 	       =
=============================================*/
$('.header-search > a').on('click', function () {
	$('.header__top-search').slideToggle(400);
	return false;
});

$('.header-search > a').on('click', function () {
	$(this).find('i').toggleClass('fa-times');
	return false;
});


// dark light mode toggler
function tg_theme_toggler() {

    $('.switcher__mode, .switcher__btn').on("click", function () {
        toggleTheme();
    });

    // set toggle theme scheme
    function tg_set_scheme(tg_theme) {
        localStorage.setItem('tg_theme_scheme', tg_theme);
        document.documentElement.setAttribute("tg-theme", tg_theme);
    }

    // toggle theme scheme
    function toggleTheme() {
        if (localStorage.getItem('tg_theme_scheme') === 'dark') {
            tg_set_scheme('light');
        } else {
            tg_set_scheme('dark');
        }
    }

    // set the first theme scheme
    function tg_init_theme() {
        if (localStorage.getItem('tg_theme_scheme') === 'dark') {
            tg_set_scheme('dark');
            document.querySelector('.switcher__mode, .switcher__btn').checked = true;
        } else {
            tg_set_scheme('light');
            document.querySelector('.switcher__mode, .switcher__btn').checked = false;
        }
    }
    tg_init_theme();
}
if ($(".switcher__mode, .switcher__btn").length > 0) {
    tg_theme_toggler();
}


/*===========================================
	=        LoadMore Active        =
=============================================*/
$(".latest__post-wrap .latest__post-item").slice(0, 6).css('display', 'flex');
$("#loadMore").on("click", function(e){
    e.preventDefault();
    $(".latest__post-item:hidden").slice(0, 2).slideDown(200, function () {
        $(this).css('display', 'flex');
    });
    if($(".latest__post-item:hidden").length == 0) {
        $("#loadMore").text("No More Post").addClass("noContent");
    }
});

$(".latest__post-wrap .latest__post-item-two").slice(0, 5).css('display', 'block');
$("#loadMore").on("click", function(e){
    e.preventDefault();
    $(".latest__post-item-two:hidden").slice(0, 2).slideDown(200, function () {
        $(this).css('display', 'block');
    });
    if($(".latest__post-item-two:hidden").length == 0) {
        $("#loadMore").text("No More Post").addClass("noContent");
    }
});

$(".minimal__post-wrapper .minimal__post-item").slice(0, 9).css('display', 'block');
$("#loadMore").on("click", function(e){
    e.preventDefault();
    $(".minimal__post-item:hidden").slice(0, 3).slideDown(200, function () {
        $(this).css('display', 'block');
    });
    if($(".minimal__post-item:hidden").length == 0) {
        $("#loadMore").text("No More Post").addClass("noContent");
    }
});


/*===========================================
	=        Third Slider Active       =
=============================================*/
function mainSlider() {
	$('.slider-active').slick({
		autoplay: false,
		autoplaySpeed: 10000,
		dots: true,
		fade: true,
		arrows: false,
		responsive: [
			{
                breakpoint: 767,
                settings: {
                    dots: false,
                    arrows: false
                }
            },
		]
	})
	.slickAnimation();
}


/*===========================================
	=    Slider Trending Active    =
=============================================*/
$('.tgslider__trending-active').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    vertical: true,
    arrows: false,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                dots: false,
                arrows: false
            }
        },
    ]
})


/*===========================================
	=        TG Slider Active    =
=============================================*/
$('.tgslider__active').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    dots: false,
    arrows: true,
    slidesToShow: 1,
	slidesToScroll: 1,
    appendArrows: '.tgslider__nav',
    prevArrow: '<button type="button" class="slick-prev"><i class="far fa-long-arrow-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="far fa-long-arrow-right"></i></button>',
    responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
	]
})
.slickAnimation();


/*===========================================
	=        Instagram Active        =
=============================================*/
var instagramSwiper = new Swiper('.instagram-active', {
    // Optional parameters
    loop: false,
    slidesPerView: 6,
    spaceBetween: 0,
    autoplay: {
        delay: 3500,
        disableOnInteraction: true,
    },
    breakpoints: {
        '1500': {
            slidesPerView: 6,
        },
        '1200': {
            slidesPerView: 5,
        },
        '992': {
            slidesPerView: 4,
        },
        '768': {
            slidesPerView: 4,
        },
        '576': {
            slidesPerView: 3,
        },
        '0': {
            slidesPerView: 3,
        },
    },
});


/*===========================================
	=        Trending Active        =
=============================================*/
var trendSwiper = new Swiper('.trending-active', {
    // Optional parameters
    loop: true,
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
        delay: 3500,
        disableOnInteraction: true,
    },
    breakpoints: {
        '1500': {
            slidesPerView: 4,
        },
        '1200': {
            slidesPerView: 4,
        },
        '992': {
            slidesPerView: 3,
        },
        '768': {
            slidesPerView: 2,
        },
        '576': {
            slidesPerView: 1,
        },
        '0': {
            slidesPerView: 1,
        },
    },
});


/*===========================================
	=         Popular Active        =
=============================================*/
var popularSwiper = new Swiper('.popular-active', {
    // Optional parameters
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,

    breakpoints: {
        '1500': {
            slidesPerView: 3,
        },
        '1200': {
            slidesPerView: 3,
        },
        '992': {
            slidesPerView: 2,
        },
        '768': {
            slidesPerView: 2,
        },
        '576': {
            slidesPerView: 1,
        },
        '0': {
            slidesPerView: 1,
        },
    },
});


/*===========================================
	=          HandPicked Active       =
=============================================*/
var handSwiper = new Swiper('.handpicked-active', {
    // Optional parameters
    loop: true,
    slidesPerView: 6,
    spaceBetween: 50,
    centerMode: true,
    breakpoints: {
        '1700': {
            slidesPerView: 6,
        },
        '1600': {
            slidesPerView: 5,
        },
        '1200': {
            slidesPerView: 5,
            spaceBetween: 30,
        },
        '992': {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        '768': {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        '576': {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        '0': {
            slidesPerView: 1,
            spaceBetween: 30,
        },
    },
});

/*===========================================
	=         sidePost Active         =
=============================================*/
$('.sidePost-active').slick({
	dots: true,
	infinite: true,
	speed: 1000,
	autoplay: true,
	arrows: false,
	slidesToShow: 1,
	slidesToScroll: 1,
});

/*===========================================
	=       sideInstagram Active         =
=============================================*/
var sideInstaSwiper = new Swiper('.sidebarInsta-active', {
    // Optional parameters
    loop: true,
    slidesPerView: 4,
    spaceBetween: 15,
    centerMode: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: true,
    },
    breakpoints: {
        '1400': {
            slidesPerView: 4,
        },
        '1200': {
            slidesPerView: 4,
        },
        '992': {
            slidesPerView: 4,
        },
        '768': {
            slidesPerView: 4,
        },
        '576': {
            slidesPerView: 4,
        },
        '0': {
            slidesPerView: 4,
        },
    },
});


/*===========================================
	=       sideInstagram Active         =
=============================================*/
var sideInsta2Swiper = new Swiper('.sidebarInsta-active-2', {
    // Optional parameters
    loop: true,
    slidesPerView: 4,
    spaceBetween: 15,
    centerMode: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: true,
    },
    breakpoints: {
        '1400': {
            slidesPerView: 4,
        },
        '1200': {
            slidesPerView: 4,
        },
        '992': {
            slidesPerView: 4,
        },
        '768': {
            slidesPerView: 4,
        },
        '576': {
            slidesPerView: 4,
        },
        '0': {
            slidesPerView: 4,
        },
    },
});


/*===========================================
	=         Marquee Active         =
=============================================*/
if ($(".marquee_mode").length) {
    $('.marquee_mode').marquee({
        speed: 50,
        gap: 0,
        delayBeforeStart: 0,
        direction: 'left',
        duplicated: true,
        pauseOnHover: true,
        startVisible:true,
    });
}


/*===========================================
	=         Magnific Popup         =
=============================================*/
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
		enabled: false
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});


/*===========================================
	=        Isotope Active       =
=============================================*/
$('.minimal__post-wrapper, .adventure__post-wrapper').imagesLoaded(function () {
	// init Isotope
	var $grid = $('.minimal__post-wrapper, .adventure__post-wrapper').isotope({
		itemSelector: '.grid-item',
		percentPosition: true,
		masonry: {
			columnWidth: 1,
		}
	});
	// filter items on button click
	$('.portfolio-menu').on('click', 'button', function () {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
	});

});
//for menu active class
$('.product-license li').on('click', function (event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});


/*===========================================
	=           Wow Active    =
=============================================*/
function wowAnimation() {
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: false,
		live: true
	});
	wow.init();
}


/*===========================================
	=           Side Menu    =
=============================================*/
//SubMenu Dropdown Toggle
if ($('.offCanvas__menu-wrapper li.menu-item-has-children').length) {
	$('.offCanvas__menu-wrapper li.menu-item-has-children').append('<i class="far fa-plus dropdown-icon"></i>');
}
$(".offCanvas__menu-wrapper .dropdown-icon").on('click', function() {
    var $tgMenu = $(this);
    $(this).parent().siblings().find('.sub-menu').slideUp();
    $(this).parent().siblings().find('.dropdown-icon').addClass('fa-plus');
    if($tgMenu.hasClass('fa-plus')) {
        $tgMenu.removeClass('fa-plus').addClass('fa-minus');
    }
    else {
        $tgMenu.removeClass('fa-minus').addClass('fa-plus');
    }
    $tgMenu.prev(".sub-menu").slideToggle();
});


})(jQuery);