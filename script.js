function slider(selector) {
	const sliderElement = document.getElementById(selector);

	const navLeft = sliderElement.getElementsByClassName('nav_left')[0];
	const navRight = sliderElement.getElementsByClassName('nav_right')[0];

	const slides = sliderElement.getElementsByClassName('slide');

	let currentIndex = 1;

	navLeft.addEventListener('click', function() {
		_slide(-1);
	})

	navRight.addEventListener('click', function() {
		_slide(1);
	})

	function _slide(slidesOffset) {
		currentIndex += slidesOffset;
		if(currentIndex < 1) {
			currentIndex = slides.length;
		} else if(currentIndex > slides.length) {
			currentIndex = 1;
		}
		_setNewSlidePositions();
	}

	function _setNewSlidePositions() {
		const newLeftAttr = -(currentIndex - 1) * sliderElement.offsetWidth;
		for(const index in Object.keys(slides)) {
			slides[index].style.left = `${newLeftAttr}px`;
		}
	}
}

function togglePhoneScreen(...phoneDomIds) {
	phoneDomIds.forEach(phoneId => {
		const screenEl = document.getElementById(phoneId).getElementsByClassName('screen')[0];
		screenEl.addEventListener('click', function(e) {
			e.target.style.opacity = e.target.style.opacity == '1' ? 0 : 1;
		});
	});
}

window.onload = function() {
	slider('phones_slider');
	togglePhoneScreen('phone1', 'phone2', 'phone3');
};