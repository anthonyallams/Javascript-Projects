// Calculator Class
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  // Method to clear entire digits
  clear() {
    // Initial declaration of variables and clear params
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  // Method to delete a digit
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // Method to get percent of any digit
  getPercent() {
    let computation;
    const num = parseFloat(this.currentOperand);
    if (isNaN(num)) return;
    computation = num / 100;
    this.previousOperand = "";
    this.currentOperand = computation;
  }
  // Method to add number to screen
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  // Method to choose and apply arithmetic operators
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  // Method to perform arithmetic operation
  compute() {
    let computation;
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);

    // Check each of the arithmetic operations and perform the operation
    switch (this.operation) {
      case "/":
        computation = prev / current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  // Helper Method to format the number properly
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    // Check if integer part is a number, return if not OR convert to string representation using toLocaleString
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    // If the decimal part exists, concatenate integer and decimal parts OR just return the integer part
    if (decimalDigits !== undefined) {
      return (integerDisplay = `${integerDigits}.${decimalDigits}`);
    } else {
      return integerDisplay;
    }
  }

  // Method to display digits on the screen
  updateDisplay() {
    this.currentOperandTextElement.textContent = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation !== undefined) {
      this.previousOperandTextElement.textContent = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.textContent = "";
    }
  }
}

// UI Elements
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const percentButton = document.querySelector("[data-percent]");
const equalButton = document.querySelector("[data-equal]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

//Instantiating the Calculator Object
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// Event Listener Function
const events = () => {
  // Number Events
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.textContent);
      calculator.updateDisplay();
    });
  });

  // Calculation Operation Event
  operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.chooseOperation(button.textContent);
      calculator.updateDisplay();
    });
  });

  // Get Percent for digit event
  percentButton.addEventListener("click", (button) => {
    calculator.getPercent();
    calculator.updateDisplay();
  });

  // Clear all digit event
  clearButton.addEventListener("click", (button) => {
    calculator.clear();
    calculator.updateDisplay();
  });

  // Delete individual digit event
  deleteButton.addEventListener("click", (button) => {
    calculator.delete();
    calculator.updateDisplay();
  });

  // Equal to event
  equalButton.addEventListener("click", (button) => {
    calculator.compute();
    calculator.updateDisplay();
  });
};

// Calling the events function
events();
