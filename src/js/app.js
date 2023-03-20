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

const phoneFiled = document.getElementById('phone-field')
let keyCode

filedMask(phoneFiled)

function filedMask(input) {
	function mask(event) {
		event.keyCode && (keyCode = event.keyCode)
		let pos = this.selectionStart
		if (pos < 3) event.preventDefault()
		let matrix = '+7 (___) ___-__-__',
			i = 0,
			def = matrix.replace(/\D/g, ''),
			val = this.value.replace(/\D/g, ''),
			newValue = matrix.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a
			})
		i = newValue.indexOf('_')
		if (i != -1) {
			i < 5 && (i = 3)
			newValue = newValue.slice(0, i)
		}
		let reg = matrix
			.substr(0, this.value.length)
			.replace(/_+/g, function (a) {
				return '\\d{1,' + a.length + '}'
			})
			.replace(/[+()]/g, '\\$&')
		reg = new RegExp('^' + reg + '$')
		if (
			!reg.test(this.value) ||
			this.value.length < 5 ||
			(keyCode > 47 && keyCode < 58)
		)
			this.value = newValue
		if (event.type == 'blur' && this.value.length < 5) this.value = ''
	}

	input.addEventListener('input', mask, false)
	input.addEventListener('focus', mask, false)
	input.addEventListener('blur', mask, false)
	input.addEventListener('keydown', mask, false)
}

//====================================================================
// Активный пункт меню
const navLinks = document.querySelectorAll('.menu__link')
const locateName = window.location.pathname.replace('/', '')

navLinks.forEach(link => {
	link.classList.remove('_current')

	if (locateName === link.getAttribute('href')) {
		link.classList.add('_current')
	}
})
//====================================================================
// Скрытие меню поиска на страницах
const header = document.querySelector('.header')
if (window.location.pathname !== '/index.html') {
	header.classList.add('header-shadow')
} else {
	header.classList.remove('header-shadow')
}
//====================================================================
// Скрытие ссылок bread crumbs на маленьких экранах
const breadCrumbsLinks = document.querySelectorAll('.bread-crumbs__link')

if (breadCrumbsLinks.length > 2) {
	breadCrumbsLinks.forEach((link, index) => {
		breadCrumbsHidden(link, index)

		window.addEventListener('resize', () => {
			breadCrumbsHidden(link, index)
		})
	})
}
function breadCrumbsHidden(link, index) {
	if (window.innerWidth < 479.98) {
		if (index !== breadCrumbsLinks.length - 1) link.style.display = 'none'
	} else {
		link.style.display = 'inline-block'
	}
}
