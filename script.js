const headerPara = document.querySelector(".header-para");
const numBtns = document.querySelectorAll(".number-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const equalBtn = document.querySelector(".equal-btn");
const clearBtn = document.querySelector(".clear-btn");
const undoBtn = document.querySelector(".undo-btn");
let firstNum, operator, secondNum, displayValue;
let numBtnsArr = [];
let operatorBtnsArr = [];

function operate(firstNum, operator, secondNum) {
  if (operator === "+") return +firstNum + +secondNum;
  if (operator === "-") return firstNum - secondNum;
  if (operator === "*") return firstNum * secondNum;
  if (operator === "/" && secondNum === "0") return "Nice try ; )";
  if (operator === "/") return firstNum / secondNum;
}

function checkValueQty(str) {
  if (str.toString().includes("."))
    return str.toString().split(".")[1].length > 3;
}

function getFirstNum(str) {
  return str.split(" ")[0];
}

function getSecondNum(str) {
  return str.split(" ")[2];
}

function setNumber(val) {
  this.textContent = val;
  if (firstNum && !secondNum && this.textContent === ".") return;
  if (
    (displayValue && displayValue === firstNum && !operator) ||
    headerPara.textContent === "Nice try ; )"
  ) {
    headerPara.textContent = "";
    firstNum = displayValue = false;
  }
  if (
    headerPara.textContent.includes(".") &&
    this.textContent === "." &&
    !firstNum
  )
    return;
  if (
    secondNum &&
    secondNum.startsWith("0") &&
    !secondNum.includes(".") &&
    this.textContent !== "."
  )
    return;
  if (headerPara.textContent === "0" && this.textContent !== "." && !firstNum)
    headerPara.textContent = "";
  if (secondNum && secondNum.includes(".") && this.textContent === ".") return;
  if (
    headerPara.textContent.includes(".") &&
    headerPara.textContent.split(".")[1].length > 4 &&
    !operator
  )
    return;
  if (
    secondNum &&
    secondNum.includes(".") &&
    secondNum.split(".")[1].length > 4
  )
    return;
  headerPara.textContent += this.textContent;
  if ((firstNum || firstNum === +"0") && operator) {
    secondNum = getSecondNum(headerPara.textContent);
  }
}

function setOperator(val) {
  this.textContent = val;
  if (headerPara.textContent === "Nice try ; )") return;
  if (secondNum === "0" && operator === "/") {
    headerPara.textContent = "Nice try ; )";
    firstNum = operator = secondNum = false;
    return;
  }
  if ((firstNum || firstNum === +"0") && operator && secondNum) {
    setDisplayValue();
    operator = this.textContent;
    headerPara.textContent += ` ${operator} `;
    return;
  }
  operator = this.textContent;
  firstNum = getFirstNum(headerPara.textContent);
  headerPara.textContent = `${firstNum} ${operator} `;
}

function setDisplayValue() {
  if ((!firstNum && firstNum !== 0) || !operator || !secondNum) return;
  displayValue = operate(firstNum, operator, secondNum);
  if (displayValue === "Nice try ; )") {
    headerPara.textContent = `${displayValue}`;
    secondNum = false;
    return;
  }
  if (checkValueQty(displayValue)) {
    headerPara.textContent = Number.parseFloat(displayValue).toFixed(5);
  } else {
    headerPara.textContent = `${displayValue}`;
  }
  firstNum = displayValue;
  secondNum = false;
}

function setClearedDisplay() {
  firstNum = operator = secondNum = false;
  headerPara.textContent = "0";
}

function undoAction() {
  if (headerPara.textContent === "0") {
    setClearedDisplay();
  }
  if (headerPara.textContent === "Nice try ; )") return;
  if (headerPara.textContent.length === 1) {
    headerPara.textContent = "0";
    firstNum = false;
    return;
  }
  if (headerPara.textContent.endsWith(" "))
    headerPara.textContent = headerPara.textContent.slice(0, -3);
  else headerPara.textContent = headerPara.textContent.slice(0, -1);
  secondNum = getSecondNum(headerPara.textContent);
}

numBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    setNumber(e.target.textContent);
  });
  numBtnsArr.push(btn.textContent);
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    setOperator(e.target.textContent);
  });
  operatorBtnsArr.push(btn.textContent);
});

clearBtn.addEventListener("click", setClearedDisplay);

equalBtn.addEventListener("click", function () {
  if ((firstNum || firstNum === +"0") && operator && secondNum) {
    setDisplayValue();
    operator = false;
  }
});

window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (numBtnsArr.includes(e.key)) {
    setNumber(e.key);
  }
  if (operatorBtnsArr.includes(e.key)) setOperator(e.key);
  if (e.key === "Enter") {
    setDisplayValue();
    operator = false;
  }
  if (e.key === "c") setClearedDisplay();
  if (e.key === "Backspace") undoAction();
});

undoBtn.addEventListener("click", undoAction);
