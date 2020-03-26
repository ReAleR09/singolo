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

window.onload = function() {
	slider('phones_slider');
};