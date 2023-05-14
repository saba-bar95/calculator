const headerPara = document.querySelector(".header-para");
const numButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const equalBtn = document.querySelector(".equal-btn");
const clearBtn = document.querySelector(".clear-btn");

let firstNum, operator, secondNum, result;

function operate(firstNum, operator, secondNum) {
  if (operator === "+") return +firstNum + +secondNum;
  if (operator === "-") return firstNum - secondNum;
  if (operator === "*") return firstNum * secondNum;
  if (operator === "/" && secondNum === "0") return "LuL";
  if (operator === "/") return firstNum / secondNum;
}

function checkValueQty(str) {
  if (str.toString().includes("."))
    return str.toString().split(".")[1].length > 3;
}

function getSecondNum(str, oper) {
  return str.split(oper)[1];
}

function displayValue(val) {
  if (checkValueQty(val)) {
    headerPara.textContent = Number.parseFloat(val).toFixed(4);
    return;
  }
  headerPara.textContent = val;
}

numButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (!operator) {
      if (headerPara.textContent === "0") headerPara.textContent = "";
      headerPara.textContent += this.textContent;
      return;
    }
    // if (result) {
    //   headerPara.textContent = "";
    //   result = false;
    // }
    if (firstNum) {
      headerPara.textContent += this.textContent;
      secondNum = getSecondNum(headerPara.textContent, operator);
    }
  });
});

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    firstNum = headerPara.textContent;
    operator = this.textContent;
    headerPara.textContent += operator;
  });
});

equalBtn.addEventListener("click", function () {
  if (!firstNum) return;
  result = operate(firstNum, operator, secondNum);
  displayValue(result);
});

clearBtn.addEventListener("click", function () {
  firstNum = secondNum = operator = false;
  headerPara.textContent = "0";
});
