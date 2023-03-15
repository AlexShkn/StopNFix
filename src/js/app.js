window.addEventListener('load', function () {
	const preloader = document.querySelector('.preloader')
	setTimeout(function () {
		preloader.classList.add('preloader_hidden')
	}, 0)
})

// Основной файл стилей
import '../scss/style.scss'
//====================================================================

// Burger menu
import './components/burger.js'
//====================================================================

// Header Sticky
// import './components/headerSticky.js'
//====================================================================

// Swiper
import './libs/swiper.js'
import './components/swiper/slider.js'
// import './components/swiper/gallery.js'
//====================================================================

//LightBox
// data-fslightbox="gallery" href="img/3.jpg"
// import './libs/fslightbox.js'
//====================================================================

// Tabs
import './components/tabs.js'
//====================================================================

// DropDownMini
import './components/dropdownMini.js'
//====================================================================

// DropDownMenu
import './components/dropdownMenu.js'
//====================================================================

//Modal
import './components/modal.js'
//====================================================================

//Spoller
// import './components/spoller.js'
//====================================================================

// import './components/spollerCustom.js'
//====================================================================

//filterDropdown
import './components/filterDropdown.js'
//====================================================================

// Dynamic adaptive
import './libs/dynamic_adapt.js'
//====================================================================

// Scrolling Indicator
// import './components/scrollingIndicator.js'
//====================================================================
// Section navigation
// import './components/sectionNav.js'
//====================================================================

// Go to Top
import './components/goToTopButton.js'
//====================================================================

// Menu Line
// import './components/menuLine.js'
//====================================================================

function ibg() {
	let ibg = document.querySelectorAll('._ibg')
	for (var i = 0; i < ibg.length; i++) {
		if (
			ibg[i].querySelector('img') &&
			ibg[i].querySelector('img').getAttribute('src') != null
		) {
			ibg[i].style.backgroundImage =
				'url(' + ibg[i].querySelector('img').getAttribute('src') + ')'
		}
	}
}
ibg()

//====================================================================

function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image()
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2)
		}
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp'
		document.documentElement.classList.add(className)
	})
}

isWebp()

//====================================================================
