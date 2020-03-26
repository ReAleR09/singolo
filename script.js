function slider(selector) {
	const sliderElement = document.getElementById(selector);

	const navLeft = sliderElement.getElementsByClassName('nav_left')[0];
	const navRight = sliderElement.getElementsByClassName('nav_right')[0];

	const slides = sliderElement.getElementsByClassName('slide');
	for(const index in Object.keys(slides)) {
		slides[index].style.left = `0px`;
	}

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

function initMenu(menuId, offsetElId) {
	const menuEl = document.getElementById(menuId);
	const anchorEls = menuEl.getElementsByTagName('a');

	let activeAnchorEl = false;
	
	for (const i in Object.keys(anchorEls)) {
		const sectionId = anchorEls[i].hash.replace('#', '');

		anchorEls[i].addEventListener('click', function(e) {
			e.preventDefault();
			let newX = document.getElementById(sectionId).offsetTop;
			newX -= document.getElementById(offsetElId).offsetHeight;
			window.scrollTo({behavior: 'smooth', top: newX});
		});
	}

	checkAndSetActiveMenuItem();

	document.addEventListener('scroll', function(e) {
		checkAndSetActiveMenuItem();
	});

	function checkAndSetActiveMenuItem() {
		let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		scrollTop += document.getElementById(offsetElId).offsetHeight;

		let newActiveAnchorEl = undefined;
		let newActiveBlockOffset = -1;

		const isBottom =  (window.innerHeight + window.scrollY) >= document.body.offsetHeight;

		for (const i in Object.keys(anchorEls)) {
			const candidate = anchorEls[i];
			const sectionId = candidate.hash.replace('#', '');
			const sectionBlock = document.getElementById(sectionId);
			
			if(!newActiveAnchorEl) {
				newActiveAnchorEl = candidate;
				newActiveBlockOffset = sectionBlock.offsetTop;
				continue;
			}
			
			if((sectionBlock.offsetTop <= scrollTop || isBottom) && sectionBlock.offsetTop > newActiveBlockOffset) {
				newActiveAnchorEl =  candidate;
				newActiveBlockOffset = sectionBlock.offsetTop;
			}
		}

		if(!activeAnchorEl) {
			newActiveAnchorEl.classList.add('active');
			activeAnchorEl = newActiveAnchorEl; 
		} else if(newActiveAnchorEl && newActiveAnchorEl !== activeAnchorEl) {
			activeAnchorEl.classList.remove('active');
			newActiveAnchorEl.classList.add('active');
			activeAnchorEl = newActiveAnchorEl; 
		}
	}

}

window.onload = function() {
	slider('phones_slider');
	togglePhoneScreen('phone1', 'phone2', 'phone3');
	initMenu('menu', 'home');
};