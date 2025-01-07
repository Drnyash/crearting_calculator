const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let currentOperator = '';
let firstOperand = null;

function updateScreen(value) {
  screen.textContent = value;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;
    if(buttonText == 'C'){
        currentInput = '';
        firstOperand = null;
        currentOperator = '';
        updateScreen('0');
        return;
    }
    if (buttonText === '+/-') {
        currentInput = currentInput[0] === '-' ? currentInput.slice(1) : '-' + currentInput;
        updateScreen(currentInput);
        return;
    }
        
    if (buttonText == '%') {
      currentInput = (parseFloat(currentInput) / 100).toString();
      updateScreen(currentInput);
      return;
    }
    if (['+', '-', 'x', '/'].includes(buttonText)) {
      if (firstOperand == null) {
        firstOperand = parseFloat(currentInput);
      } else if (currentOperator) {
        firstOperand = calculate(firstOperand, parseFloat(currentInput), currentOperator);
      }
      currentOperator = buttonText;
      currentInput = '';
      return;
    }
    if (buttonText == '=') {
      if (firstOperand !== null && currentOperator) {
        currentInput = calculate(firstOperand, parseFloat(currentInput), currentOperator).toString();
        firstOperand = null;
        currentOperator = '';
        updateScreen(currentInput);
      }
      return;
    }
    if (buttonText == '.') {
      if (!currentInput.includes('.')) {
        currentInput += '.';
        updateScreen(currentInput);
      }
      return;
    }
    currentInput += buttonText;
    updateScreen(currentInput);
  });
});

function calculate(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case 'x':
      return a * b;
    case '/':
      if (b == 0) {
        alert("Qate:0-ge bolinbeidi");
        return '';
      }
      return a / b;
    default:
      return b;
    }
}

// if(previousValue && currentValue){
//     currentInput = calculate(previousInput,currentInput,operator)
//     display.value = currentInput
// } 


