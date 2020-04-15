const main = document.querySelector("main");
const addIndividualsBtn = document.querySelector(".add-users");
const doubleNetworthBtn = document.querySelector(".double-networth");
const showMillionairesBtn = document.querySelector(".show-millionaires");
const calculateNetworthBtn = document.querySelector(".calculate-networth");

// Array of Individuals and their networth
let data = [];

// Function to Add Individuals
const addIndividuals = async () => {
  const respond = await fetch("https://randomuser.me/api");
  const data = await respond.json();

  const user = data.results[0].name;

  const newUser = {
    name: `${user.first} ${user.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

// Function to Add data
const addData = (obj) => {
  data.push(obj);

  updateDOM();
};

// Function to update DOM
const updateDOM = (parameterData = data) => {
  //Update the main section
  main.innerHTML = `<h2><strong>Individuals</strong>Networth</h2>`;

  // lOOP through the data array containing individuals and networth
  // Create html elements in the DOM main section and add it
  parameterData.forEach((param) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${param.name}</strong>${formatter.format(
      param.money
    )}`;
    main.appendChild(element);
  });
};

// Function to format currency
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",
});

// Event Listeners
addIndividualsBtn.addEventListener("click", addIndividuals);
// doubleNetworthBtn.addEventListener("click", doubleNetworth);
// showMillionairesBtn.addEventListener("click", showMillionaires);
// sortIndividualsBtn.addEventListener("click", sortIndividuals);
// calculateNetworthBtn.addEventListener("click", calculateNetworth);
