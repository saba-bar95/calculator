let firstNum;
let secondNum;
let operator;

function add(a, b) {
  return a + b;
}

function subract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(firstNum, operator, secondNum) {
  if (operator === "+") return add(firstNum, secondNum);
  if (operator === "-") return subract(firstNum, secondNum);
  if (operator === "*") return multiply(firstNum, secondNum);
  if (operator === "/") return divide(firstNum, secondNum);
}

// console.log(operate(firstNum, operator, secondNum));

// console.log(operate(5, "/", 8));
// console.log(operate(10, "*", 10));
// console.log(operate(10, "-", 10));
// console.log(operate(1055, "/", 10));
