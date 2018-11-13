import '../components/rmAccentAndPopovers';
import '../components/popover';
import '../components/answerPopover';
import '../components/rmAnswerPopovers';
import '../components/emojiDropup';
import '../components/pickEmoji';
import '../components/stateToggler';
import '../components/rmDropdown';

const RecensionMobileSlider = {
	slider: $('.recension-mobile-slider'),
	init() {
		this.slider.slick({
			slide: '.item',
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			autoplay: false,
			dots: false,
			centerMode: true,
			centerPadding: '20%',
			focusOnSelect: true,
			prevArrow: '<button type="button" class="slick-prev"><span class="icon-arrow-light-left"></span></button>',
			nextArrow: '<button type="button" class="slick-next"><span class="icon-arrow-light-right"></span></button>',
			responsive: [
				{
					breakpoint: 480,
					settings: {
						centerPadding: '30px'
					}
				},
			]
		});
	},
	destroy() {
		const isInit = this.slider.hasClass('slick-initialized');
		isInit && this.slider.slick('unslick');
	},
};
const MobileSerialNewsSlider = {
	slider: $('.mobile-news-slider'),
	init() {
		this.slider.slick({
			slide: 'li',
			slidesToShow: 2,
			slidesToScroll: 1,
			arrows: false,
			focusOnSelect: true,
			variableWidth: true,
			autoplay: false,
			dots: false,
			infinite: false,
			prevArrow: '<button type="button" class="slick-prev"><span class="icon-arrow-light-left"></span></button>',
			nextArrow: '<button type="button" class="slick-next"><span class="icon-arrow-light-right"></span></button>',
		});
	},
	destroy() {
		const isInit = this.slider.hasClass('slick-initialized');
		isInit && this.slider.slick('unslick');
	},
};

const SliderOtherSerials = {
	slider: $('.slider-other-serials'),
	init() {
		if (this.slider.length) {
			this.slider.owlCarousel({
				loop: true,
				slideBy: 5,
				items: 5,
				margin: 0,
				responsiveClass: true,
				nav: true,
				navSpeed: 200,
				fluidSpeed: false,
				navText: ['<span class="icon-arrow-light-left"></span>','<span class="icon-arrow-light-right"></span>'],
				responsive : {
					0 : {
						slideBy: 1,
					},
					768 : {
						slideBy: 4,
						items: 4,
					},
					1025 : {
						slideBy: 5,
						items: 5,
					}
				}
			});
		}
	},
	destroy() {
		const isInit = this.slider.hasClass('owl-loaded');
		isInit && this.slider.owlCarousel('destroy');
	},
};

function checkCommentsAncor(){
	if(window.location.hash.split('comment-').length = 2){
		waitCommentLoadAncor();
	}
}
function waitCommentLoadAncor(){
	var comm = jQuery(window.location.hash);
	if(comm.length){
		jQuery('html,body').animate({
			scrollTop: comm.offset().top - 130
		}, 300, function(){
			comm.closest('.commsone').addClass('focused-comment');

			var listener = function (event) {
				var top = comm.offset().top,
					sctop = jQuery(window).scrollTop(),
					winh = jQuery(window).height(),
					y = top - sctop - winh;

				if (y > 0 || -y > winh){
					comm.closest('.commsone').removeClass('focused-comment');
					window.removeEventListener('scroll', listener, false);
				}
			};
			window.addEventListener('scroll', listener, false);

		});
	}else{
		setTimeout(function(){
			waitCommentLoadAncor();
		}, 300);
	}
}

function getScrollbarWidth() {
	var outer = document.createElement("div");
	outer.style.visibility = "hidden";
	outer.style.width = "100px";
	outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

	document.body.appendChild(outer);

	var widthNoScroll = outer.offsetWidth;
	// force scrollbars
	outer.style.overflow = "scroll";

	// add innerdiv
	var inner = document.createElement("div");
	inner.style.width = "100%";
	outer.appendChild(inner);

	var widthWithScroll = inner.offsetWidth;

	// remove divs
	outer.parentNode.removeChild(outer);

	return widthNoScroll - widthWithScroll;
}

const toggleLinkText = (isActive, firstCb, secondCb) => {
	if (isActive) {
		typeof firstCb === 'function' && firstCb && firstCb();
	} else {
		typeof secondCb === 'function' && secondCb && secondCb();
	}
};

// const $ = jQuery.noConflict();

const throttle = (type, name, obj) => {
	let running = false;
	const object = obj || window;
	const func = () => {
		if (running) {
			return;
		}
		running = true;
		requestAnimationFrame(() => {
			object.dispatchEvent(new CustomEvent(name));
			running = false;
		});
	};

	object.addEventListener(type, func);
};

function deviceType() {
	return window
		.getComputedStyle(document.querySelector('body'), '::before')
		.getPropertyValue('content').replace(/'/g, '').replace(/"/g, '');
}
function checkDeviceType(MQ, isMobile, isTablet, isDesktop, arrCbs) {
	if (MQ === 'desktop' && isDesktop) {
		arrCbs[0]();
	} else if (MQ === 'tablet' && isTablet) {
		arrCbs[1]();
	} else if (MQ === 'mobile' && isMobile) {
		arrCbs[2]();
	}
	//console.log('checkDeviceType:' + MQ);
}

function staticInit(mq, firstFunc, otherFunc, secFunc) {
	if (mq === 'desktop') {
		firstFunc();
	}  else if (mq === 'tablet') {
		otherFunc();
	} else if (mq === 'mobile') {
		secFunc();
	}
	// console.log('staticInit:' + mq);
}

(() => {
	const $window = $(window);
	const $document = $(document);
	const $body = $('body');
	const $html =  $('html');
	const $mobileNavBtn = $('#show-mobile-menu');
	const $mobileNav = $('#mobile-nav');
	const $mobileUserNav = $('#mobile-user-nav');
	const $mobileUserNavBtn = $('.login-wget.logined > .info');
	const $searchWrap = $('#ajax-s-container');
	let scrollTopOffset = 64;
	let scrollTopOffsetSerial = 130;

	const Android = (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;


	class App {
		constructor() {
			this._sliderFrontSlider = $('.front-slider');
			this._mostAnticipatedSlider = $('.most-anticipated-slider');
			this._previewSlider = $('.preview-slider');
			this._newSlider = $('.new-slider');
			this._frontReviewsSlider = $('.front-reviews-slider');
			this._serialPhotoSlider = $('.serial-photo-slider');
			this._serialReviewsSlider = $('.serial-reviews-slider');
			this._articleFullSlider = $('.article-full-slider');
			this._articleFullSliderThumb = $('.article-full-slider-thump');
			this._articlePromoSlider = $('.article-promo-slider');
		}

		initSlickSliders = () => {
			this._sliderFrontSlider.slick({
				slide: '.item',
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				autoplay: true,
				autoplaySpeed: 4000,
				dots: true,
				variableWidth: false,
				adaptiveHeight: true,
				infinite: true,
				prevArrow: '<button type="button" class="slick-prev"><span class="icon-arrow-light-left"></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span class="icon-arrow-light-right"></span></button>',
				responsive: [
					{
						breakpoint: 767,
						settings: {
							slidesToScroll: 1,
							arrows: false,
						}
					},
				]
			});
			this._mostAnticipatedSlider.slick({
				slide: '.item',
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				autoplay: true,
				autoplaySpeed: 5000,
				dots: false,
				prevArrow: '<button type="button" class="slick-prev"><span class="icon-arrow-light-left"></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span class="icon-arrow-light-right"></span></button>'
			});
			this._previewSlider.slick({
				slide: '.item',
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: true,
				autoplay: false,
				dots: false,
				appendArrows: '#preview-slider-arrows',
				prevArrow: '<button type="button" class="slick-prev"><span class="icon-arrow-light-left"></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span class="icon-arrow-light-right"></span></button>',
				responsive: [
					{
						breakpoint: 767,
						settings: {
							arrows: false,
							focusOnSelect: true,
							variableWidth: true,
						}
					},
				]
			});
			this._newSlider.slick({
				slide: '.item',
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: true,
				autoplay: false,
				dots: false,
				appendArrows: '#new-slider-arrows',
				prevArrow: '<button type="button" class="slick-prev"><span class="icon-arrow-light-left"></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span class="icon-arrow-light-right"></span></button>',
				responsive: [
					{
						breakpoint: 767,
						settings: {
							arrows: false,
							focusOnSelect: true,
							variableWidth: true,
						}
					},
				]
			});

			this._frontReviewsSlider.slick({
				slide: '.item',
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				autoplay: false,
				dots: false,
				prevArrow: '<button type="button" class="slick-prev"><span class="icon-arrow-light-left"></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span class="icon-arrow-light-right"></span></button>',
				responsive: [
					{
						breakpoint: 767,
						settings: {
							adaptiveHeight: true
						}
					},
				]
			});
			this._serialReviewsSlider.slick({
				slide: '.item',
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: true,
				variableWidth: false,
				//adaptiveHeight: true,
				infinite: true,
				prevArrow: '<button type="button" class="slick-prev"><span class="icon-arrow-light-left"></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span class="icon-arrow-light-right"></span></button>',
				responsive: [
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},
				]
			});

			this._articleFullSlider.on('init', function (event, slick, currentSlide, nextSlide) {
				const $sliderNumWrapper = $(this).parents('.article-block-full-slider').find('.slider-items-num');
				const $totalSelector = $sliderNumWrapper.find('.all');
				const $currentSelector = $sliderNumWrapper.find('.current');
				let i = (currentSlide ? currentSlide : 0) + 1;
				$totalSelector.text(slick.slideCount);
				$currentSelector.text(i);
			});
			this._articleFullSlider.slick({
				slide: '.item',
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				speed: 200,
				fade: true,
				cssEase: 'linear',
				variableWidth: false,
				asNavFor: '.article-full-slider-thump',
				//asNavFor: this._articleFullSliderThumb,
				infinite: true,
				prevArrow: '<button type="button" class="slick-prev"><span class="icon-arrow-light-left"></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span class="icon-arrow-light-right"></span></button>',
				responsive: [
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},
				]
			});
			this._articleFullSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
				const $sliderNumWrapper = $(this).parents('.article-block-full-slider').find('.slider-items-num');
				const $totalSelector = $sliderNumWrapper.find('.all');
				const $currentSelector = $sliderNumWrapper.find('.current');
				let i = (currentSlide ? currentSlide : 0) + 1;
				$totalSelector.text(slick.slideCount);
				$currentSelector.text(i);
			});
			this._articleFullSliderThumb.slick({
				slide: '.item',
				slidesToShow: 7,
				slidesToScroll: 1,
				arrows: false,
				asNavFor: '.article-full-slider',
				//asNavFor: this._articleFullSlider,
        speed: 200,
				infinite: true,
				centerMode: true,
				focusOnSelect: true,
				prevArrow: '<button type="button" class="slick-prev"><span class="icon-arrow-light-left"></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span class="icon-arrow-light-right"></span></button>',
				responsive: [
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1
						}
					},
				]
			});

			this._articlePromoSlider.slick({
				slide: '.item',
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				speed: 500,
				fade: true,
				cssEase: 'linear',
				variableWidth: false,
				infinite: true,
				prevArrow: '<button type="button" class="slick-prev"><span class="icon-arrow-light-left"></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span class="icon-arrow-light-right"></span></button>',
				responsive: [
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},
				]
			});

			if (this._serialPhotoSlider.length) {
				this._serialPhotoSlider.owlCarousel({
					loop: true,
					slideBy: 2,
					margin: 0,
					responsiveClass: true,
					autoWidth: true,
					nav: true,
					navText: ['<span class="icon-arrow-light-left"></span>','<span class="icon-arrow-light-right"></span>'],
					responsive : {
						0 : {
							slideBy: 1,
						},
						768 : {
							slideBy: 2,
						}
					}
				});
			}
		};

		// mobileNavBtnToggle = e => {
		// 	e.preventDefault();
		// 	console.log(this);
		// 	$mobileNavBtn.toggleClass('is-active');
		// };

		init = () => {
			const self = this;

			if (Android) {
				$('html').addClass('android');
			}


			function cookieNotice(modalSelector, modalCloseSelector) {
				const $modal    = $(modalSelector);
				const $closeBtn = $modal.find(modalCloseSelector);
				
				// console.log($.cookie('sjdg63vba'));
				if (!$.cookie('sjdg63vba')) {
					$modal.addClass('is-open');
				}

				function handler() {
					const newCookie = $.cookie('sjdg63vba', 'jsdghsvbg%@453', { expires: 365 });
					// console.log($.cookie('sjdg63vba'));


					if (newCookie) {
						$modal.removeClass('is-open');
					}
				}

				$closeBtn.on('click', handler);
			}

			cookieNotice('.js-modal', '.js-modal-close');

			this.initUserMmenu();

			this.initSlickSliders();

			this.searchField();

			this.searchBlockField();

			this.customScroll();

			this.tabsLoginEvents();

			this.serialRating();
			this.serialCommentRating();

			this.scrollToTop();

			this.scrollToId();

			this.scrollToComments();

			this.reviewRatingSvg();
			this.recensionQuoteRatingSvg();

			this.selectCustomeScroll();

			this.initMmenu();

			this.collapseMobileFilter();

			this.openSerialGallery();

			this.modalsEvents();

			this.playCollectionTrailer();

			this.popoverEvents();

			this.videoTabsEvents();

			$(function () {
				$('[data-toggle="tooltip"]').tooltip();
				$('[data-toggle="tooltip-error"]').tooltip({
					template: '<div class="tooltip error" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
				});
				//$('[data-toggle="tooltip-error"]').tooltip('show');
			});

			/*page Serial - scroll to News*/
			this.scrollToSerialNews();

			$(".collapse")
				.filter(function(ix,el){
					// return only the ones with min-height
					return $(el).css("min-height");
				})
				.each(function(ix, el){
					var  $el = $(el)
						// remember the original min-height
						,minHeight = $el.css("min-height");

					$el.on("hidden.bs.collapse", function(){

						$el.removeClass("collapse")
							.css({
								"overflow": "hidden"
								,"height": minHeight
							})
					});

					// collapse element on load if it has the class .collapsed
					if ($el.hasClass("collapsed"))
						$el.collapse();
				});

			$('.collapse-serial-description-btn').on('click', this.handleClickOnLinkText);
			$('.btn-collapse-table > a').on('click', this.handleClickOnLinkText);

			$('.article-news .article-body table').cardtable();

		};

		handleLoad = () => {};

		switchToMobile = () => {
			// console.log('switchToMobile: Mobile');
			$document.foundation({
				"magellan-expedition": {
					active_class: 'active',
					threshold: -52,
					destination_threshold: 52,
					throttle_delay: 50,
					fixed_top: 52,
					offset_by_height: true
				}
			});
			$(document).ready(function(){
				if (window.location.hash && jQuery(window.location.hash).length) {
					$('html,body').animate({
						scrollTop: $(window.location.hash).offset().top - 126
					}, 500);
				}else{
					checkCommentsAncor();
				}
			});

			scrollTopOffset = 52;
			scrollTopOffsetSerial = 126;
			RecensionMobileSlider.init();
			//MobileSerialNewsSlider.init();

			SliderOtherSerials.destroy();
		};

		switchToTablet = () => {
			// console.log('switchToTablet: Tablet');
			$document.foundation({
				"magellan-expedition": {
					active_class: 'active',
					threshold: -52,
					destination_threshold: 52,
					throttle_delay: 50,
					fixed_top: 52,
					offset_by_height: true
				}
			});
			$(document).ready(function(){
				if (window.location.hash && jQuery(window.location.hash).length) {
					$('html,body').animate({
						scrollTop: $(window.location.hash).offset().top - 118
					}, 500);
				}else{
					checkCommentsAncor()
				}
			});

			scrollTopOffset = 52;
			scrollTopOffsetSerial = 118;
			RecensionMobileSlider.destroy();
			//MobileSerialNewsSlider.destroy();

			this.reviewsLinkVisible(220);

			SliderOtherSerials.init();
		};

		switchToDesktop = () => {
			// console.log('switchToDesktop: Desktop');
			$document.foundation({
				"magellan-expedition": {
					active_class: 'active', // specify the class used for active sections
					threshold: -64, // how many pixels until the magellan bar sticks, 0 = auto
					destination_threshold: 64, // pixels from the top of destination for it to be considered active
					throttle_delay: 50, // calculation throttling to increase framerate
					fixed_top: 64, // top distance in pixels assigend to the fixed element on scroll
					offset_by_height: true // whether to offset the destination by the expedition height. Usually you want this to be true, unless your expedition is on the side.
				}
			});
			$(document).ready(function(){
				if (window.location.hash && jQuery(window.location.hash).length) {
					$(window).load(function() {
						if (window.location.hash === '#comments') {
							$('html,body').animate({
								scrollTop: $(window.location.hash).offset().top - 64
							}, 500);
						} else {
							$('html,body').animate({
								scrollTop: $(window.location.hash).offset().top - 130
							}, 500);
						}
					});
				}else{
					checkCommentsAncor();
				}
			});

			$('.article-info-links .field-reviews').on('click', function (e) {
				e.preventDefault();

			});

			RecensionMobileSlider.destroy();
			//MobileSerialNewsSlider.destroy();
			this.stickyBlockInParent($('.block-sticky-aside'));

			this.reviewsLinkVisible(176);

			SliderOtherSerials.init();

      this.telegramDropdown();
		};

		handleResize = () => {
			//console.log('resize');
			$('.cuScroll').mCustomScrollbar("update");
			$document.foundation('magellan-expedition', 'reflow');
		};

		destroy = () => {};

		handleScroll = () => {};

		scrollToTop = () => {
			const $sctollToTop = $( ".scrollToTop" );

			$(window).scroll(function(){
				if ($(this).scrollTop() > 300) {
					$('.scrollToTop').fadeIn();
				} else {
					$('.scrollToTop').fadeOut();
				}
			});

			//Click event to scroll to top
			$sctollToTop.click(function(e){
				e.preventDefault();
				$('html, body').animate({scrollTop : 0},800);
				return false;
			});
		};

		scrollToId = () => {
			const $el = $('.jsScrollTo');

			$el.click(function(e){
				e.preventDefault();

				const $scrollTo = $(this).attr('href');

				$('html, body').animate({
					scrollTop: $($scrollTo).offset().top - scrollTopOffset
				}, 400);

				// $(window).load(function() {
				// 	console.log($scrollTo);
				// });
				return false;
			});
		};

		scrollToSerialNews = () => {
			$('.page-serial .col-right .block-small-news .box-btn > a').click(function(e){
				e.preventDefault();

				const $scrollTo = $(this).attr('href');

				//console.log($scrollTo);

				$('html, body').animate({
					scrollTop: $('#serial-news').offset().top - scrollTopOffsetSerial
				}, 400);

				return false;
			});
		};

		scrollToComments = () => {
			const $el = $('.page-article .article-info-links .field-reviews');

			$el.click(function(e){
				e.preventDefault(scrollTopOffset);

				const $scrollTo = $(this).attr('href');

				$('html, body').animate({
					scrollTop: $($scrollTo).offset().top - scrollTopOffset
				}, 400);
				return false;
			});
		};

		initMmenu = () => {
			if ($('#mobile-nav').length) {
				$mobileNav.mmenu(
					{
						navbar: {
							add: false,
							title: "Меню"
						},
						"extensions": [
							"effect-panels-slide-100",
							"effect-listitems-slide",
							"front"
						]
					},
					{
						clone: false,
						offCanvas: {
							pageSelector: ".wrapper",
							"position": "left"
						}
					}
				);

				const mobAPI = $mobileNav.data( "mmenu" );

				$mobileNavBtn.on('click', mobAPI.open);
				$document.on('click', '#show-mobile-menu', mobAPI.close);

				mobAPI.bind('open', function () {
					$mobileNavBtn.addClass('is-active');
				});
				mobAPI.bind('close', function () {
					$mobileNavBtn.removeClass('is-active');
				});

			}
		};

		initUserMmenu = () => {
			if ($('#mobile-user-nav').length) {
				$mobileUserNav.mmenu({
					navbar: {
						title: null
					},
					"extensions": [
						"popup",
					],
					"dropdown": true,
					"autoHeight": true,
				});
				//mobile-user-nav
				const API = $mobileUserNav.data( "mmenu" );

				API.bind('open', function () {
					$('html').addClass('mobile-user-nav-opened');
				});
				API.bind('close', function () {
					$('html').removeClass('mobile-user-nav-opened');
				});

				// $('a.mobile-user-nav').mouseover(function () {
				// 	$(this).trigger('click');
				// });
			}

		};

		searchField = () => {
			const formInput = $('#ajax-s-container form .ajax-inp');
			const formClose = $('#ajax-s-container .close-ajax-search');

			formInput.on('focus', function() {
				$searchWrap.addClass('focused');
			});

			formInput.on('blur', function() {
				//$searchWrap.removeClass('focused');
			});

			formClose.click(function () {
				formInput.val('');
				$searchWrap.removeClass('focused');
				//console.log('clear');
			});

			$(document).click( function(event){
				if (($(event.target).closest('.block-ajax-search').length))
					return;
				$searchWrap.removeClass('focused');
				formInput.val('');
				event.stopPropagation();
			});

		};

		searchBlockField = () => {
			const formInput = $('#block-ajax-search form .ajax-inp');
			const searchContainer = $('#block-ajax-search');

			formInput.on('focus', function() {
				searchContainer.addClass('focused');
			});

			formInput.on('blur', function() {
				searchContainer.removeClass('focused');
			});
		};

		serialRating = () => {
			$('.serial-item-rating').each(function() {
				var starbox = $(this);
				starbox.starbox({
					average: starbox.attr('data-start-value'),
					changeable: starbox.hasClass('unchangeable') ? false : starbox.hasClass('clickonce') ? 'once' : true,
					ghosting: true,
					autoUpdateAverage: true,
					buttons: 10,
					stars: 10
				});
			});
		};

		serialCommentRating = () => {
			const ratingInput = $('#comment-rating');
			const currentUserRating = $('#current-user-rating');
			$('.serial-comment-rating').each(function() {
				var starbox = $(this);
				starbox.starbox({
					average: starbox.attr('data-start-value'),
					changeable: starbox.hasClass('unchangeable') ? false : starbox.hasClass('clickonce') ? 'once' : true,
					ghosting: true,
					autoUpdateAverage: true,
					buttons: 10,
					stars: 10
				}).bind('starbox-value-changed', function(event, value) {
					ratingInput.val(value);
					currentUserRating.text(value * 10);
				});
				// .bind('starbox-value-moved', function(event, value) {
				// 	console.log(value);
				// 	ratingInput.val(value);
				// 	currentUserRating.text(value * 10);
				// })
			});
		};

		reviewRatingSvg = () => {
			$('.user-review-rating').circliful({
				pointSize: 10,
				animation: 0,
				animationStep: 0,
				foregroundBorderWidth: 8,
				backgroundBorderWidth: 3,
				foregroundColor: '#0083da',
				backgroundColor: '#0083da',
				fontColor: '#0083da',
				replacePercentageByText: '',
				//percentageY: 10,
				//textY: 10,
			});
		};

		recensionQuoteRatingSvg = () => {
			$('.recension-quote-rating').circliful({
				pointSize: 10,
				animation: 0,
				animationStep: 0,
				foregroundBorderWidth: 5,
				backgroundBorderWidth: 2,
				foregroundColor: '#0083da',
				backgroundColor: '#0083da',
				fontColor: '#0083da',
				replacePercentageByText: '',
				//percentageY: 10,
				//textY: 10,
			});
		};

		customScroll = () => {
			$(window).load(function(){
				$('.cuScroll').mCustomScrollbar({
					axis:"y",
					scrollInertia: 0,
					mouseWheel: { preventDefault: true }
				});
			});
		};

		selectCustomeScroll = () => {
			$(function() {
				var _dropdown;
				$('.cuSelect select').styler({
					selectSmartPositioning: true,
					//selectPlaceholder: '123',
					onFormStyled: function(){
						_dropdown = $('.jq-selectbox__dropdown');
						_dropdown.find('ul').wrap('<div class="customScrollbar" />');
					},
					onSelectOpened: function(){
						var _ul = $(this).find('.jq-selectbox__dropdown ul');
						var height = _ul.height();
						var _srollPane = _dropdown.find('.customScrollbar');
						_srollPane.height(height);
						_ul.css('max-height', 'none');
						_srollPane.mCustomScrollbar({
							axis:"y",
							scrollInertia: 0,
							mouseWheel: {
								enable: true,
								disableOver: null,
								preventDefault: true
							}
						});
						if ($('html').hasClass('touch')) {
							//alert('touch');
							//console.log($(this).find('select'));
							$(this).find('select').css({
								"margin": "0px",
								"padding": "0px",
								"position": "absolute",
								"left": "0px",
								"top": "0px",
								"width": "100%",
								"height": "100%",
								"opacity": "0",
								"z-index": "10",
								"background": "red",
							});
							$(this).find('select').trigger('click');
						}

					}
				});
			});
		};

		stickyBlockInParent = (el) => {
			//console.log(el);
			el.stick_in_parent({
				parent: '#aside-right-with-sticky',
				offset_top: 74,
				bottoming: true,
				spacer: false,
				recalc_every: 1
			});
		};

		collapseMobileFilter = () => {
			const btn = $('.btn-collapse-mobile-filter');
			const panel = $('#collapse-mobile-filter');
			btn.on('click', function () {
				$(this).toggleClass('active');
				panel.slideToggle();
			});
		};

		tabsLoginEvents = () => {
			$('a[aria-controls="registration"]').on('shown.bs.tab', function (e) {
				//$(e.target).parents('.modal').find('.modal-title').text('Регистрация');
			});
			$('a[aria-controls="login"]').on('shown.bs.tab', function (e) {
				//$(e.target).parents('.modal').find('.modal-title').text('Авторизуйтесь');
				//$('#authorization').tab('show');
			});
			$('a[aria-controls="login"]').on('click', function (e) {
				$('#authorization').tab('show');
				$('#login').tab('show');
			});

			$('#modalLogin').on('hidden.bs.modal', function () {
				//console.log('close modal');
				$('a[aria-controls="authorization"]').trigger('click');
				$('a[aria-controls="login"]').trigger('click');
			})
		};

		modalsEvents = () => {
			$('.modal').on('show.bs.modal', function (e) {
				const scrollbarWidth = getScrollbarWidth();
				$('header').css('padding-right', scrollbarWidth+'px');
				$('#bg').css('right', scrollbarWidth+'px');
			});
			$('.modal').on('hidden.bs.modal', function (e) {
				$('header').css('padding-right', 'inherit');
				$('#bg').css('right', '0');
			})
		};

		playCollectionTrailer = () => {
			$('.item-collection-cart .field-trailer .field-img').on('click', function(e) {
				const trailerId = $(this).attr('data-id');
				$(this).fadeOut(100);
				//$(trailerId)[0].src += "&autoplay=1";
        $(trailerId)[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
				e.preventDefault();
			});
		};

		popoverEvents = () => {
      const popover = $('[data-toggle="popover"]');
      var tmp = null;
 
      popover.popover({
        html : true,
        content: function() {
          var content = $(this).attr("data-popover-content");
          return $(content).children(".popover-body").html();
        },
        title: function() {
          var title = $(this).attr("data-popover-content");
          return $(title).children(".popover-heading").html();
        }
      });
 
      popover.on('click', function (e) {
        e.preventDefault();
        
        if (e.target.classList.contains('js-date')) {
          copyHandler(e);
        }
      });
      
      popover.on('shown.bs.popover', function() {
        const this_popover = $(this);
        clearTimeout(tmp);
        tmp = setTimeout(function () {
          this_popover.popover('hide');
          $('[data-toggle="popover"]').popover('hide');
        }, 5000);
      });
 
    };

		handleClickOnLinkText(e) {
			const $el 						= $(e.target);
			const ACTIVE_CLASS 		= 'active';
			const SHOWN_CLASS 		= 'show-all';
			const isActive				= $el.hasClass(ACTIVE_CLASS);
			const showText 				= $el.data('shown-text');
			const hideText 				= $el.data('hide-text');
			const isExist 				= showText && hideText;
			const $parent 				= $el.parents('.literal');

			// console.log('showText: '+ showText);
			// console.log('hideText: '+ hideText);

			e.preventDefault();

			toggleLinkText(isActive, firstCb, secondCb);

			function firstCb() {
				$el.removeClass(ACTIVE_CLASS);
				isExist && $el.text(showText);
				$parent.removeClass(SHOWN_CLASS);
			}
			function secondCb() {
				$el.addClass(ACTIVE_CLASS);
				isExist && $el.text(hideText);
				$parent.addClass(SHOWN_CLASS);
			}
		};

		openSerialGallery = () => {
			$('.serial-photo-slider a.item').click(function (e) {
				e.preventDefault();
				//console.log($(this).data('index'));
				const index = $(this).data('index') - 1;
				const galleryIndex = $('#lightGallery').find('a')[index];
				$(galleryIndex).trigger('click');
			});
		};

		reviewsLinkVisible = (height) => {
			$('.serial-reviews-slider .item-review .review-body .btn-read-more > a').removeClass('hidden');
			$('.serial-reviews-slider .item-review .review-body a').each(function (e) {
				//console.log($(this).height());
				//console.log($(this).parents('.item-review').find('.btn-read-more').find('a'));
				var itemReview = $(this).parents('.item-review');

				if ($(this).height() < height) {
					$(this).parents('.item-review').find('.btn-read-more').find('a').addClass('hidden');
				}
			});
		};

    videoTabsEvents = () => {
    	const tabBtn = $('.video-tabs a[data-toggle="tab"]');
      tabBtn.on('shown.bs.tab', function (e) {
        let prevTab = $(e.relatedTarget).attr('aria-controls');
        let iframe =  $("#"+prevTab).find('iframe')[0];

        iframe.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      });

      function iframeEvents(el, content) {
        // console.log(el, content);
        var video = $(el).find('iframe')[0];
        //console.log(video);

        var top_of_element = $(content).offset().top;
        var bottom_of_element = $(content).offset().top + $(content).outerHeight();
        var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
        var top_of_screen = $(window).scrollTop();

        // console.log('top_of_element: ' + top_of_element);
        // console.log('bottom_of_element: ' + bottom_of_element);
        // console.log('bottom_of_screen: ' + bottom_of_screen);
        // console.log('top_of_screen: ' + top_of_screen);

        if ((top_of_screen < (top_of_element - 64)) && (bottom_of_screen > bottom_of_element)) {
          //console.log('video-tabs - visible');
          //video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        } else {
          //console.log('video-tabs - Not visible');
          video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        }
      }



      $(window).on('scroll', function() {

      	if ($('.article-header .video-tabs').length) {
          iframeEvents('.video-tabs .tab-pane.active', '.video-tabs .tab-content');
				}
        if ($('.article-header .article-gallery-photo .flex-video').length) {
          iframeEvents('.article-header .article-gallery-photo', '.article-header .article-gallery-photo');
				}

        if ($('.article-body iframe').length) {
      		//console.log($('.article-body iframe').length);
          $('.article-body iframe').each(function (index) {
          	//console.log(this);
            var video = $(this);

            var top_of_element = $(this).offset().top;
            var bottom_of_element = $(this).offset().top + $(this).outerHeight();
            var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
            var top_of_screen = $(window).scrollTop();

            if ((top_of_screen < (top_of_element - 64)) && (bottom_of_screen > bottom_of_element)) {
              //console.log('video-tabs - visible');
              //video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
            } else {
              video[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
            }
          });
				}

        if ($('.item-collection-cart iframe').length) {
      		//console.log($('.item-collection-cart iframe').length);
          $('.item-collection-cart iframe').each(function (index) {

            var video = $(this);

            var top_of_element = $(this).offset().top;
            var bottom_of_element = $(this).offset().top + $(this).outerHeight();
            var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
            var top_of_screen = $(window).scrollTop();

            if ((top_of_screen < (top_of_element - 64)) && (bottom_of_screen > bottom_of_element)) {
              //console.log('video-tabs - visible');
              //video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
            } else {
              video[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
            }

          });
				}




        // var video = $('.video-tabs .tab-pane.active').find('iframe')[0];
        //
        // var top_of_element = $(".video-tabs .tab-content").offset().top;
        // var bottom_of_element = $(".video-tabs .tab-content").offset().top + $(".video-tabs .tab-content").outerHeight();
        // var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
        // var top_of_screen = $(window).scrollTop();
        //
        // if ((top_of_screen < (top_of_element - 64)) && (bottom_of_screen > bottom_of_element)) {
        //   //video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        // } else {
        //   video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        // }
      });
    };

		telegramDropdown = () => {
			$('.block-fanserials-telegram .dropdown > a').hover(function() {
				$(this).parent('.dropdown').addClass('open');
			});
		}

		/*handleClickOnLinkText*/

	}

	const projectApp = new App();
	const MQ = deviceType();
	let isMobile = false;
	let isTablet = true;
	let isDesktop = false;

	throttle('resize', 'optimizedResize');

	function switchDeviceType(mq) {
		if (mq === 'desktop' && isDesktop) {
			isDesktop = false;
			isTablet = true;
			isMobile = false;
		} else if (mq === 'tablet' && isTablet) {
			isMobile = true;
			isDesktop = true;
			isTablet = false;
		} else if (mq === 'mobile' && isMobile) {
			isMobile = false;
			isTablet = true;
			isDesktop = false;
		}
		//console.log('switchDeviceType: ' + mq);
	}

	staticInit(MQ, projectApp.switchToDesktop, projectApp.switchToTablet, projectApp.switchToMobile);

	$window.on('optimizedResize', () => {
		const mq = deviceType();

		checkDeviceType(
			mq,
			isMobile,
			isTablet,
			isDesktop,
			[projectApp.switchToDesktop, projectApp.switchToTablet, projectApp.switchToMobile]
		);

		switchDeviceType(mq);
	});

	$window
		.on('DOMContentLoaded', projectApp.init())
		.on('scroll', () => projectApp.handleScroll())
		.on('load', () => projectApp.handleLoad())
		.on('resize', () => projectApp.handleResize());
})();


