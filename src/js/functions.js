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
const url = window.location.href
const locateName = url.substring(url.lastIndexOf('/') + 1)

function currentNavLinkChange() {
	const modelName = JSON.parse(localStorage.getItem('device-search'))

	if (locateName === 'page-device-repair.html') {
		document.title = `Ремонт ${modelName.searchBrand} ${modelName.searchModel}`
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
		const modelName = JSON.parse(localStorage.getItem('device-search'))
		selectedServices.device = `${modelName.searchType} ${modelName.searchBrand} ${modelName.searchModel}`
		selectedServices.name = nameValue
		selectedServices.phone = phoneValue

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
// Убираем кнопки секции about в секции device-selection

const advantagesBtns = document.querySelectorAll('.advantages__button')
if (window.location.pathname === '/page-device-selection.html') {
	advantagesBtns.forEach(btn => (btn.style.display = 'none'))
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
		'Galaxy Note 9',
		'Galaxy Alpha(G850F)',
		'Galaxy A8 Star',
		'Galaxy A7 2018 (A750)',
		'Galaxy A9 2018 (A920)',
		'Galaxy Note 9',
		'Galaxy Alpha(G850F)',
		'Galaxy A8 Star',
		'Galaxy A7 2018 (A750)',
		'Galaxy A9 2018 (A920)',
		'Galaxy Note 9',
		'Galaxy Alpha(G850F)',
		'Galaxy A8 Star',
		'Galaxy A7 2018 (A750)',
		'Galaxy A9 2018 (A920)',
		'Galaxy Note 9',
		'Galaxy Alpha(G850F)',
		'Galaxy A8 Star',
		'Galaxy A7 2018 (A750)',
		'Galaxy A9 2018 (A920) ',
	],
	xiaomi: [
		'Redmi 3',
		'Redmi Pro',
		'Redmi 4',
		'Redmi 4 Pro',
		'Redmi 5',
		'Redmi 5 Plus',
		'Redmi Note',
		'Redmi 3',
		'Redmi Pro',
		'Redmi 4',
		'Redmi 4 Pro',
		'Redmi 5',
		'Redmi 5 Plus',
		'Redmi Note',
	],
	huawei: [
		'Honor 7A',
		'Nova 2',
		'Honor 8',
		'Honor 9',
		'Honor 7A',
		'Nova 2',
		'Honor 8',
		'Honor 9',
		'Honor 7A',
		'Nova 2',
		'Honor 8',
		'Honor 9',
	],
	другие: ['Acer', 'Asus', 'LG', 'ZTE', 'HTC', 'Meizu'],
}
const tabletModels = {
	ipad: ['iPad mini 3', 'iPad mini 4', 'iPad Pro', 'iPad Air'],
	samsung: [
		'Galaxy Tab 1',
		'Galaxy Tab 2',
		'Galaxy Tab 3',
		'Galaxy Tab 4',
		'Galaxy Tab 5',
		'Galaxy Tab 6',
	],
	xiaomi: ['Mi Pad', 'Mi Pad 2', 'Mi Pad 3', 'Mi Pad 4', 'Mi Pad 4 Plus'],

	huawei: [
		'Media Pad 7',
		'Media Pad 8',
		'Media Pad 9',
		'Media Pad 10',
		'Media Pad 11',
		'Media Pad 12',
		'Media Pad 13',
	],

	другие: ['Asus', 'Lenovo', 'LG', 'Dell', 'HTC', 'Sony'],
}

//====================================================================
// Панель поиска девайса
let localStoragePack

const searchButton = document.querySelector('#filter-btn')
const searchType = document.querySelector('[data-search-type]')
const searchBrand = document.querySelector('[data-search-brand]')
const searchBrandList = document.querySelector('[data-search-brand-list]')
const searchModel = document.querySelector('[data-search-model]')
const searchModelList = document.querySelector('[data-search-model-list]')
const searchBlocksFilter = document.querySelectorAll('.block-filter')
const searchFilterItems = document.querySelectorAll('.block-filter__item')
const repairItemWrapper = document.querySelector(
	'.device-repair-main__description',
)
const breadCrumbsLink = document.querySelector('#bread-crumbs-link > span')

if (searchButton) {
	searchFilterItems.forEach(item => {
		item.addEventListener('click', e => {
			if (item.textContent === 'Мобильный телефон') {
				const deviceNames = Object.keys(mobileModels)
				deviceNames.forEach(name => {
					createSearchDropdownList(searchBrandList, name)
				})
			}

			if (item.textContent === 'Планшет') {
				const deviceNames = Object.keys(tabletModels)
				deviceNames.forEach(name => {
					createSearchDropdownList(searchBrandList, name)
				})
			}
		})
	})

	if (searchBlocksFilter) {
		searchBlocksFilter.forEach(block => {
			block.addEventListener('click', e => {
				if (e.target.closest('.search-brand-list')) {
					const brandName = e.target.textContent

					if (searchType.textContent === 'Мобильный телефон') {
						mobileModels[brandName].forEach(name => {
							createSearchDropdownList(searchModelList, name)
						})
					}

					if (searchType.textContent === 'Планшет') {
						tabletModels[brandName].forEach(name => {
							createSearchDropdownList(searchModelList, name)
						})
					}
				}
			})
		})
	}

	function createSearchDropdownList(container, deviceName) {
		container.insertAdjacentHTML(
			'beforeend',
			`
		<div class="block-filter__item">${deviceName}</div>
		`,
		)
	}

	searchButton.addEventListener('click', e => {
		e.preventDefault()

		if (
			!(
				searchType.textContent === 'Выберите устройство' &&
				searchBrand.textContent === 'Выберите марку' &&
				searchModel.textContent === 'Выберите модель'
			)
		) {
			// const typeDevice = searchDeviceType.split('-')[1]
			const deviceSearch = {
				searchType: searchType.textContent,
				searchBrand: capitalizeFirstLetter(searchBrand.textContent),
				searchModel: searchModel.textContent,
			}
			localStorage.setItem('device-search', JSON.stringify(deviceSearch))
			window.document.location = './page-device-repair.html'
		}
	})
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

const renderRepairDeviceItem = ({ searchType, searchBrand, searchModel }) => {
	const deviceName =
		searchBrand === 'Другие' ? searchModel : `${searchBrand} ${searchModel}`
	breadCrumbsLink.textContent = deviceName

	createRepairDeviceItem(deviceName)
}

function createRepairDeviceItem(deviceName) {
	repairItemWrapper.insertAdjacentHTML(
		'beforeend',
		`
		<div class="device-repair-main__image">
		<img src="img/models/mobile-model.jpg" alt="">
	</div>
	<h1 id="device-model-name" class="device-repair-main__model-name">Ремонт <span>${deviceName}</span></h1>
	`,
	)
}

if (locateName === 'page-device-repair.html') {
	localStoragePack = JSON.parse(localStorage.getItem('device-search'))
	renderRepairDeviceItem(localStoragePack)
}

//====================================================================

const linkRepairItemsName = document.querySelectorAll(
	'.dropdown__inner-nav-link > a',
)

const showMore = document.querySelector('.button_show-more')

linkRepairItemsName.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault()
		const typeDevice = link.closest('.dropdown__nav-item').id.split('-')[1]
		const linkId = link.id.split('-')[1]
		const deviceRepair = {
			deviceType: typeDevice,
			deviceBrand: linkId,
		}
		localStorage.setItem('device-repair', JSON.stringify(deviceRepair))
		window.document.location = './page-device-selection.html'
	})
})

const deviceList = document.querySelector('.device-list')

const renderDeviceItem = ({ deviceType, deviceBrand }) => {
	if (deviceType === 'mobile' && mobileModels[deviceBrand]) {
		// createPaginationList(mobileModels[deviceBrand])
		showMoreItems(mobileModels[deviceBrand])

		mobileModels[deviceBrand].forEach(device => {
			createDeviceItem(device)
		})
	}

	if (deviceType === 'tablet' && tabletModels[deviceBrand]) {
		showMoreItems(tabletModels[deviceBrand])
		// createPaginationList(tabletModels[deviceBrand])
		tabletModels[deviceBrand].forEach(device => {
			createDeviceItem(device)
		})
	}
}

function createDeviceItem(deviceName) {
	deviceList.insertAdjacentHTML(
		'beforeend',
		`
	<li class="device-list__item">
	<article class="device-card">
		<div class="device-card__image">
			<img src="img/models/galaxy-a3.jpg" alt="">
		</div>
		<h2 class="device-card__model-name">${deviceName}</h2>
		<a href="page-device-repair.html" class="device-card__link button">Ремонтировать</a>
	</article>
</li>
	`,
	)
}

if (locateName === 'page-device-selection.html') {
	localStoragePack = JSON.parse(localStorage.getItem('device-repair'))
	renderDeviceItem(localStoragePack)
}

//====================================================================
// Показать еще

function showMoreItems(devices) {
	let items
	let pageIndex = 0

	window.innerWidth > 767.98 ? (items = 10) : (items = 6)

	if (showMore) {
		let currentPage = 0

		const paginationItems = document.querySelectorAll(
			'.selection-pagination__item',
		)

		// if (paginationItems.length > 0) {
		// 	paginationItems[paginationItems.length - 1].textContent = devices.length
		// 	paginationItems[paginationItems.length - 1].style.display = 'block'

		// 	paginationItems.forEach((item, index) => {
		// 		item.addEventListener('click', () => {
		// 			currentPage = index
		// 			pageIndex = index
		// 			changeCurrentPage()
		// 		})
		// 	})

		// 	function changeCurrentPage() {
		// 		paginationItems.forEach(item => {
		// 			item.classList.remove('_current')
		// 		})

		// 		paginationItems[currentPage].classList.add('_current')
		// 	}

		// 	changeCurrentPage()
		// }
		addNewItems(pageIndex, items, devices)
	}
}

function addNewItems(pageIndex, items, devices) {
	showMore.addEventListener('click', () => {
		window.innerWidth > 767.98 ? (items += 5) : (items += 3)
		const currentPageNum = pageIndex * items

		const array = Array.from(document.querySelector('.device-list').children)
		const visItems = array.slice(currentPageNum, items)

		visItems.forEach(el => el.classList.add('_visible'))

		if (visItems.length === devices.length) {
			showMore.style.display = 'none'
		}
	})
}

// function createPaginationList(devices) {
// 	devices.forEach((device, index) => {
// 		paginationList.insertAdjacentHTML(
// 			'beforebegin',
// 			`
// 				<div class="selection-pagination__item">${index + 1}</div>
// 			`,
// 		)
// 	})
// }

//--------------------------------------------------------------------

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

//====================================================================

//====================================================================
// Lazy Load
// <picture>
// 	<source type="image/webp" data-srcset="@img/1x1.png">
// 	<img data-src="@img/services/appartment.jpg" src="@img/1x1.png" alt="Квартира">
// </picture>
// class lazy-image на обертку картинки

const lazyImages = document.querySelectorAll(
	'img[data-src],source[data-srcset]',
)
const loadMapBlocks = document.querySelectorAll('._load-map')

const currentMapLoad = (maps, options) => {
	const observer = new IntersectionObserver(trueCallback, options)
	observer.disconnect()
	document.addEventListener('scroll', trigScroll)
	document.addEventListener('load', trigScroll)

	function trueCallback(entries) {
		entries.forEach(entry => {
			const intersecting = entry.isIntersecting
			const mapUrl = entry.target.dataset.map

			if (intersecting) {
				if (mapUrl && !entry.target.classList.contains('_loaded')) {
					entry.target.insertAdjacentHTML(
						'beforeend',
						`<iframe src="${mapUrl}" width="100%" height="340" frameborder="0" </iframe>`,
					)
					entry.target.classList.add('_loaded')
				}
			}
		})
	}

	function trigScroll() {
		if (maps) {
			maps.forEach(function (element) {
				observer.observe(element)
			})
		}
	}
}

const currentImageLoad = (images, options) => {
	const observer = new IntersectionObserver(trueCallback, options)
	observer.disconnect()
	document.addEventListener('scroll', trigScroll)
	document.addEventListener('load', trigScroll)

	function trueCallback(entries) {
		entries.forEach(entry => {
			const intersecting = entry.isIntersecting

			if (intersecting) {
				if (entry.target.dataset.src) {
					entry.target.src = entry.target.dataset.src
					entry.target.removeAttribute('data-src')
				} else if (entry.target.dataset.srcset) {
					entry.target.src = entry.target.dataset.srcset
					entry.target.removeAttribute('data-srcset')
				}
			}
		})
	}

	function trigScroll() {
		if (images) {
			images.forEach(function (element) {
				observer.observe(element)
			})
		}
	}
}

currentImageLoad(lazyImages, {
	rootMargin: '-20% 0% -20% 0%',
	threshold: 0,
})
currentMapLoad(loadMapBlocks, {
	rootMargin: '-20% 0% -20% 0%',
	threshold: 0,
})

//====================================================================
