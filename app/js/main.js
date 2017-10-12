$(function(){
	// TODO: change slide duration to 20000 (20 secs)
	const bodyFade = 500, headlineFade = 300, pageTransDuration = 500, slideDuration = 20000;
	let currentSlide = 1, continentInterval,
			windowH = $(window).height();

	function adjustMapHeight() {
		const windowH = $(window).height();

		$('#cover-headline span').css({
			height: (windowH - 60) + 'px'
		});

		$('#map').css({
			display: 'block',
			height: (windowH - 60 - 100 - 6 - 10)
		});
	}

	function slideMarkerIn($marker, delay) {
		setTimeout(function() {
			$marker.addClass('slideIn');
		}, delay);
	}

	function showMarkers() {
		slideMarkerIn( $('.marker:nth-child(2n):not(:last-child)'), bodyFade + headlineFade + 300 );
		slideMarkerIn( $('.marker:nth-child(3n)'), bodyFade + headlineFade + 800 );
		slideMarkerIn( $('.marker:nth-child(2n+1)'), bodyFade + headlineFade + 1300 );
		slideMarkerIn( $('.marker:nth-child(6n)'), bodyFade + headlineFade + 1800 );

		setTimeout(() => $('.marker').css('display', 'block').removeClass('slideIn'), bodyFade + headlineFade + 1800);
	}

	function addClassLast(elem) {
		elem.addClass('last');
	}

	function removeClassLast(elem) {
		elem.removeClass('last');
	}

	function isLastSlide(count) {
		// TODO: replace 2 with 20
		return (count + 1) === 20 ? 1 : 0;
	}

	function doSlide(continent) {
		let $current = $(`#${continent} .section.active`),
				$next = $current.next();

		$current.animate({
			height: 0
		}, 150, () => {
			$current.removeClass('active');
			$next.addClass('active');
		});
	}

	function resetSlides(continent) {
		$(`#${continent} .section.active`).removeClass('active');
		$(`#${continent} .section`).css('height', '100%');

		$(`#${continent}`).off('keydown');
	}

	function backToCover(continent) {
		$(`#${continent}`).animate({
			top: '100%'
		}, pageTransDuration, 'linear', () => resetSlides(continent)).removeAttr('tabindex');
	}

	function disableMarker(continent) {
		$(`#marker-${continent} > div`).append('<div class="img-overlay"></div>');
		$(`#marker-${continent}`).addClass('disabled');
	}

	function nextSlide(continent) {
		console.log('before:', currentSlide);
		if( isLastSlide(currentSlide) === 1 ) {
			console.log('stop interval');
			clearInterval(continentInterval);

			// unbind the keydown before we bind it again
			$(`#${continent}`).off('keydown');

			// wait for user to hit keys to back to home
			$(`#${continent}`).on('keydown', (e) => {
				if( e.which === 40 || e.which === 13 ){
					backToCover(continent);
					disableMarker(continent);
				}
			});
			// setTimeout(() => backToCover(continent), 2000);
		}

		doSlide(continent);
		currentSlide++;
	}

	function startPresent(continent) {
		console.log(`${continent} is starting...`);

		$(`#${continent} .section:first-child`).addClass('active');
		continentInterval = setInterval( () => nextSlide(continent), slideDuration);
	}

	function goToPresentation() {
		const continent = $(this).attr('id').replace('marker-', '');
		
		if( continent === 'north-america' || continent === 'europe' ) {
			$(`#${continent}`).animate({
				top: '0'
			}, pageTransDuration);
		} else if( continent === 'asia' || continent === 'australia' ) {
			$(`#${continent}`).animate({
				left: '0'
			}, pageTransDuration);
		} else {
			$(`#${continent}`).animate({
				right: '0'
			}, pageTransDuration);
		}

		// TODO: fix the problem which user has to click and then hit the down arrow key
		$('#' + continent).attr('tabindex', 1).keydown((e) => {
			// hit down arrow or enter to start presenting
			if( e.which === 40 || e.which === 13 ){
				currentSlide = 1;
				startPresent(continent);
			}
		});
	}


	$(window).on('resize', adjustMapHeight);

	$('.marker').on('click', goToPresentation);

	$('html').on('keyup', (e) => {
		if( e.which === 40 || e.which === 13 ){
			$('html').off('keyup');

			$('body').delay(500).animate({
				'opacity': 1
			}, bodyFade, 'linear', () => {
				setTimeout(() => {
					$('#cover-headline span').css('display', 'inline-block').addClass('flipIn');
				}, headlineFade);

				setTimeout(() => {
					$('#cover-headline span').append('<div class="underline underlineIn"></div>').addClass('yellow');

					$('html').on('keyup', (e) => {
						$('#cover-headline span').css({
							width: 'calc(100% - 60px)',
							height: (windowH - 60) + 'px',
							'line-height': '100px',
							'font-size': '60px',
							'border': '3px solid #fff',
							'margin-top': '15px',
							cursor: 'default'
						}).addClass('expanded');
						$('.underline').hide();

						$('#map').css('display', 'block').css('height', (windowH - 60 - 100 - 6 - 10));
						$('html').off('keyup');

						//e.stopPropagation();
						return showMarkers();
					});
				}, bodyFade + headlineFade);
			});
		}
	}); 

});