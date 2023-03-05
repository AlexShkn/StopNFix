const mainSlider = new Swiper('.main-slider', {
	spaceBetween: 20,
	slidesPerView: 1,
	// Navigation arrows
	navigation: {
		nextEl: '.main-slider-next',
		prevEl: '.main-slider-prev',
	},
	breakpoints: {
		992: {
			slidesPerView: 3,
		},
		660: {
			slidesPerView: 2,
		},
	},
})

//	effect: 'fade',
// 	autoplay: {
// 		delay: 3000,
// 		disableOnInteraction: false,
// 	},
// 	*/
// 	observer: true,
// 	observeParents: true,
// 	slidesPerView: 1,
// 	spaceBetween: 32,
// 	autoHeight: true,
// 	speed: 800,
// 	//touchRatio: 0,
// 	//simulateTouch: false,
// 	loop: true,
// 	//preloadImages: false,
// 	//lazy: true,
// 	// Dotts
// 	//pagination: {
// 	//	el: '.slider-quality__pagging',
// 	//	clickable: true,
// 	//},
// 	// Arrows
// 	navigation: {
// 		nextEl: '.slider-arrow_next',
// 		prevEl: '.slider-arrow_prev ',
// 	},
// 	breakpoints: {
// 		320: {
// 			// slidesPerView: 1,
// 			// spaceBetween: 0,
// 			autoHeight: true,
// 		},
// 		768: {
// 			// slidesPerView: 2,
// 			// spaceBetween: 20,
// 			autoHeight: false,
// 		},
// 		// 992: {
// 		// 	slidesPerView: 3,
// 		// 	spaceBetween: 20,
// 		// },
// 		// 1268: {
// 		// 	slidesPerView: 4,
// 		// 	spaceBetween: 30,
// 		// },
// 	},
//});
