//Set local storage variable
let darkMode = localStorage.getItem("darkMode");
//Declare DOM object
const dark = document.querySelector(".dark-mode-toggle");

console.log(darkMode);

const enableDarkMode = () => {
  //Add the dark mode class
  document.body.classList.add("darkMode");
  //Set the location storage to "enabled"
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  //Remove the dark mode class
  document.body.classList.remove("darkMode");
  //Reset/remove the existing darkMode
  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  enableDarkMode();
}

// Event listener: When user click the dark mode button
dark.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  // On click, check if darkMode is enabled and enable it or disable it
  darkMode === "enabled" ? disableDarkMode() : enableDarkMode();
});
