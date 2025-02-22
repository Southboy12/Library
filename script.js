const add = document.querySelector("#modal--add");
const bookEl = document.querySelector("#book--container");
const statusBtn = document.querySelectorAll(".btn--status");


// Book constructor
class Book {
  
  constructor(title, author, genre, publishedIn, checked) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.publishedIn = publishedIn;
  this.checked = checked;
}
}
//Default books in the library
const library = [
  new Book("The Hobbit", "J.R.R. Tolkien", "Fantasy", "1937", true),
  new Book("1984", "George Orwell", "Dystopian", "1949", false),
  new Book("To Kill a Mockingbird", "Harper Lee", "Historical Fiction", "1960", true),
  new Book("Dune", "Frank Herbert", "Science Fiction", "1965", false)
];

// create new book
function createBook(e) {
  e.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const genre = document.querySelector("#genre").value;
  const publishedIn = document.querySelector("#publish").value;
  const checked = document.querySelector("#checkbox").checked;
  const book = new Book(title, author, genre, publishedIn, checked);

  return book;
}

function getBookHtml() {
  let bookHtml = ``;

  library.forEach((book, index) => {
    const readStatus = book.checked ? "Read" : "Notread";
    bookHtml += `
        <div class="book">
            <div>
                <h2 class="book--title">${book.title}</h2>
                <div class="underline"></div>
            </div>
            <p>by ${book.author}</p>
            <p>${book.genre}</p>
            <p>The book was published in ${book.publishedIn}</p>
            <div class="book--btn">
                <button  class="btn--status ${readStatus.toLowerCase()}" data-index="${index}">${readStatus}</button>
                <button class="btn--remove" data-index="${index}">Remove</button>
            </div>
        </div>
        `;
  });
  return bookHtml;
}

function renderBooks() {
  bookEl.innerHTML = getBookHtml();
}

function clearForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#genre").value = "Fantasy";
  document.querySelector("#publish").value = "";
  document.querySelector("#checkbox").checked = false;
}

function addBookToLibrary(e) {
  const book = createBook(e);
  if (!book) return;
  library.push(book);
  renderBooks();
  clearForm();
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn--status")) {
    const index = e.target.dataset.index;
    library[index].checked = !library[index].checked;
    renderBooks();
  }

  if (e.target.classList.contains("btn--remove")) {
    const index = e.target.dataset.index;
    library.splice(index, 1);
    renderBooks();
  }
});

add.addEventListener("click", addBookToLibrary);

renderBooks()
