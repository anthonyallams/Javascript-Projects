// Declare document objects variables
const form = document.querySelector("form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

// Show error message for input fields
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
};

// Show success outline message for input fields
const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

// Get and capitalize the input IDs
const capitalizeInput = input => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Check the input fields to ensure they are not empty
const checkInputEmptiness = array => {
  for (let arr of array) {
    if (arr.value.trim() === "") {
      showError(arr, `${capitalizeInput(arr)} is required`);
    } else {
      showSuccess(arr);
    }
  }
};

// Check whether email address entered is valid
const checkEmailValidity = input => {
  const pattern = /^[a-zA-Z0-9.@]{8,}$/;
  if (pattern.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, `${capitalizeInput(input)} entered is not valid`);
  }
};

// Check the Length of Input entered
const checkInputLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${capitalizeInput(input)} should be at least ${min}`);
  } else if (input.value.length > max) {
    showError(input, `${capitalizeInput(input)} should be less than ${max}`);
  } else {
    showSuccess(input);
  }
};

// Check whether the two passwords match
const checkPasswordMatch = (password, password2) => {
  if (password.value !== password2.value) {
    showError(password2, `Passwords do not match`);
  }
};

// Event Listener when a user click the submit button
form.addEventListener("submit", e => {
  e.preventDefault();
  checkInputEmptiness([username, email, password, password2]);
  checkEmailValidity(email);
  checkInputLength(username, 4, 15);
  checkInputLength(password, 4, 15);
  checkInputLength(password2, 4, 15);
  checkPasswordMatch(password, password2);
});
