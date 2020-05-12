// Booklist UI Elements
const container = document.querySelector(".container");
const form = document.querySelector("form");
const table = document.querySelector("table");

//Booklist Class
class Booklist {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

  addBookToList(book) {
    // Create a tr element to hold the book details
    const row = document.createElement("tr");
    // Add the title, author and isbn information to tr
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='delete'>x</a></td>
    `;
    // Append the data to table row
    table.appendChild(row);
  }

  showAlert(message, className) {
    //Method to display alert confirmations
    //Create div element
    const div = document.createElement("div");
    // Add classname
    div.className = `alert ${className}`;
    // Append the alert text to the div
    div.appendChild(document.createTextNode(message));
    // Insert the div inbetween the container div and form element on DOM
    container.insertBefore(div, form);

    // Set Timeout to delete alert after 2 seconds
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  removeBook(target) {
    target.remove();
  }

  clearField() {
    // Clear the form fields
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// LocalStorage Class
class LS {
  static getBook() {
    //Initialize books varaiable for LS
    //If there aint item in books LS, create a new array, else store the items in books array and return it
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    // Retrieve items stored in books LS array
    const books = LS.getBook();
    // Add each book details(title, author & isbn) to books array
    books.push(book);
    // Set the items in books LS after the operation
    localStorage.setItem("books", JSON.stringify(books));
  }

  static displayBook() {
    // Retrieve items stored in books LS array
    const books = LS.getBook();
    // Loop through the books LS and add it to the book list table
    books.forEach((item) => {
      const book = new Booklist(title, author, isbn); //Initialize the class
      book.addBookToList(item);
    });
  }

  static removeBook(isbn) {
    // Retrieve items stored in books LS array
    const books = LS.getBook();
    // Loop through the books LS and add it to the book list table
    books.forEach((item, index) => {
      if (item.isbn === isbn) books.splice(index, 1);
    });
    // Set the items in books LS again
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event Listener function
const events = () => {
  // Add BOOK to the list
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Form Elements
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    // Instantiating the Booklist Object
    const book = new Booklist(title, author, isbn);

    if (title === "" || author === "" || isbn === "") {
      book.showAlert("Please enter all book details and submit again", "error");
    } else {
      book.addBookToList(book);
      LS.addBook(book);
      book.showAlert("Book Successfully Added to List", "success");
      book.clearField();
    }
  });

  // Delete Book from the list
  table.addEventListener("click", (e) => {
    e.preventDefault();

    const book = new Booklist(title, author, isbn);
    if (e.target.className === "delete") {
      book.removeBook(e.target.parentElement.parentElement);
      LS.removeBook(e.target.parentElement.previousElementSibling.textContent);
      book.showAlert("Book Successfully deleted from List", "success");
    }
  });

  // Load the Book content from LS
  document.addEventListener("DOMContentLoaded", LS.displayBook());
};

events();
