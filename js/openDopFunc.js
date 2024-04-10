const dopFuncBtn = document.querySelector('.dop-func')
const dopFunc = document.querySelectorAll('.calc-dop-func')

if (localStorage.getItem('dopFunc')){
  dopFunc.forEach(item => {
    item.classList.remove('hidden')
  })
}

dopFuncBtn.addEventListener('click', () => {
	dopFunc.forEach(item => {
    if (item.classList.contains('hidden')){
      item.classList.add('hidden-inactive')
      item.classList.remove('hidden-active')
      item.classList.toggle('hidden')
      dopFuncBtn.textContent = 'Убрать дополнительные функции'
      localStorage.setItem('dopFunc', 'open')
    }else{
      item.classList.add('hidden-active')
      item.classList.remove('hidden-inactive')
      setTimeout(() => {
        item.classList.toggle('hidden')
      },1000)
      dopFuncBtn.textContent = 'Дополнительные функции'
      localStorage.removeItem('dopFunc')
    }
  })
})
