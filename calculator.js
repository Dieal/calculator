let num1, num2;
let operator;
let displayNumber = "";

const digits = document.querySelectorAll(".digit");
digits.forEach((button) => button.addEventListener("click", e => {
    let value = e.target.textContent;
    updateDisplayNumber(value);
}));

function updateDisplayNumber(num) {
    const display = document.querySelector("div.display");
    displayNumber += "" + num;
    display.textContent = displayNumber;
}

function operate (operator, num1, num2) {

    let result = 0;
    switch (operator) {
        case '+':
           result = sum(num1, num2);
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