
const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let currentNumber = "0";
let firstNumber = null;
let selectedOperator = null;
let waitingForSecondNumber = false;

function updateDisplay() {
    display.value = currentNumber;
}

function inputNumber(number) {
    if (currentNumber === "Error" || waitingForSecondNumber) {
        currentNumber = number;
        waitingForSecondNumber = false;
    } else if (currentNumber === "0") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}

function inputDecimal() {
    if (currentNumber === "Error" || waitingForSecondNumber) {
        currentNumber = "0.";
        waitingForSecondNumber = false;
    } else if (!currentNumber.includes(".")) {
        currentNumber += ".";
    }

    updateDisplay();
}

function calculate() {
    const secondNumber = Number(currentNumber);
    let result;

    if (selectedOperator === "+") {
        result = firstNumber + secondNumber;
    } else if (selectedOperator === "-") {
        result = firstNumber - secondNumber;
    } else if (selectedOperator === "*") {
        result = firstNumber * secondNumber;
    } else if (selectedOperator === "/") {
        if (secondNumber === 0) {
            currentNumber = "Error";
            firstNumber = null;
            selectedOperator = null;
            waitingForSecondNumber = true;
            updateDisplay();
            return;
        }

        result = firstNumber / secondNumber;
    } else {
        return;
    }

    currentNumber = String(Number(result.toPrecision(10)));
    firstNumber = null;
    selectedOperator = null;
    waitingForSecondNumber = true;

    updateDisplay();
}

function chooseOperator(operator) {
    if (currentNumber === "Error") return;

    if (selectedOperator && !waitingForSecondNumber) {
        calculate();

        if (currentNumber === "Error") return;
    }

    firstNumber = Number(currentNumber);
    selectedOperator = operator;
    waitingForSecondNumber = true;
}

function clearCalculator() {
    currentNumber = "0";
    firstNumber = null;
    selectedOperator = null;
    waitingForSecondNumber = false;

    updateDisplay();
}

function deleteDigit() {
    if (currentNumber === "Error" || waitingForSecondNumber) {
        currentNumber = "0";
        waitingForSecondNumber = false;
    } else {
        currentNumber = currentNumber.slice(0, -1);

        if (currentNumber === "" || currentNumber === "-") {
            currentNumber = "0";
        }
    }

    updateDisplay();
}

buttons.addEventListener("click", function (event) {
    const button = event.target.closest("button");

    if (!button) return;

    if (button.dataset.number !== undefined) {
        inputNumber(button.dataset.number);
    } else if (button.dataset.operator) {
        chooseOperator(button.dataset.operator);
    } else if (button.dataset.action === "decimal") {
        inputDecimal();
    } else if (button.dataset.action === "clear") {
        clearCalculator();
    } else if (button.dataset.action === "delete") {
        deleteDigit();
    } else if (button.dataset.action === "equals") {
        calculate();
    }
});