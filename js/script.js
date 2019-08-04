(function($) {
	"use strict";
	//1.Hide Loading Box
	function handlePreloader() {
		if ($('.preloader').length) {
			$('.preloader').delay(200).fadeOut(500);
		}
	}

	//2.Update header style
	function headerStyle() {
		if ($('.main-header').length) {
			var windowpos = $(window).scrollTop();
			if (windowpos >= 150) {
				$('.main-header').addClass('fixed-header');
				$('.scroll-to-top').fadeIn(300);
			} else {
				$('.main-header').removeClass('fixed-header');
				$('.scroll-to-top').fadeOut(300);
			}
		}
	}
	headerStyle();

	//3.Submenu Dropdown Toggle
	if ($('.main-header li.dropdown ul').length) {
		$('.main-header li.dropdown').append(
			'<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').click('click', function() {
			$(this).prev('ul').slideToggle(500);
		});

		//Disable dropdown parent link
		$('.navigation li.dropdown > a').click('click', function(e) {
			e.preventDefault();
		});
	}


	//5.Scroll to a Specific Div
	if ($('.scroll-to-target').length) {
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
			// animate
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 1000);
		});
	}

	//6.Search Popup
	if ($('#search-popup').length) {
		//Show Popup
		$('.search-box-btn').on('click', function() {
			$('#search-popup').addClass('popup-visible');
		});
		//Hide Popup
		$('.close-search').on('click', function() {
			$('#search-popup').removeClass('popup-visible');
		});
	}

	//7.progressBarConfig
	function progressBarConfig() {
		var progressBar = $('.progress');
		if (progressBar.length) {
			progressBar.each(function() {
				var Self = $(this);
				Self.appear(function() {
					var progressValue = Self.data('value');
					Self.find('.progress-bar').animate({
						width: progressValue + '%'
					}, 100);
					Self.find('span.value').countTo({
						from: 0,
						to: progressValue,
						speed: 100
					});
				});
			})
		}
	}

	//8.Gallery Filters
	if($('.filter-list').length){
		$('.filter-list').mixItUp({});
	}

	//9.Sponsors Slider
	if ($('.sponsors-slider').length) {
		$('.sponsors-slider').owlCarousel({
			loop: true,
			margin: 50,
			nav: true,
			smartSpeed: 400,
			autoplay: 4000,
			navText: ['<span class="fa fa-angle-left"></span>',
				'<span class="fa fa-angle-right"></span>'
			],
			responsive: {
				300: {
					items: 1
				},
				400: {
					items: 2
				},
				800: {
					items: 3
				},
				1200: {
					items: 5
				}
			}
		});
	}

	//10.Three Column Carousel Slider
	if ($('.three-column-carousel').length) {
		$('.three-column-carousel').owlCarousel({
			loop: true,
			margin: 30,
			nav: true,
			smartSpeed: 500,
			autoplay: 4000,
			navText: ['<span class="fa fa-angle-left"></span>',
				'<span class="fa fa-angle-right"></span>'
			],
			responsive: {
				0: {
					items: 1
				},
				480: {
					items: 1
				},
				600: {
					items: 1
				},
				800: {
					items: 2
				},
				1024: {
					items: 3
				}
			}
		});
	}

	//11.Single Item Slider
	if ($('.single-item-carousel').length) {
		$('.single-item-carousel').owlCarousel({
			loop: true,
			margin: 0,
			nav: true,
			smartSpeed: 700,
			autoplay: 4000,
			navText: ['<span class="fa fa-angle-left"></span>',
				'<span class="fa fa-angle-right"></span>'
			],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				1200: {
					items: 1
				}
			}
		});
	}

	if ($('.img-popup').length) {
	    var groups = {};
	    $('.img-popup').each(function() {
	        var id = parseInt($(this).attr('data-group'), 10);

	        if (!groups[id]) {
	            groups[id] = [];
	        }

	        groups[id].push(this);
	    });


	    $.each(groups, function() {

	        $(this).magnificPopup({
	            type: 'image',
	            closeOnContentClick: true,
	            closeBtnInside: false,
	            gallery: { enabled: true }
	        });
	    });
	}


	//13.Contact Form Validation
	if ($(".contact-form").length) {
		$(".contact-form").validate({
			submitHandler: function(form) {
				var form_btn = $(form).find('button[type="submit"]');
				var form_result_div = '#form-result';
				$(form_result_div).remove();
				form_btn.before(
					'<div id="form-result" class="alert alert-success" role="alert" style="display: none;"></div>'
				);
				var form_btn_old_msg = form_btn.html();
				form_btn.html(form_btn.prop('disabled', true).data("loading-text"));
				$(form).ajaxSubmit({
					dataType: 'json',
					success: function(data) {
						if (data.status = 'true') {
							$(form).find('.form-control').val('');
						}
						form_btn.prop('disabled', false).html(form_btn_old_msg);
						$(form_result_div).html(data.message).fadeIn('slow');
						setTimeout(function() {
							$(form_result_div).fadeOut('slow')
						}, 6000);
					}
				});
			}
		});
	}

	//14.Contact Tab
	if($('.contact-tab').length){
		$('.contact-tab .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('href'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.contact-tab').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.contact-tab').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.contact-tab').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}

	function eventTab() {
		if ($('.event-tab .event-tablist').length) {
			var tabWrap = $('.event-tab .event-tab-content');
			var tabClicker = $('.event-tab .event-tablist li');
			tabWrap.children('div').hide();
			tabWrap.children('div').eq(0).show();
			tabClicker.on('click', function() {
				var tabName = $(this).data('tab-name');
				tabClicker.removeClass('active');
				$(this).addClass('active');
				var id = '#' + tabName;
				tabWrap.children('div').not(id).hide();
				tabWrap.children('div' + id).fadeIn('1000');
				return false;
			});
		}
	}

	//Tabs Box
	if($('.tabs-box').length){
		//Tabs
		$('.tabs-box .tab-buttons .tab-btn').click(function(e) {			
			e.preventDefault();
			var target = $($(this).attr('data-tab'));			
			target.parents('.tabs-box').children('.tab-buttons').children('.tab-btn').removeClass('active-btn');
			$(this).addClass('active-btn');
			target.parents('.tabs-box').children('.tab-content').children('.tab').fadeOut(0);
			target.parents('.tabs-box').children('.tab-content').children('.tab').removeClass('active-tab');
			$(target).fadeIn(300);
			$(target).addClass('active-tab');
		});		
	}

	//17.Select menu 
	function selectDropdown() {
		if ($(".selectmenu").length) {
			$(".selectmenu").selectmenu();
			var changeSelectMenu = function(event, item) {
				$(this).trigger('change', item);
			};
			$(".selectmenu").selectmenu({
				change: changeSelectMenu
			});
		};
	}

	//28.Appointment Calendar
	if($('#appoinment_calendar').length) {
		$('#appoinment_calendar').monthly();
	}

	// Date picker
	function datepicker () {
	    if ($('#datepicker').length) {
	        $('#datepicker').datepicker();
	    };
	}

	// Date picker
	function datepicker1 () {
	    if ($('#datepicker-1').length) {
	        $('#datepicker-1').datepicker();
	    };
	}

	// Date picker
	function datepicker2 () {
	    if ($('#datepicker-2').length) {
	        $('#datepicker-2').datepicker();
	    };
	}

	// Date picker
	function datepicker3 () {
	    if ($('#datepicker-3').length) {
	        $('#datepicker-3').datepicker();
	    };
	}

	// Date picker
	function datepicker4 () {
	    if ($('#datepicker-4').length) {
	        $('#datepicker-4').datepicker();
	    };
	}

	// Time picker
	function timepicker () {
	    $('input[name="time"]').ptTimeSelect();
	}

	//18.Elements Animation
	if ($('.wow').length) {
		var wow = new WOW({
			boxClass: 'wow', // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset: 0, // distance to the element when triggering the animation (default is 0)
			mobile: false, // trigger animations on mobile devices (default is true)
			live: true // act on asynchronously loaded content (default is true)
		});
		wow.init();
	}

	/* ========================When document is Scrollig, do===================== */

	$(window).on('ready', function() {
		// add your functions
		(function($) {
			eventTab();
		})(jQuery);
	});


	/* ========================When document is Scrollig, do===================== */

	$(window).on('scroll', function() {
		// add your functions
		(function($) {
			headerStyle();
		})(jQuery);
	});


	/* ========================When document is loaded, do===================== */

	$(window).on('load', function() {
		// add your functions
		(function($) {
			handlePreloader();
			datepicker();
			datepicker1();
			datepicker2();
			datepicker3();
			datepicker4();
			timepicker();
		})(jQuery);
	});

	
})(window.jQuery);