window.addEventListener('load', function () {
	const preloader = document.querySelector('.preloader')
	setTimeout(function () {
		preloader.classList.add('preloader_hidden')
	}, 0)
})

// Основной файл стилей
import '../scss/style.scss'
//====================================================================

// Functions
import './functions.js'

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
