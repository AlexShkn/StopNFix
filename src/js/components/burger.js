let iconMenu = document.querySelector('.icon-menu')
let menuBody = document.querySelector('.menu__body')

function toggleMenu() {
	if (iconMenu != null) {
		document.body.classList.toggle('_lock')
		iconMenu.classList.toggle('_active')
		menuBody.classList.toggle('_active')

		if (menuBody.classList.contains('_active')) {
			iconMenu.setAttribute('aria-label', 'Закрыть меню')
			iconMenu.setAttribute('aria-expanded', 'true')
		} else {
			iconMenu.setAttribute('aria-label', 'Открыть меню')
			iconMenu.setAttribute('aria-expanded', 'false')
		}
	}
}

iconMenu.addEventListener('click', () => {
	toggleMenu()
})
