const heroSlider = new Swiper('.hero-slider', {
	spaceBetween: 40,
	slidesPerView: 1,
	loop: true,
	speed: 800,

	loopAdditionalSlides: 0,
	preventInteractionOnTransition: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},

	//	Dotts
	pagination: {
		el: '.hero-slider__pagination',
		clickable: true,
		type: 'bullets',
		renderBullet: (index, className) => {
			return (
				'<span class="' +
				className +
				'"><svg class="circle" width="24" height="24" viewBox="0 0 60 60"><circle class="circle2" cx="34" cy="34" r="12" stroke="#27ACE2" stroke-width="8" fill="none"/><circle class="circle1" cx="34" cy="34" r="12" stroke="#0060AA" stroke-width="8" fill="none"/></svg></span>'
			)
		},
	},

	on: {
		init() {
			this.el.addEventListener('mouseenter', () => {
				this.autoplay.stop()
			})

			this.el.addEventListener('mouseleave', () => {
				this.autoplay.start()
			})
		},
	},
})
