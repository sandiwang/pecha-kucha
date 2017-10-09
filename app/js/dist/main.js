'use strict';

$(function () {
	var _this = this;

	var bodyFade = 500,
	    headlineFade = 300,
	    pageTransDuration = 500;
	var currentSlide = 1,
	    continentInterval = void 0,
	    windowH = $(window).height();

	function slideMarkerIn($marker, delay) {
		setTimeout(function () {
			$marker.addClass('slideIn');
		}, delay);
	}

	function checkCoverpageHide() {
		return $('#cover-page').hasClass('hide') ? 1 : 0;
	}

	function atLastSlide() {
		return $('#north-america').hasClass('last') ? 1 : 0;
	}

	function addClassLast(elem) {
		elem.addClass('last');
	}

	function removeClassLast(elem) {
		elem.removeClass('last');
	}

	function isLastSlide(count) {
		// TODO: replace 2 with 20
		return count + 1 === 2 ? 1 : 0;
	}

	function doSlide(continent) {
		var $current = $('#' + continent + ' .section.active'),
		    $next = $current.next();

		$current.animate({
			height: 0
		}, 150, function () {
			$current.removeClass('active');
			$next.addClass('active');
		});
	}

	function backToCover(continent) {
		$('#' + continent).animate({
			top: '100%'
		}, pageTransDuration).removeAttr('tabindex');
	}

	function nextSlide(continent) {
		console.log('before:', currentSlide);
		if (isLastSlide(currentSlide) === 1) {
			console.log('stop interval');
			clearInterval(continentInterval);
			setTimeout(function () {
				return backToCover(continent);
			}, 2000);
		}

		doSlide(continent);
		currentSlide++;
	}

	function startPresent(continent) {
		console.log(continent + ' is starting...');

		$('#' + continent + ' .section:first-child').addClass('active');
		continentInterval = setInterval(function () {
			return nextSlide(continent);
		}, 2000);
	}

	function goToPresentation() {
		var continent = $(this).attr('id').replace('marker-', '');

		if (continent === 'north-america' || continent === 'europe') {
			$('#' + continent).animate({
				top: '0'
			}, pageTransDuration);
		} else if (continent === 'asia' || continent === 'australia') {
			$('#' + continent).animate({
				left: '0'
			}, pageTransDuration);
		} else {
			$('#' + continent).animate({
				right: '0'
			}, pageTransDuration);
		}

		// TODO: fix the problem which user has to click and then hit the down arrow key
		$('#' + continent).attr('tabindex', 1).keydown(function (e) {
			// hit down arrow or enter to start presenting
			if (e.which === 40 || e.which === 13) {
				currentSlide = 1;
				startPresent(continent);
			}
		});
	}

	// $('ul li').on('click', goToPresentation);
	$('.marker').on('click', goToPresentation);

	$('html').on('keyup', function (e) {
		if (e.which === 40 || e.which === 13) {
			$(_this).off('keyup');
			$('body').delay(500).fadeIn(bodyFade, function () {
				setTimeout(function () {
					$('#cover-headline span').css('display', 'inline-block').addClass('flipIn');
				}, headlineFade);

				setTimeout(function () {
					$('#cover-headline span').append('<div class="underline underlineIn"></div>').addClass('yellow');

					$('body').on('keyup', function (e) {
						$('#cover-headline span').css({
							width: 'calc(100% - 60px)',
							height: windowH - 60 + 'px',
							'line-height': '100px',
							'font-size': '60px',
							'border': '3px solid #fff',
							cursor: 'default'
						}).addClass('expanded');
						$('.underline').hide();

						$('#map').css('display', 'block').css('height', windowH - 60 - 100 - 6 - 10);

						slideMarkerIn($('.marker:nth-child(2n):not(:last-child)'), bodyFade + headlineFade + 700);
						slideMarkerIn($('.marker:nth-child(3n)'), bodyFade + headlineFade + 1200);
						slideMarkerIn($('.marker:nth-child(2n+1)'), bodyFade + headlineFade + 1700);
						slideMarkerIn($('.marker:nth-child(6n)'), bodyFade + headlineFade + 2200);

						/* setTimeout(function() {
      	$('.marker:nth-child(2n):not(:last-child)').addClass('slideIn');
      }, bodyFade + headlineFade + 700);
      	setTimeout(function() {
      	$('.marker:nth-child(3n)').addClass('slideIn');
      }, bodyFade + headlineFade + 1200);
      	setTimeout(function() {
      	$('.marker:nth-child(2n+1)').addClass('slideIn');
      }, bodyFade + headlineFade + 1700);
      	setTimeout(function() {
      	$('.marker:nth-child(6n)').addClass('slideIn');
      }, bodyFade + headlineFade + 2200); */

						e.stopPropagation();
					});
				}, bodyFade + headlineFade);
			});
		}
	});
});