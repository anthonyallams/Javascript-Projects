// Get the clock in the html
const clock = document.querySelector(".clock");

// Function to pad timers
const padTime = timeInput => {
  return timeInput.toString().padStart(2, "0");
};

// Function to get time variabes and add to DOM
const timer = () => {
  // Initializing date object and timers
  const date = new Date();

  const hour = padTime(date.getHours() % 12 || 12);
  const min = padTime(date.getMinutes());
  const seconds = padTime(date.getSeconds());
  const period = date.getHours() < 12 ? "AM" : "PM";

  // Creating span for the timers
  const html = `
        <span>${hour}</span> :
        <span>${min}</span> :
        <span>${seconds}</span> 
        <span>${period}</span> 
    `;

  // Adding timers to the DOM
  clock.innerHTML = html;
};

setInterval(timer, 1000);
