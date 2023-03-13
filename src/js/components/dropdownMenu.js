document.addEventListener('DOMContentLoaded', () => {
	const menuBtns = document.querySelectorAll('.dropdown__nav-button')
	const drops = document.querySelectorAll('.dropdown__nav-item')
	const closeBtn = document.querySelectorAll('.dropdown-close')

	menuBtns.forEach(el => {
		el.addEventListener('click', e => {
			let currentBtn = e.currentTarget
			let drop = currentBtn.closest('.dropdown__nav-item')

			menuBtns.forEach(el => {
				if (el !== currentBtn) {
					el.classList.remove('_active')
				}
			})

			drops.forEach(el => {
				if (el !== drop) {
					el.classList.remove('_active')
				}
			})

			drop.classList.toggle('_active')
			currentBtn.classList.toggle('_active')
		})
	})

	closeBtn.forEach(btn =>
		btn.addEventListener('click', () => {
			menuBtns.forEach(el => {
				el.classList.remove('_active')
			})

			drops.forEach(el => {
				el.classList.remove('_active')
			})
		}),
	)

	document.addEventListener('click', e => {
		if (!e.target.closest('.dropdown__nav-list')) {
			menuBtns.forEach(el => {
				el.classList.remove('_active')
			})

			drops.forEach(el => {
				el.classList.remove('_active')
			})
		}
	})
})
