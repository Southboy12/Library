class Book {
  constructor(title, author, genre, publishedIn, checked) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.publishedIn = publishedIn;
    this.checked = checked;
  }
}

class Library {
  constructor() {
    this.library = [
      new Book("The Hobbit", "J.R.R. Tolkien", "Fantasy", "1937", true),
      new Book("1984", "George Orwell", "Dystopian", "1949", false),
      new Book("To Kill a Mockingbird", "Harper Lee", "Historical Fiction", "1960", true),
      new Book("Dune", "Frank Herbert", "Science Fiction", "1965", false)
    ];
    this.bookEl = document.querySelector("#book--container");
    this.addBtn = document.querySelector("#modal--add");
    this.addBtn.addEventListener("click", (e) => this.addBookToLibrary(e));
    document.addEventListener("click", (e) => this.handleButtonClick(e));
    this.renderBooks();
  }

  createBook(e) {
    e.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const author = document.querySelector("#author").value.trim();
    const genre = document.querySelector("#genre").value;
    const publishedIn = document.querySelector("#publish").value;
    const checked = document.querySelector("#checkbox").checked;
    return new Book(title, author, genre, publishedIn, checked);
  }

  getBookHtml() {
    return this.library.map((book, index) => {
      const readStatus = book.checked ? "Read" : "Notread";
      return `
        <div class="book">
            <div>
                <h2 class="book--title">${book.title}</h2>
                <div class="underline"></div>
            </div>
            <p>by ${book.author}</p>
            <p>${book.genre}</p>
            <p>The book was published in ${book.publishedIn}</p>
            <div class="book--btn">
                <button class="btn--status ${readStatus.toLowerCase()}" data-index="${index}">${readStatus}</button>
                <button class="btn--remove" data-index="${index}">Remove</button>
            </div>
        </div>`;
    }).join('');
  }

  renderBooks() {
    this.bookEl.innerHTML = this.getBookHtml();
  }

  clearForm() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#genre").value = "Fantasy";
    document.querySelector("#publish").value = "";
    document.querySelector("#checkbox").checked = false;
  }

  addBookToLibrary(e) {
    const book = this.createBook(e);
    if (!book) return;
    this.library.push(book);
    this.renderBooks();
    this.clearForm();
  }

  handleButtonClick(e) {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("btn--status")) {
      this.library[index].checked = !this.library[index].checked;
      this.renderBooks();
    }
    if (e.target.classList.contains("btn--remove")) {
      this.library.splice(index, 1);
      this.renderBooks();
    }
  }
}

// Initialize the Library
new Library();
