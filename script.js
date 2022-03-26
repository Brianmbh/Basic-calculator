class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
}

clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
}

delete() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1)
}

appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString
}

chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.currentOperand !== '') {
        this.compute()
    }
    this.Operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
}

compute() {
    let computation
    var prev = parseFloat(this.previousOperand)
    var current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
            computation = prev + current
            break
            case '-':
                computation = prev - current
                break
                case '*':
                    computation = prev * current
                    break
                    case '÷':
                        computation = prev / current
                    break
                    default:
                        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
}

getDisplayNumber(number){
    var stringNumber = number.toString()
    var integerDigits = parseFloat(stringNumber.split('.')[0])
    let integerDisplay
    if (isNaN(integerDigits)) {
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {
maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
}

updateDisplay() {
this.currentOperandTextElement.innerText = 
this.getDisplayNumber(this.currentOperand)
if (this.operation != null){
    this.previousOperandTextElement.innerText = 
    `${this.getDisplayNumber(previousOperand)} ${this.Operation}`
} else {
    this.previousOperandTextElement.innerText = ''
}
}
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelectorAll('[data-equals]')
const deleteButton = document.querySelectorAll('[data-delete]')
const allClearButton = document.querySelectorAll('[data-all-clear]')
const previousOperandTextElement = document.querySelectorAll('[data-previous-operand]')
const currentOperandTextElement = document.querySelectorAll('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.calculator()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})