document.addEventListener('DOMContentLoaded', () => {
	const filter = document.querySelector('.filter')

	if (filter) {
		const items = filter.querySelectorAll('.block-filter')

		items.forEach(item => {
			item.addEventListener('click', e => {
				let currentBtn = e.currentTarget
				let drop = currentBtn.closest('.block-filter')

				items.forEach(item => {
					if (item !== drop) {
						item
							.querySelector('.block-filter__dropdown')
							.classList.remove('_active')
						item
							.querySelector('.block-filter__icon')
							.classList.remove('_active')
					}
				})

				item
					.querySelector('.block-filter__dropdown')
					.classList.toggle('_active')
				item.querySelector('.block-filter__icon').classList.toggle('_active')

				if (e.target.classList.contains('block-filter__item')) {
					item.querySelector('.block-filter__type').textContent =
						e.target.textContent
				}
			})
		})

		window.addEventListener('click', e => {
			const target = e.target
			if (!target.closest('.block-filter') && !target.closest('.filter')) {
				items.forEach(item => {
					item
						.querySelector('.block-filter__dropdown')
						.classList.remove('_active')
					item.querySelector('.block-filter__icon').classList.remove('_active')
				})
			}
		})
	}
})
