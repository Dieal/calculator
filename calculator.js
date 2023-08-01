let num1 = 0;
let num2 = 0;
let operator;
let displayNumber = "";
let calculation = false;
let isNumberDisplayed = false;
let verboseOperation = "";

// Elements queries and Listeners
const operationDisplay = document.querySelector(".display-operation");
const display = document.querySelector(".display-number");

const digits = document.querySelectorAll(".digit");
digits.forEach((button) => button.addEventListener("click", e => {
    let digit = e.target.textContent;
    pressDigit(digit);
}));

document.addEventListener("keydown", e => {
    let digit = e.key;
    
    if (digit === "Backspace") {
        deleteLastDigit();
        return;
    }

    if (digit.toLocaleLowerCase() === "c") {
        clearData();
        resetDisplay();
        return;
    }

    // Regex that checks if the digit is a number or a decimal point
    if (isNumerical(digit) || digit === ".") {
        pressDigit(digit);
        return;
    }

    if (/[+\-*\/=]/.test(digit)) {
        pressOperator(digit);
        return;
    }

});

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
    pressOperator(op);
}));

// Utilities methods
function pressDigit (digit) {
    if (digit === '.' && !dotValid()) return;
    if (digit === "00" && (displayNumber == 0 || displayNumber === "" || isNumberDisplayed)) return;
    if (isNumberDisplayed) {
        isNumberDisplayed = false;
        changeDisplayNumber(digit);
        return;
    }
    addDisplayNumber(digit);
}

function pressOperator(op) {
    if (displayNumber === "") return;
    if (op === "=" && !calculation) return;

    // Doesn't do anything if the last digit of the displayed number is a dot
    if (displayNumber[displayNumber.length - 1] === ".") return;

    if (!calculation) {
        num1 = +displayNumber;
        operator = op;
        calculation = true;
        verboseOperation = "" + num1 + " " + operator;
        clearDisplay();
    } else {

        if (displayNumber === "" || displayNumber == 0) return;

        num2 = +displayNumber;
        
        // Division by 0
        if (num2 == 0 && operator === "/") {
            changeDisplayNumber("don't even try");
            clearData();
            return;
        };

        num1 = roundDecimal(operate(operator, num1, num2));
        operator = op
        isNumberDisplayed = true;
        if (op === '=' && (displayNumber != 0 && displayNumber !== "")) {
            calculation = false;
            verboseOperation += " " + num2;
        } else {
            verboseOperation = "" + num1 + " " + operator;
        }

        changeDisplayNumber(num1);
    }

    updateVerboseDisplay();
}

function isNumerical(digit) {
    return /^\d+$/.test(digit);
}
function clearData() {
    num1 = 0;
    num2 = 0;
    operator = "";
    displayNumber = "";
    calculation = false;
    verboseOperation = "";
    updateVerboseDisplay();
}

// Shows an empty display
function roundDecimal(num) {
    if (num % 1 === 0) return num; // Checks if it an integer
    const decimalPositions = 13;
    return Math.round(num * (10**decimalPositions))  / (10**decimalPositions);
}

function clearDisplay() {
    display.textContent = "";
    displayNumber = "";
}

// Shows a 0 on the display
function resetDisplay() {
    displayNumber = "";
    display.textContent = displayNumber;
}

function changeDisplayNumber (num) {
    display.textContent = num;
    displayNumber = "" + num;
}

function addDisplayNumber(num) {
    if (displayNumber == 0) {
        displayNumber = "" + num; 
    } else {
        displayNumber += "" + num;
    }
    display.textContent = displayNumber;
}

function deleteLastDigit() {
    if (displayNumber == 0 || displayNumber === "") {
        return;
    }

    if (isNumberDisplayed) return;

    if (displayNumber.length === 1) {
        resetDisplay();
        return;
    }

    displayNumber = displayNumber.slice(0, displayNumber.length - 1);
    display.textContent = displayNumber;
}

function dotValid() {
    if (displayNumber == 0 || displayNumber === "") return false;
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