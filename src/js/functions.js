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

const phoneFields = document.querySelectorAll('[data-phone-field]')
let keyCode

filedMask(phoneFields)

function filedMask(inputs) {
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

	inputs.forEach(input => input.addEventListener('input', mask, false))
	inputs.forEach(input => input.addEventListener('focus', mask, false))
	inputs.forEach(input => input.addEventListener('blur', mask, false))
	inputs.forEach(input => input.addEventListener('keydown', mask, false))
}

//====================================================================
// Активный пункт меню
const navLinks = document.querySelectorAll('.menu__link')
const locateName = window.location.pathname.replace('/', '').split('/')[1]
const pageName = document.querySelector('.bread-crumbs__container > span')

function currentNavLinkChange() {
	if (pageName) {
		if (locateName === 'page-device-repair.html') {
			document.title = pageName.textContent
		}
	}

	navLinks.forEach(link => {
		link.classList.remove('_current')

		if (locateName === link.getAttribute('href')) {
			link.classList.add('_current')
		}
	})
}

currentNavLinkChange()

//====================================================================
// Скрытие тени хедера на страницах
const header = document.querySelector('.header')

function headerShadowChange() {
	if (locateName !== 'index.html' && locateName !== 'page-filter.html') {
		header.classList.add('header-shadow')
	} else {
		header.classList.remove('header-shadow')
	}
}

headerShadowChange()

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

//====================================================================
// Расчет суммы ремонта

const inputPrice = document.querySelectorAll('[data-table-price]')
const priceCount = document.getElementById('price-count')
const deviceName = document.querySelector('#device-model-name > span')
const submitBtns = document.querySelectorAll('[data-btn-thanks]')
const nameFields = document.querySelectorAll('[data-name-field]')
const btnsSubmit = document.querySelectorAll('[data-btn-redirect]')

let totalPrice = 0
export let validate = false

let phoneValue = ''
let nameValue = ''

btnsSubmit.forEach(btn => {
	btn.addEventListener('click', () => {
		nameFields.forEach(field => {
			if (field.value) nameValue += field.value
		})

		phoneFields.forEach(field => {
			if (field.value) phoneValue += field.value
		})

		const phoneFieldValue = phoneValue.trim()
		if (phoneFieldValue.length === 18 && nameValue.length >= 2)
			isValidateChange(true)
	})
})

export function isValidateChange(value) {
	validate = value
}

const selectedServices = {
	device: '',
	services: [],
	totalPrice: 0,
	name: '',
	phone: '',
}

if (inputPrice) {
	inputPrice.forEach(input => {
		input.addEventListener('change', () => {
			if (input.checked) {
				totalPrice += +input.value
			} else if (!input.checked) {
				totalPrice -= +input.value
			}
			selectedServices.totalPrice = totalPrice
			if (priceCount) priceCount.textContent = totalPrice
		})
	})
}

submitBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		inputPrice.forEach(input => {
			if (input.checked) {
				selectedServices.services.push([
					input.getAttribute('name'),
					input.value + 'грн',
				])
			}
		})
		selectedServices.device = deviceName ? deviceName.textContent : ''
		selectedServices.name = phoneValue
		selectedServices.phone = nameValue

		if (validate) console.log(selectedServices)
	})
})
//====================================================================

const modalCard = document.querySelectorAll('.device-card__link')

modalCard.forEach(card => {
	card.addEventListener('click', e => {
		let cardItem = e.currentTarget.closest('.device-card')

		const cardImage = cardItem.querySelector('.device-card__image')
		const cardName = cardItem.querySelector('.device-card__model-name')
	})
})

//====================================================================
// Показать еще
const showMore = document.querySelector('.button_show-more')
const devices = document.querySelectorAll('.device-list__item')

let items

window.innerWidth > 767.98 ? (items = 10) : (items = 6)

if (showMore) {
	showMore.addEventListener('click', () => {
		window.innerWidth > 767.98 ? (items += 5) : (items += 3)

		const array = Array.from(document.querySelector('.device-list').children)
		const visItems = array.slice(0, items)

		visItems.forEach(el => el.classList.add('_visible'))

		if (visItems.length === devices.length) {
			showMore.style.display = 'none'
		}
	})
}

const paginationList = document.querySelector(
	'.selection-pagination__list > span',
)

devices.forEach((device, index) => {
	paginationList.insertAdjacentHTML(
		'beforebegin',
		createPaginationItem(index + 1),
	)
})

function createPaginationItem(index) {
	return `
	<div class="selection-pagination__item">${index}</div>
	`
}

let currentPage = 0

const paginationItems = document.querySelectorAll('.selection-pagination__item')

if (paginationItems.length > 0) {
	paginationItems[paginationItems.length - 1].textContent = devices.length
	paginationItems[paginationItems.length - 1].style.display = 'block'

	paginationItems.forEach((item, index) => {
		item.addEventListener('click', () => {
			currentPage = index
			changeCurrentPage()
		})
	})

	function changeCurrentPage() {
		paginationItems.forEach(item => {
			item.classList.remove('_current')
		})

		paginationItems[currentPage].classList.add('_current')
	}

	changeCurrentPage()
}

//====================================================================

//Filter

const mobileModels = {
	iphone: [
		'iPhone XR',
		'iPhone 7 Plus',
		'iPhone XR',
		'iPhone 6',
		'iPhone 6s Plus',
		'iPhone 7',
		'iPhone XR',
	],
	samsung: [
		'Samsung Galaxy Note 9',
		'Samsung Galaxy Alpha(G850F)',
		'Samsung Galaxy A8 Star',
		'Samsung Galaxy A7 2018 (A750)',
		'Samsung Galaxy A9 2018 (A920)',
		'Samsung Galaxy Note 9',
		'Samsung Galaxy Alpha(G850F)',
		'Samsung Galaxy A8 Star',
		'Samsung Galaxy A7 2018 (A750)',
		'Samsung Galaxy A9 2018 (A920)',
		'Samsung Galaxy Note 9',
		'Samsung Galaxy Alpha(G850F)',
		'Samsung Galaxy A8 Star',
		'Samsung Galaxy A7 2018 (A750)',
		'Samsung Galaxy A9 2018 (A920)',
		'Samsung Galaxy Note 9',
		'Samsung Galaxy Alpha(G850F)',
		'Samsung Galaxy A8 Star',
		'Samsung Galaxy A7 2018 (A750)',
		'Samsung Galaxy A9 2018 (A920) ',
	],
	xiaomi: [
		'Xiaomi Redmi 3',
		'Xiaomi Redmi Pro',
		'Xiaomi Redmi 4',
		'Xiaomi Redmi 4 Pro',
		'Xiaomi Redmi 5',
		'Xiaomi Redmi 5 Plus',
		'Xiaomi Redmi Note',
		'Xiaomi Redmi 3',
		'Xiaomi Redmi Pro',
		'Xiaomi Redmi 4',
		'Xiaomi Redmi 4 Pro',
		'Xiaomi Redmi 5',
		'Xiaomi Redmi 5 Plus',
		'Xiaomi Redmi Note',
	],
	huawei: [
		'Huawei Honor 7A',
		'Huawei Nova 2',
		'Huawei Honor 8',
		'Huawei Honor 9',
		'Huawei Honor 7A',
		'Huawei Nova 2',
		'Huawei Honor 8',
		'Huawei Honor 9',
		'Huawei Honor 7A',
		'Huawei Nova 2',
		'Huawei Honor 8',
		'Huawei Honor 9',
	],
	other: [
		'Ремонт телефонов Acer',
		'Ремонт телефонов Asus',
		'Ремонт телефонов LG',
		'Ремонт телефонов ZTE',
		'Ремонт телефонов HTC',
		'Ремонт телефонов Meizu',
	],
}
const tabletModels = {
	ipad: ['iPad mini 3', 'iPad mini 4', 'iPad Pro', 'iPad Air'],
	samsung: [
		'SamsungGalaxy Tab 1',
		'SamsungGalaxy Tab 2',
		'SamsungGalaxy Tab 3',
		'SamsungGalaxy Tab 4',
		'SamsungGalaxy Tab 5',
		'SamsungGalaxy Tab 6',
	],
	xiaomi: [
		'Xiaomi Mi Pad',
		'Xiaomi Mi Pad 2',
		'Xiaomi Mi Pad 3',
		'Xiaomi Mi Pad 4',
		'Xiaomi Mi Pad 4 Plus',
	],

	huawei: [
		'HUAWEI Media Pad 7',
		'HUAWEI Media Pad 8',
		'HUAWEI Media Pad 9',
		'HUAWEI Media Pad 10',
		'HUAWEI Media Pad 11',
		'HUAWEI Media Pad 12',
		'HUAWEI Media Pad 13',
	],

	other: [
		'Ремонт планшетов Asus',
		'Ремонт планшетов Lenovo',
		'Ремонт планшетов LG',
		'Ремонт планшетов Dell',
		'Ремонт планшетов HTC',
		'Ремонт планшетов Sony',
	],
}

const stepCount = document.getElementById('step-count')
const stepLength = document.getElementById('step-length')
const stepBlocks = document.querySelectorAll('.filters-step-block')
const buttonBack = document.querySelectorAll('.filters-step-block__button-back')
const radioInput = document.querySelectorAll('.filters-step-block__input')
const callbackBtns = document.querySelectorAll('.filters-step-block__button')

const firstBlock = document.querySelector('.filter-block-start')
const callbackBlock = document.querySelector('.filters-block-callback')
const mobileBlocks = document.querySelectorAll('.filter-block-mobile')
const tabletBlocks = document.querySelectorAll('.filter-block-tablet')
const modelsBlock = document.querySelector('.filters-block-models')
const modelsList = document.querySelector('.filters-models-list')
const tableBlock = document.querySelector('.filters-block-table')

let currentStep = 0
let arrayBlocks = [firstBlock, callbackBlock]
let currentDevice = 'mobile'

if (stepLength) stepLength.textContent = arrayBlocks.length

stepBlocks.forEach(block => {
	block.addEventListener('click', ({ target }) => {
		if (!target.matches('.filters-step-block__input')) return

		if (target.value === 'mobile') {
			arrayBlocks = [
				firstBlock,
				...mobileBlocks,
				modelsBlock,
				tableBlock,
				callbackBlock,
			]
			currentDevice = 'mobile'
		} else if (target.value === 'tablet') {
			arrayBlocks = [
				firstBlock,
				...tabletBlocks,
				modelsBlock,
				tableBlock,
				callbackBlock,
			]
			currentDevice = 'tablet'
		}

		if (target.getAttribute('name') === 'brand') {
			createFilterBlockModels(target.value)
		}

		if (target.getAttribute('name') === 'models') {
			tableBlock.querySelector(
				'.filters-step-block__title > span',
			).textContent = target.value
			selectedServices.device = deviceName
		}

		let currentBlock = arrayBlocks[currentStep]
		let nextBlock = arrayBlocks[currentStep + 1]

		if (currentStep <= arrayBlocks.length) {
			currentBlock.classList.add('_hidden')
			nextBlock.classList.remove('_hidden')
			currentStep = currentStep + 1
			stepCount.textContent = currentStep + 1
			stepLength.textContent = arrayBlocks.length
		}
	})
})

buttonBack.forEach(btn => {
	btn.addEventListener('click', () => {
		window.scrollTo(0, 0)
		if (currentStep + 1 === 3) {
			modelsList.innerHTML = ''
		}

		let currentBlock = arrayBlocks[currentStep]
		let prevBlock = arrayBlocks[currentStep - 1]

		if (currentStep > 0) {
			currentBlock.classList.add('_hidden')
			prevBlock.classList.remove('_hidden')
			currentStep = currentStep - 1
			stepCount.textContent = currentStep + 1
			stepLength.textContent = arrayBlocks.length
		}
	})
})

callbackBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		window.scrollTo(0, 0)
		arrayBlocks.forEach(block => {
			block.classList.add('_hidden')
		})
		arrayBlocks[arrayBlocks.length - 1].classList.remove('_hidden')
		currentStep = arrayBlocks.length - 1
		stepCount.textContent = currentStep + 1
		stepLength.textContent = arrayBlocks.length
	})
})

function createFilterBlockModels(model) {
	const title = modelsBlock.querySelector('.filters-step-block__title > span')

	if (currentDevice === 'mobile') {
		title.textContent = 'телефона'
		mobileModels[model].forEach((item, index) => {
			modelsList.insertAdjacentHTML('beforeend', createItemModel(item, index))
		})
	} else if (currentDevice === 'tablet') {
		title.textContent = 'планшета'
		tabletModels[model].forEach((item, index) => {
			modelsList.insertAdjacentHTML('beforeend', createItemModel(item, index))
		})
	}
	function createItemModel(item, index) {
		return `<li class="filters-models-list__item">
	<input class="filters-step-block__input" type="radio" id="filters-${index}" value="${item}" name="models">
	<label for="filters-${index}">
		<span class="filters-models-list__title">${item}</span>
	</label>
</li>`
	}
}
