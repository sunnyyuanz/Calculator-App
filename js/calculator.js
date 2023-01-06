const calButtons = document.querySelectorAll('.calc-button');
let screen = document.querySelector('.screen');
let screenValue = '0';
let result = 0;
let previousOperation = null;

function buttonClicked(value) {
  if (isNaN(value)) {
    //this is a symbol
    handleSymbols(value);
  } else {
    //this is a symbol
    printNumToScreen(value);
  }
  screen.innerText = screenValue;
}

function printNumToScreen(numString) {
  if (screenValue === '0') {
    screenValue = numString;
  } else {
    screenValue += numString;
  }
}

function handleSymbols(symbol) {
  switch (symbol) {
    case 'C':
      screenValue = '0';
      result = 0;
      break;
    case '←':
      if (screenValue.length === 1) {
        screenValue = '0';
      } else {
        screenValue = screenValue.substring(0, screenValue.length - 1);
      }
      break;
    case '÷':
    case '×':
    case '−':
    case '+':
      handleMath(symbol);
      break;
    case '=':
      if (previousOperation === null) {
        result;
      }
      handleMath(symbol);
      previousOperation = null;
      screenValue = result;
      result = 0;
      break;
  }
}

function handleMath(symbol) {
  if (screenValue === '0') {
    return;
  }
  var tempNum = parseInt(screenValue); //or do +temp
  if (result === 0) {
    result = tempNum;
  } else {
    switch (previousOperation) {
      case '+':
        result += tempNum;
        break;
      case '×':
        result *= tempNum;
        break;
      case '−':
        result -= tempNum;
        break;
      case '÷':
        result /= tempNum;
        break;
    }
  }

  previousOperation = symbol; //keep the previous operation in track

  screenValue = '0';
}

function init() {
  calButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      buttonClicked(event.target.innerText);
    });
  });
}

init();
