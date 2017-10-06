$(function(){
	let currentSlide = 1, continentInterval;

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
		return (count + 1) === 2 ? 1 : 0;
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

	function backToCover(continent) {
		$(`#${continent}`).animate({
			top: '100%'
		}, 200).removeAttr('tabindex');
	}

	function nextSlide(continent) {
		console.log('before:', currentSlide);
		if( isLastSlide(currentSlide) === 1 ) {
			console.log('stop interval');
			clearInterval(continentInterval);
			setTimeout(() => backToCover(continent), 2000);
		}

		doSlide(continent);
		currentSlide++;
		
	}

	function startPresent(continent) {
		console.log(`${continent} is starting...`);

		$(`#${continent} .section:first-child`).addClass('active');
		continentInterval = setInterval( () => nextSlide(continent), 2000);
	}

	function goToPresentation() {
		let continent = $(this).attr('continent');
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
		$('#' + continent).attr('tabindex', 1).keydown((e) => {
			// hit down arrow or enter to start presenting
			if( e.which === 40 || e.which === 13){
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

	var bodyFade = 500, headlineFade = 300;

	$('body').delay(500).fadeIn(bodyFade, function(){
		setTimeout(function() {
			$('#cover-headline span').css('display', 'inline-block').addClass('flipIn');
		}, headlineFade);

		setTimeout(function() {
			$('#cover-headline span').append('<div class="underline underlineIn"></div>').addClass('yellow');
		}, bodyFade + headlineFade);
	});

	

	$('#cover-headline span').on('click', function(){
		/* $(this).parents('#cover-headline').animate({
			top: '-100%',
			opacity: 0
		}, 700, 'linear', function(){
			$(this).hide();
		}); */
		$(this).animate({
			width: '100%',
			height: '500px'
		}, 500, 'linear', function(){

		});
		$(this).addClass('expanded').css('border', '3px solid #fff');
		$('.underline').hide();
	});

});