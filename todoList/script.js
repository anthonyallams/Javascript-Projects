const addTodo = document.querySelector(".add-todo");
const searchTodo = document.querySelector(".search-todo");
const clearTodo = document.querySelector(".clear-todo");
const ul = document.querySelector(".todo-list");

// Function to Load Event Listeners
const events = () => {
  // Add Todo Event
  addTodo.addEventListener("submit", addTodoFunc);
  // Load Todo from the LS
  document.addEventListener("DOMContentLoaded", getTodoFromLS);
  //   Delete Todo Item
  ul.addEventListener("click", removeTodoFunc);
  //   Search Todo Items
  searchTodo.addEventListener("keyup", searchTodoFunc);
  //   Clear Todo list
  clearTodo.addEventListener("click", clearTodoFunc);
};

// Function to Clear Todos from LS
const clearTodoFromLocalStorage = () => localStorage.clear();

// Function to clear Todo List
const clearTodoFunc = () => {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
    clearTodoFromLocalStorage();
  }
};

// Function to filter Todos
const filterTodoFunc = (term) => {
  // Filter to check if the li(ul.children) has the search term
  // If not, add the filtered class to remove LIs without search term
  Array.from(ul.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  // Filter to check if the li(ul.children) has the search term
  // If it does, remove the filtered class to show search term on DOM
  Array.from(ul.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

// Function to search Todos
const searchTodoFunc = (e) => {
  e.preventDefault();

  const term = searchTodo.search.value.toLowerCase().trim();
  filterTodoFunc(term);
};

// Function to remove Todo Items from LS
const removeTodoFromLocalStorage = (todo) => {
  // Define LS task
  let tasks;

  // Check if there is no item on LS, create new LS array
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // Else, parse the tasks
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // Loop through the tasks array
  // If the todo value is equal to the LS value
  // Use splice index to remove the item
  for (let [i, v] of tasks.entries()) {
    if (todo.textContent === v) {
      tasks.splice(i, 1);
    }
  }
  //   Set the tasks to LS as strings
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Function to Delete Todo Items
const removeTodoFunc = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    removeTodoFromLocalStorage(e.target.parentElement);
  }
};

// Function to Get Todo from LS
const getTodoFromLS = () => {
  // Define LS task
  let tasks;

  // Check if there is no item on LS, create new LS array
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // Else, parse the tasks
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((todo) => generateTemplate(todo));
};

// Function to Add Todo to the App
const addTodoFunc = (e) => {
  e.preventDefault();

  const todo = addTodo.add.value.trim();

  if (todo.length) {
    generateTemplate(todo);
    addTodoToLocalStorage(todo);
    addTodo.reset();
  }
};

// Function to generate html template
const generateTemplate = (todo) => {
  // Create LI and attach classname to it
  const li = document.createElement("li");
  li.className = "todo-item";

  // Create Span element and attach to li
  const span = document.createElement("span");
  span.innerHTML = `${todo}`;
  li.appendChild(span);

  // Create Trash icon and attach to li
  const i = document.createElement("i");
  i.className = "far fa-trash-alt delete";
  li.appendChild(i);

  // Attach the li to ul
  ul.appendChild(li);
};

// Function to Add Todo list Items to Local Storage
const addTodoToLocalStorage = (todo) => {
  // Define LS task
  let tasks;

  // Check if there is no item on LS, create new LS array
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // Else, parse the tasks
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // Add each todo to the Task LS
  tasks.push(todo);
  // Store the tasks as strings on LS
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Event Listener function
events();
