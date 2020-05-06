// UI Elements
const container = document.querySelector(".container");
const movie = document.querySelector(".movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector(".count");
const total = document.querySelector(".total");

let ticketPrice = parseInt(movie.value);

// Function to Update Count and Total On the DOM
const updateCountAndTotal = () => {
  const selectedSeats = document.querySelectorAll(".row .selected");
  const selectedSeatsCount = selectedSeats.length;

  // Display count and total on DOM
  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;

  // Store user Selected seats on LS
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
};

// Function to show Movie Data from LS
const setMovieDataOnLS = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};

// Function to Display user-specific LS contents on page
const displayLSOnApp = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const movieIndex = localStorage.getItem("selectedMovieIndex");

  // For selectedSeats - Setting the selected seats to appear from LS
  if (selectedSeats === null && selectedSeats.length < 0) return;
  seats.forEach((seat, index) => {
    if (selectedSeats.indexOf(index) > -1) {
      //Check for
      seat.classList.add("selected");
    }
  });

  // For movieIndex -setting the selected movie index to appear from LS
  if (movieIndex === null) return;
  movie.selectedIndex = movieIndex;
};

// Function to Declare Events
const events = () => {
  // Event for user to select seats on the cinema
  container.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
    ) {
      e.target.classList.toggle("selected");
      updateCountAndTotal();
    }
  });

  // Event for user to pick movie from from the select option
  movie.addEventListener("change", (e) => {
    ticketPrice = parseInt(e.target.value);
    setMovieDataOnLS(e.target.selectedIndex, e.target.value);
  });
};

//Function Calls
events();
displayLSOnApp();
updateCountAndTotal(); //To constantly update the price on UI
