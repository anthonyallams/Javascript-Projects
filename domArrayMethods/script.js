const main = document.querySelector("main");
const addIndividualsBtn = document.querySelector(".add-users");
const doubleNetworthBtn = document.querySelector(".double-money");
const showMillionairesBtn = document.querySelector(".show-millionaires");
const sortIndividualsBtn = document.querySelector(".sort-users");
const calculateNetworthBtn = document.querySelector(".calculate-wealth");

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

// Function to Double Individuals Networth
const doubleNetworth = () => {
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });
  updateDOM();
};

// Function to Filter Millionaires
const showMillionaires = () => {
  data = data.filter((item) => {
    return item.money >= 1000000;
  });
  updateDOM();
};

// Function to Sort Individuals
const sortIndividuals = () => {
  data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM();
};

// Function to calculate the total networth of Individuals
const calculateNetworth = () => {
  const net = data.reduce((acc, item) => {
    return acc + item.money;
  }, 0);
  console.log(net);
  // Add elements and add to DOM
  const element = document.createElement("div");
  element.innerHTML = `<h3>Total Networth:<strong>${formatter.format(
    net
  )}</strong></h3>`;
  main.appendChild(element);
};

// Event Listeners
addIndividualsBtn.addEventListener("click", addIndividuals);
doubleNetworthBtn.addEventListener("click", doubleNetworth);
showMillionairesBtn.addEventListener("click", showMillionaires);
sortIndividualsBtn.addEventListener("click", sortIndividuals);
calculateNetworthBtn.addEventListener("click", calculateNetworth);
