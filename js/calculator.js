const calButtons = document.querySelectorAll('.calc-button');
let screen = document.querySelector('.screen');
let temp = '0';
let result = 0;
let previousOperation = null;

// function buttonClicked(value) {
//   if (isNaN(value)) {
//     //this is a symbol
//     console.log(typeof temp + 'this is a symbol');
//     handleSymbols();
//   } else {
//     //this is a symbol
//     console.log(typeof temp + 'this is a number');
//     handleNums();
//   }
// }
function buttonClicked(value) {
  if (isNaN(value)) {
    //this is a symbol
    handleSymbols(value);
  } else {
    //this is a symbol
    handleNums(value);
  }
  screen.innerText = temp;
}

function handleNums(numString) {
  if (temp === '0') {
    temp = numString;
  } else {
    temp += numString;
  }
}

function handleSymbols(symbol) {
  switch (symbol) {
    case 'C':
      temp = '0';
      result = 0;
      break;
    case '←':
      if (temp.length === 1) {
        temp = '0';
      } else {
        temp = temp.substring(0, temp.length - 1);
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
      keepMathGoing(parseInt(temp));
      previousOperation = null;
      temp = result;
      result = 0;
      break;
  }
}

function handleMath(symbol) {
  if (temp === '0') {
    return;
  }
  const tempNum = parseInt(temp); //or do +temp
  if (result === 0) {
    result = tempNum;
  } else {
    keepMathGoing(tempNum);
    console.log(result);
  }

  previousOperation = symbol; //keep the previous operation in track

  temp = '0';
}

function keepMathGoing(tempNum) {
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

function init() {
  calButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      buttonClicked(event.target.innerText);
    });
  });
}

init();
