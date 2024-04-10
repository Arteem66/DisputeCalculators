const bgVideo = document.getElementById('bgvideo')
const changeBtn = document.querySelector('.change-them')

if (localStorage.getItem('bg')){
	bgVideo.classList.remove('hidden')
}

changeBtn.addEventListener('click', () => {
		if (!bgVideo.classList.contains('hidden')) {
			bgVideo.classList.add('hidden-active')
			bgVideo.classList.remove('hidden-inactive')
			changeBtn.textContent = 'Сделать фон динамическим'
			setTimeout(() => {
				bgVideo.classList.toggle('hidden')
			}, 1000)
			localStorage.removeItem('bg')
		} else {
			bgVideo.classList.toggle('hidden')
			bgVideo.classList.remove('hidden-active')
			bgVideo.classList.add('hidden-inactive')
			changeBtn.textContent = 'Сделать фон статичным'
			localStorage.setItem('bg', 'dynamic')
		}
})

