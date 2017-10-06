'use strict';

$(function () {
	var _this = this;

	var bodyFade = 500,
	    headlineFade = 300;
	var currentSlide = 1,
	    continentInterval = void 0,
	    windowH = $(window).height();

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
		}, 200).removeAttr('tabindex');
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
		var continent = $(this).attr('continent');
		switch (continent) {
			case 'north-america':
				$('#north-america').animate({
					top: '0'
				}, 200);

				break;

			case 'asia':
				$('#asia').animate({
					left: '0'
				}, 200);

				break;
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

	$('ul li').on('click', goToPresentation);

	/*$(document).keydown((e) => {
 switch (e.which) {
 	case 40: // down
 			if( checkCoverpageHide() === 1 && atLastSlide() === 1 ){
 			// in presentation and it is the last slide, go back to cover page
 			$('#north-america .section:last-child').animate({
 				height: 0
 			}, 200, () => $('#north-america').hide() );
 			$('#cover-page').removeClass('hide');
 			console.log('1');
 				removeClassLast($('#north-america'));
 		} else if ( checkCoverpageHide() === 1 && atLastSlide() === 0 ) {
 			// inpresentation but haven't reached to the last one yet, advance the slide automatically
 			$('#north-america').animate({
 				top: '-' + (currentSlide++ * 100) + '%'
 			}).addClass('last');
 			console.log('2');
 				if( currentSlide === 2 ) addClassLast($('#north-america'));
 			} else {
 			// cover page is not hidden, about to go into presentation
 			$('#north-america').animate({
 				top: '0'
 			}, 200);
 			$('#north-america .section').eq(0).addClass('active');
 			$('#cover-page').addClass('hide');
 		}
 			break;
 		default: return;
 }
 e.preventDefault();
 });*/

	$('html').on('keyup', function (e) {
		if (e.which === 40 || e.which === 13) {
			$(_this).off('keyup');
			$('body').delay(500).fadeIn(bodyFade, function () {
				setTimeout(function () {
					$('#cover-headline span').css('display', 'inline-block').addClass('flipIn');
				}, headlineFade);

				setTimeout(function () {
					$('#cover-headline span').append('<div class="underline underlineIn"></div>').addClass('yellow');
					console.log(windowH, windowH - 60);
					$('body').on('keyup', function (e) {
						$('#cover-headline span').css({
							width: 'calc(100% - 60px)',
							height: windowH - 60 + 'px'
						});
						$('#cover-headline span').addClass('expanded').css('border', '3px solid #fff');
						$('.underline').hide();

						e.stopPropagation();
					});
				}, bodyFade + headlineFade);
			});
		}
	});

	/* $('#cover-headline span').on('click', function(){
 	$(this).animate({
 		width: '100%',
 		height: '500px'
 	}, 500, 'linear', function(){
 		});
 	$(this).addClass('expanded').css('border', '3px solid #fff');
 	$('.underline').hide();
 }); */
});