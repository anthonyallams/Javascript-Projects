// UI Elements
const form = document.querySelector("form");
const card = document.querySelector(".card");
const weatherInfo = document.querySelector(".weather-info");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");

// Function to update UI
const updateUI = (data) => {
  // Get the data values from updateCityFunc
  const { cityDetails, weatherDetails } = data;
  console.log(data);
  //Update Weather Info in the DOM
  const html = `
              <div class="fwb ttu mbs">${cityDetails.EnglishName}</div>
              <div class="mbs">${weatherDetails.WeatherText}</div>
              <div class="temperature ttu fwb">
              <span>${weatherDetails.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
              </div>
      `;
  weatherInfo.innerHTML = html;

  // Set the DayTime/Night Image
  let timeSrc = weatherDetails.IsDayTime ? "./img/day.svg" : "./img/night.svg";

  time.setAttribute("src", timeSrc);

  // set the Weather condition icon
  const iconSrc = `./img/icons/${weatherDetails.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  console.log(iconSrc);

  // Remove the "Display; none" for card class
  if (card.classList.contains("none")) {
    card.classList.remove("none");
  }
};

// Function to update City Information based on API details
const updateCityFunc = async (city) => {
  //Get city and weather details from forecast.js
  const cityDetails = await getCity(city);
  const weatherDetails = await getWeather(cityDetails.Key);
  //   console.log(cityDetails, weatherDetails);
  return {
    cityDetails,
    weatherDetails,
  };
};

// Function to get City Information from form input
const getCityFunc = (e) => {
  e.preventDefault();

  // Get city/location input by user
  const city = form.location.value.trim();
  form.reset();

  updateCityFunc(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  // Set Local Storage for the city location
  localStorage.setItem("city", city);
};

// Event Listener
form.addEventListener("submit", getCityFunc);

// Check if Local Storage exists and enable on document load
if (localStorage.getItem("city")) {
  updateCityFunc(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
