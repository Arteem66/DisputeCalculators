const number = document.querySelectorAll('.number')
const functional = document.querySelectorAll('.functional')
const specFunctional = document.querySelectorAll('.specFunctional')
const clear = document.getElementById('clear')

const clearBtn = document.getElementById('clear')
const strResult = document.querySelector('.calc-result')
const strExpression = document.querySelector('.calc-expression')

// let firstNum = 0;
let result = null
let lastResult = null

number.forEach(num => {
	num.addEventListener('click', () => {
		result = addStrNumber(num.value, strExpression.value)
		strExpression.value = result
		strResult.textContent = eval(strExpression.value)
	})
})

functional.forEach(func => {
	func.addEventListener('click', () => {
		let resultCheak
		switch (func.id) {
			case 'fraction':
				if (isNaN(strExpression.value)) {
					fullClear()
				} else {
						let answerStr = 1 / strExpression.value
						if(answerStr.toString().length <= 10){
							strExpression.value = answerStr
						}else{
							strExpression.value = answerStr.toString().substring(0, 10)
						}
						hideResult()
				}
				break
			case 'integral':
				if (isNaN(strExpression.value)){
					fullClear()
				}else{
					let integral = 1
					for (let i = 1; i <= strExpression.value; i++) {
						integral *= i
					}
					strResult.textContent = integral
					strExpression.value = integral
					hideResult()
				}
				break
			case 'squaring':
				if (isNaN(strExpression.value)){
					fullClear()
				}else{
					resultCheak = cheakLastSign(strExpression.value.toString())
					if (resultCheak) {
						strExpression.value += '**'
					}
				}
				break
			case 'division':
				resultCheak = cheakLastSign(strExpression.value.toString())
				if (resultCheak) {
					strExpression.value += '/'
				}
				break
			case 'multiply':
				resultCheak = cheakLastSign(strExpression.value.toString())
				if (resultCheak) {
					strExpression.value += '*'
				}
				break
			case 'minus':
				resultCheak = cheakLastSign(strExpression.value.toString(), 'minus')
				if (resultCheak) {
					strExpression.value += '-'
				}
				break
			case 'plus':
				resultCheak = cheakLastSign(strExpression.value.toString())
				if (resultCheak) {
					strExpression.value += '+'
				}
				break
			case 'equally':
				strResult.classList.add('anim-result')
				strExpression.value = eval(result)
				hideResult()
				clearBtn.textContent = 'CL'
				lastResult = strResult.textContent
				// strExpression.classList.remove('more-number')
				break
		}
	})
})

specFunctional.forEach(specFunc => {
	specFunc.addEventListener('click', () => {
		switch (specFunc.id) {
			case 'root':
				if (isNaN(strExpression.value)) {
					fullClear()
				} else {
					let root = Math.sqrt(strExpression.value)
					if (root.toString().length > 10){
						strExpression.value = root.toString().substring(0, 10)
						strResult.textContent = strExpression.value
					}else{
						strExpression.value = root
						strResult.textContent = strExpression.value
					}
				}
				break
			case 'clearOneSymbol':
				if (strExpression.value.toString().length != 0) {
					if (strExpression.value.toString().length > 1) {
						strExpression.value = strExpression.value
							.toString()
							.substring(0, strExpression.value.toString().length - 1)
						strResult.textContent = eval(strExpression.value)
					} else {
						strExpression.value = 0
						strResult.textContent = 0
					}
				}
				break
			case 'clearStr':
				if (!lastResult){
					fullClear()
				}else{
					strExpression.value = lastResult
					strResult.textContent = lastResult
				}
				break
			case 'clear':
				fullClear()
				break
			case 'changeSign':
				if (isNaN(strExpression.value)) {
					fullClear()
				} else {
					strExpression.value *= -1
					strResult.textContent = strExpression.value
				}
				break
			case 'procent':
				if (isNaN(strExpression.value)) {
					fullClear()
				} else {
					strExpression.value /= 100
					strResult.textContent = strExpression.value
					hideResult()
				}
				break
			case 'dot':
				resultCheak = cheakLastSign(strExpression.value.toString())
				if (resultCheak) {
					strExpression.value += '.'
					strResult.textContent += '.'
				}
				break
		}
	})
})

// clear.onclick = () => {
// 	fullClear()
// }

function hideResult() {
	strResult.classList.add('anim-result')
	setTimeout(() => {
		strResult.classList.remove('anim-result')
		strResult.textContent = ''
	}, 400)
}

function fullClear(){
	strResult.textContent = null
	result = null
	strExpression.value = '0'
	strExpression.classList.remove('more-number')
	strExpression.classList.remove('more-number-big')
}

function cheakLastSign(str, sign) {
	if (str.length != 1) {
		let strLastSign = str.substring(str.length - 1)
		if (
			sign == 'minus' &&
			strLastSign != '+' &&
			strLastSign != '-' &&
			strLastSign != '/' &&
			strLastSign != '^' &&
			strLastSign != '.'
		) {
			return true
		}
		if (
			strLastSign != '+' &&
			strLastSign != '-' &&
			strLastSign != '*' &&
			strLastSign != '/' &&
			strLastSign != '^' &&
			strLastSign != '.'
		) {
			return true
		} else {
			if (str.substring(str.length - 2) == '*-'){
				return false
			}else{
				strExpression.value = str.substring(0, str.length - 1)
				return true
			}
		}
	}
	return true
}

function addStrNumber(number, firstNum) {
	if (firstNum.length >= 9){
		strExpression.classList.add('more-number')
		strExpression.classList.remove('more-number-big')
	}
	if (firstNum.length >= 15){
		strExpression.classList.remove('more-number')
		strExpression.classList.add('more-number-big')
	}
	if (strResult.textContent.length == 22 || firstNum.length == 19) {
		return firstNum
	}
	if (firstNum == 0) {
		strExpression.classList.remove('more-number')
		strExpression.classList.remove('more-number-big')
		return parseInt(firstNum) + parseInt(number)
	} else {
		return firstNum + number
	}
}
