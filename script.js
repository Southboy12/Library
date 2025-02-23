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

      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');

      const titleDiv = document.createElement('div');
      const title = document.createElement('h2');
      title.classList.add('book--title');
      title.textContent = book.title;
      const underline = document.createElement('div');
      underline.classList.add('underline');
      titleDiv.appendChild(title);
      titleDiv.appendChild(underline);

      const author = document.createElement('p');
      author.textContent = `by ${book.author}`;

      const genre = document.createElement('p');
      genre.textContent = book.genre;

      const publishedIn = document.createElement('p');
      publishedIn.textContent = `The book was published in ${book.publishedIn}`;

      const bookBtn = document.createElement('div');
      bookBtn.classList.add('book--btn');
      
      const btnStatus = document.createElement('button');
      btnStatus.classList.add('btn--status', readStatus.toLowerCase());
      btnStatus.dataset.index = index;
      btnStatus.textContent = readStatus;

      const btnRemove = document.createElement('button');
      btnRemove.classList.add('btn--remove');
      btnRemove.dataset.index = index;
      btnRemove.textContent = 'Remove';

      bookBtn.appendChild(btnStatus);
      bookBtn.appendChild(btnRemove);

      bookDiv.appendChild(titleDiv);
      bookDiv.appendChild(author);
      bookDiv.appendChild(genre);
      bookDiv.appendChild(publishedIn);
      bookDiv.appendChild(bookBtn);

      return bookDiv;

    });
  }

  renderBooks() {
    this.bookEl.innerHTML = "";
    this.getBookHtml().forEach((book) => this.bookEl.appendChild
    (book));
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
