// Clock hand Rotation Elements
const secondHand = document.querySelector("[data-second]");
const minuteHand = document.querySelector("[data-minute]");
const hourHand = document.querySelector("[data-hour]");

// Function to set Timer Rotation
const setRotation = (element, rotationRatio) => {
  element.style.setProperty("--rotation", rotationRatio * 360);
};

// Function to set Timer
const timer = () => {
  const now = new Date();

  // Time Ratios
  const secondRatio = now.getSeconds() / 60;
  const minuteRatio = (secondRatio + now.getMinutes()) / 60;
  const hourRatio = (minuteRatio + now.getHours()) / 12;

  setRotation(secondHand, secondRatio);
  setRotation(minuteHand, minuteRatio);
  setRotation(hourHand, hourRatio);
};

// Set Time Interval every 1s
setInterval(timer, 1000);

// Event Listener to load timer on page load without delay
document.addEventListener("DOMContentLoaded", timer);
// timer();
