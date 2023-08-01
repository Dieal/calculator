let num1 = 0;
let num2 = 0;
let operator;
let displayNumber = 0;
let calculation = false;
let isNumberDisplayed = false;
let verboseOperation = "";

// Elements queries and Listeners
const operationDisplay = document.querySelector(".display-operation");
const display = document.querySelector(".display-number");

const digits = document.querySelectorAll(".digit");
digits.forEach((button) => button.addEventListener("click", e => {
    let digit = e.target.textContent;
    if (digit === '.' && !dotValid()) return;
    if (isNumberDisplayed) {
        isNumberDisplayed = false;
        changeDisplayNumber(digit);
        return;
    }
    addDisplayNumber(digit);
}));

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", (e) => {
    clearData();
    resetDisplay();
});

const deleteButton = document.querySelector("#backspace");
deleteButton.addEventListener("click", (e) => {
    deleteLastDigit();
});
  
const operators = document.querySelectorAll(".operator");
operators.forEach((obj) => obj.addEventListener("click", (e) => {
    
    let op = e.target.textContent;
    if (displayNumber === "") return;

    // Doesn't do anything if the last digit of the displayed number is a dot
    if (displayNumber[displayNumber.length - 1] === ".") return;

    if (!calculation) {
        num1 = +displayNumber;
        clearDisplay();
        operator = op;
        calculation = true;
        verboseOperation = "" + num1 + " " + operator;
    } else {
        num2 = +displayNumber;
        if (num2 === 0 && operator === "/") {
            changeDisplayNumber("don't even try");
            clearData();
            return;
        };
        num1 = operate(operator, num1, num2);
        operator = op
        changeDisplayNumber(num1);
        isNumberDisplayed = true;
        if (op === '=' && (displayNumber !== 0 && displayNumber !== "")) {
            calculation = false;
            verboseOperation += " " + num2;
        } else {
            verboseOperation = "" + num1 + " " + operator;
        }
    }

    updateVerboseDisplay();

}));

// Utilities methods
function clearData() {
    num1 = 0;
    num2 = 0;
    operator = "";
    displayNumber = 0;
    calculation = false;
    verboseOperation = "";
    updateVerboseDisplay();
}

// Shows an empty display
function clearDisplay() {
    display.textContent = "";
    displayNumber = 0;
}

// Shows a 0 on the display
function resetDisplay() {
    displayNumber = 0;
    display.textContent = displayNumber
}

function changeDisplayNumber (num) {
    display.textContent = num;
    displayNumber = num;
}

function addDisplayNumber(num) {
    if (+displayNumber === 0) {
        displayNumber = num; 
    } else {
        displayNumber += "" + num;
    }
    display.textContent = displayNumber;
}

function deleteLastDigit() {
    if (+displayNumber === 0 || displayNumber === "") {
        return;
    }

    if (displayNumber.length === 1) {
        resetDisplay();
        return;
    }

    displayNumber = displayNumber.slice(0, displayNumber.length - 1);
    display.textContent = displayNumber;
}

function dotValid() {
    if (displayNumber === 0 || displayNumber === "") return false;
    if (countDigit(displayNumber, '.') >= 1) return false;
    if (isNumberDisplayed) return false;
    return true;
}

function countDigit(string, digit) {
    let result = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === digit) result++;
    }
    return result;
}

function updateVerboseDisplay() {
    operationDisplay.textContent = verboseOperation;
}

// Operations
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