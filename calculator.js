let num1 = 0;
let num2 = 0;
let operator;
let displayNumber = 0;
let calculation = false;
let isNumberDisplayed = false;

const operationDisplay = document.querySelector(".display-operation");

const digits = document.querySelectorAll(".digit");
digits.forEach((button) => button.addEventListener("click", e => {
    let value = e.target.textContent;
    if (isNumberDisplayed) {
        isNumberDisplayed = false;
        changeDisplayNumber(value);
        return;
    }
    addDisplayNumber(value);
}));

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", (e) => {
    clearData();
    resetDisplay();
});

const operators = document.querySelectorAll(".operator");
operators.forEach((obj) => obj.addEventListener("click", (e) => {
    
    let op = e.target.textContent;
    if (displayNumber === "") return;

    if (!calculation) {
        num1 = +displayNumber;
        clearDisplay();
        operator = op;
        calculation = true;
    } else {
        num2 = +displayNumber;
        if (num2 === 0 && operator === "/") {
            changeDisplayNumber("don't even try");
            clearData();
            return;
        };
        num1 = operate(operator, num1, num2);
        operator = op;
        changeDisplayNumber(num1);
        isNumberDisplayed = true;
        if (op === '=' && (displayNumber !== 0 && displayNumber !== "")) {
            calculation = false;
            return;
        }
    }

}));

function clearData() {
    num1 = 0;
    num2 = 0;
    operator = "";
    displayNumber = "";
    calculation = false;
}

function clearDisplay() {
    const display = document.querySelector(".display-number");
    display.textContent = "";
    displayNumber = 0;
}

function resetDisplay() {
    const display = document.querySelector(".display-number");
    displayNumber = "0";
    display.textContent = displayNumber
}

function changeDisplayNumber (num) {
    const display = document.querySelector(".display-number");
    display.textContent = num;
    displayNumber = num;
}

function addDisplayNumber(num) {
    const display = document.querySelector(".display-number");
    if (+displayNumber === 0) {
        displayNumber = num; 
    } else {
        displayNumber += "" + num;
    }
    display.textContent = displayNumber;
}

function operate (operator, num1, num2) {

    let result = 0;
    switch (operator) {
        case '+':
           result = add(num1, num2);
           break; 
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
    }

    return result;

}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function pow (base, exponent) {
    return base ** exponent;
}