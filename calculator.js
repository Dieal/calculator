let num1 = 0;
let num2 = 0;
let operator;
let displayNumber = "";
let calculation = false;

console.log(operate("+", 10, 20));

const digits = document.querySelectorAll(".digit");
digits.forEach((button) => button.addEventListener("click", e => {
    let value = e.target.textContent;
    updateDisplayNumber(value);
}));

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", (e) => clearData());

const operators = document.querySelectorAll(".operator");
operators.forEach((obj) => obj.addEventListener("click", (e) => {
    
    let op = e.target.textContent;
    if (displayNumber === "") return;
    
    if (!calculation) {
        num1 = +displayNumber;
        resetDisplay();
        operator = op;
        calculation = true;
        return;
    } else {

    }

    console.log("test");



}));

function equalsOperation() {

}

function clearData() {
    num1 = 0;
    num2 = 0;
    operator = "";
    displayNumber = "";
    calculation = false;
    resetDisplay();
}

function clearDisplay() {
    const display = document.querySelector("div.display");
    display.textContent = "";
    displayNumber = 0;
}

function resetDisplay() {
    const display = document.querySelector("div.display");
    displayNumber = "0";
    display.textContent = displayNumber
}

function updateDisplayNumber(num) {
    const display = document.querySelector("div.display");
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