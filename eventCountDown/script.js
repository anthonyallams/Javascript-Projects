const days = document.querySelector(".days");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const year = document.querySelector(".year");
const countdown = document.querySelector(".countdown");
const loader = document.querySelector(".spinner");

//Declare the time variables
const currentYear = new Date().getUTCFullYear();
const eventMonth = `March`.slice(0, 3);
const eventDay = `26`;
let eventDate = new Date(`${eventMonth} ${eventDay} ${currentYear} 00:00:00`);
let diff;

//Get event date based on current date
const getEventDate = () => {
  const time = new Date();
  if (eventDate > time) {
    //Set background year
    year.innerHTML = `${eventMonth} ${eventDay}, ${currentYear}`;
  } else {
    eventDate = new Date(
      `${eventMonth} ${eventDay} ${currentYear + 1} 00:00:00`
    );
    //Set background year
    year.innerHTML = `${eventMonth} ${eventDay}, ${currentYear + 1}`;
  }
};

//Pad hours, mins and secs with 0 if value is less than 10
const padTime = (time) => time.toString().padStart(2, "00");

//Update the DOM Count down
const updateDOMCountDown = () => {
  const time = new Date();
  const diff = eventDate - time;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  //Add the time values to DOM
  days.innerHTML = d;
  hours.innerHTML = padTime(h);
  minutes.innerHTML = padTime(m);
  seconds.innerHTML = padTime(s);
};
//Show spinner
setTimeout(() => {
  loader.remove();
  countdown.style.display = "flex";
}, 1000);

getEventDate();
//Run the time every second
setInterval(updateDOMCountDown, 1000);
