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
	const modals = document.querySelectorAll('[modal]')
	if (!modals) return
	modals.forEach(el => {
		el.addEventListener('click', e => {
			if (
				e.target.closest('[data-modal-close]') ||
				e.target.closest('[data-btn-close]')
			) {
				e.preventDefault()
				el.classList.remove('show')
				disabledScroll()
			}
			if (!e.target.closest('[modal-content]')) {
				el.classList.remove('show')
				disabledScroll()
			}
		})
	})
}

closeModal()

openModal('[data-btn-filter]', '[data-modal-filter]')
openModal('[data-btn-callback]', '[data-modal-callback]')
openModal('[data-btn-thanks]', '[data-modal-thanks]')

// openModal('.buttons__button_two', '.modal[data-modal="two"]')
