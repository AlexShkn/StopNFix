import { throttle } from './../modules.js'

const goTop = document.querySelector('.go-to-top')

const showGoTopButton = () => {
	if (window.pageYOffset >= 800) {
		goTop.style.display = 'block'
	} else {
		goTop.style.display = 'none'
	}
}

document.addEventListener('scroll', throttle(showGoTopButton, 64))
goTop.addEventListener('click', e => {
	e.preventDefault()
	window.scrollTo(0, 0)
})
