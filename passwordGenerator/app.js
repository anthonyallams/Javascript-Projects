// DOM UI Elements
const form = document.querySelector("form");
const passwordDisplay = document.querySelector(".password-display");

const numberInput = document.getElementById("numberInput");
const numberRange = document.getElementById("numberRange");
const includeUppercaseEl = document.getElementById("includeUppercase");
const includeNumbersEl = document.getElementById("includeNumbers");
const includeSymbolsEl = document.getElementById("includeSymbols");

// console.log(includeUppercaseEl);
/**********************
FUNCTIONS
**********************/
// Function to Sync Numbers
const syncNumbers = (e) => {
  const result = e.target.value;

  numberInput.value = result;
  numberRange.value = result;
};

// Function to Generate Array from ASCII character codes
const lowToHighArray = (low, high) => {
  const arr = [];
  for (let i = low; i <= high; i++) {
    arr.push(i);
  }
  return arr;
};

// Get the ASCII codes for lower,uppercase,numbers and symbols
const LOWER_CHAR_CODES = lowToHighArray(97, 122);
const UPPER_CHAR_CODES = lowToHighArray(65, 90);
const NUMBER_CHAR_CODES = lowToHighArray(48, 57);
const SYMBOL_CHAR_CODES = lowToHighArray(33, 47)
  .concat(lowToHighArray(58, 64))
  .concat(lowToHighArray(91, 96))
  .concat(lowToHighArray(123, 126));

// console.log(SYMBOL_CHAR_CODES);

// Function to Generate Password
const generatePassword = (
  charAmount,
  includeNumbers,
  includeSymbols,
  includeUppercase
) => {
  let charCodes = LOWER_CHAR_CODES;
  if (includeUppercase) charCodes = charCodes.concat(UPPER_CHAR_CODES);
  //   console.log("UPPER_CHAR_CODES", );
  //   console.log(charCodes);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);

  const passwordCharacter = [];
  for (let i = 0; i < charAmount; i++) {
    const randomChar = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacter.push(String.fromCharCode(randomChar));
  }
  return passwordCharacter.join("");
};

// Event Function
const event = () => {
  // Event to Sync the Number Range and Input to same value
  numberInput.addEventListener("input", syncNumbers);
  numberRange.addEventListener("input", syncNumbers);

  // Event to generate Password
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Generate Function parameters
    const charAmount = numberInput.value;
    const includeNumbers = includeNumbersEl.checked;
    const includeSymbols = includeSymbolsEl.checked;
    const includeUppercase = includeUppercaseEl.checked;

    // Generate Password Func to be performed
    const result = generatePassword(
      charAmount,
      includeNumbers,
      includeSymbols,
      includeUppercase
    );

    // Append the generated Password to DOM
    passwordDisplay.textContent = result;
  });
};

// Calling the Event Function
event();
