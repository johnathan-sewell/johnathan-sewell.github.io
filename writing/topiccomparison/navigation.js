(function() {
	'use strict';

	var nextSlideKeys = [];
	var previousSlideKeys = [];
	var pages = [
			'index.html',
			'data.html',
			'layout.html',
			'layoutExample.html',
			'layoutY.html',
			'layoutYExample.html',
			'layoutWithScale.html',
			'layoutWithScaleExample.html',
			'intersections.html',
			'intersectionsExample.html',
			'colour.html',
			'colourExample.html',
			'font.html',
			'fontExample.html',
			'drawingTheAxis.html',
			'drawingTheAxisExample.html',
			'sparklinesExample.html',
			'conclusions.html',
			'thanks.html'
		];

	nextSlideKeys.push(32); //space bar
  nextSlideKeys.push(13); //return
	nextSlideKeys.push(39); //right cursor key
  previousSlideKeys.push(8) //backspace

	document.onkeyup = function(e) {
		e = e || window.event;
		navigate(e.keyCode);
	};

	function getCurrentPathname() {
		var fileName = window.location.pathname.split('/').pop();
		if (fileName === '') {
			//assume we are at index
			return pages[0];
		}
		return fileName;
	}

	function atLastSlide() {
		return getCurrentSlideIndex() === (pages.length - 1);
	}

	function getCurrentSlideIndex() {
		return pages.indexOf(getCurrentPathname());
	}

	function getNextSlidePathname() {
		return pages[getCurrentSlideIndex() + 1];
	}

	function isNavigatingForward(keyCode) {
		return nextSlideKeys.indexOf(keyCode) > -1;
	}

	function navigate(keyCode) {
		console.log('navigating', keyCode);

		if (isNavigatingForward(keyCode)) {
			if (!atLastSlide()) {
				window.location.href = getNextSlidePathname();
			}
		}
	}
})();
