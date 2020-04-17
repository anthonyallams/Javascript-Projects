// UI Elements
const form = document.querySelector("form");
const amount = document.querySelector(".amount");
const interest = document.querySelector(".interest");
const years = document.querySelector(".years");
const monthlyPayment = document.querySelector(".monthly-payment");
const totalPayment = document.querySelector(".total-payment");
const totalInterest = document.querySelector(".total-interest");
const results = document.querySelector(".results");
const loader = document.querySelector(".loader");

// Function to Show spinner when user clicks "submit" button
const showLoader = (e) => {
  e.preventDefault();

  loader.style.display = "block";
  results.style.display = "none";

  setTimeout(calculateResult, 2000);
};

// Function to show error when user does not enter valid data
const showError = (errorMsg) => {
  // Create error div and append to DOM
  const element = document.createElement("div");
  element.className = "error";
  element.appendChild(document.createTextNode(errorMsg));

  const header = document.querySelector("header");
  const h1 = document.querySelector("h1");

  header.insertBefore(element, h1);
  loader.style.display = "none";

  setTimeout(clearError, 2000);
};

// Function to clear Error Message
const clearError = () => {
  document.querySelector(".error").remove();
};

// Function to Calculate the Loan and display result
const calculateResult = () => {
  // User entered form details
  const Principal = parseFloat(amount.value);
  const Interest = parseFloat(interest.value / 100 / 12);
  const Payment = parseFloat(years.value * 12);

  // Calculate the monthly value
  const x = Math.pow(1 + Interest, Payment);
  const monthly = (Principal * x * Interest) / (x - 1);

  // Check if the entered value is finite
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * Payment).toFixed(2);
    totalInterest.value = (monthly * Payment - Principal).toFixed(2);

    results.style.display = "block";
    loader.style.display = "none";
  } else {
    showError("Please check your numbers");
  }
};

// Event Listener
form.addEventListener("submit", showLoader);
