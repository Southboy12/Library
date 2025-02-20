const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const publishedIn = document.querySelector('#publish').value;
const checked = document.querySelector('#checkbox').checked;
const add = document.querySelector('#modal--add');

const library = [];

// Book constructor
function Book(title, author, publishedIn, checked) {
    this.title = title;
    this.author = author;
    this.publishedIn = publishedIn;
    this.checked = checked;
}

// create new book
function createBook(e) {
    e.preventDefault()
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const publishedIn = document.querySelector('#publish').value;
    const checked = document.querySelector('#checkbox').checked;
    const book = new Book(title, author, publishedIn, checked);
    
    return book;
}

function addBookToLibrary(e) {
    const book = createBook(e);
    library.push(book);
    console.log(library);
}

add.addEventListener('click', addBookToLibrary);


