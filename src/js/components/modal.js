const fixBlocks = document.querySelectorAll('.fix-block')

const disabledScroll = () => {
	document.body.classList.remove('_lock')
	fixBlocks.forEach(el => (el.style.paddingRight = 0))
	document.body.style.paddingRight = '0px'
}

const openModal = (triggerSelector, modalDataSelector) => {
	const triggersList = document.querySelectorAll(triggerSelector)
	const modal = document.querySelector(modalDataSelector)
	let paddingOffset = window.innerWidth - document.body.offsetWidth

	if (!triggersList || !modal) return
	triggersList.forEach(trigger =>
		trigger.addEventListener('click', e => {
			e.preventDefault()
			modal.classList.add('show')
			document.body.classList.add('_lock')
			fixBlocks.forEach(el => (el.style.paddingRight = paddingOffset + 'px'))
			document.body.style.paddingRight = paddingOffset + 'px'
		}),
	)
}

const closeModal = () => {
	const modals = document.querySelectorAll('.modal')
	if (!modals) return
	modals.forEach(el => {
		el.addEventListener('click', e => {
			if (
				e.target.closest('.modal__close') ||
				e.target.closest('.modal-form__button')
			) {
				e.preventDefault()
				el.classList.remove('show')
				disabledScroll()
			}
			if (!e.target.closest('.modal__content')) {
				el.classList.remove('show')
				disabledScroll()
			}
		})
	})
}

closeModal()

openModal('[data-btn-measuring]', '[data-modal-measuring]')

// openModal('.buttons__button_two', '.modal[data-modal="two"]')
