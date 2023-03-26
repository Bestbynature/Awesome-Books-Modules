import Book from './modules/Book.js';

class Library {
  constructor() {
    this.books = [
      new Book(0, 'Married with Zombies', 'Jesse Petersen'),
      new Book(1, 'Feed', 'Mira Grant'),
      new Book(2, 'Things fall apart', 'Chinua Achebe'),
    ];
    this.newTitle = document.querySelector('form #title');
    this.newAuthor = document.querySelector('form #author');
    this.addButton = document.querySelector('#add');
    this.shelve = document.querySelector('.shelve');
    this.addBook = this.addBook.bind(this);
    this.displayBooks = this.displayBooks.bind(this);
    // this.navigationBar = this.navigationBar.bind(this);
    this.date = new Date();
  }

  // moving the  saveToStorage and getBooksFromStorage functions into the Library class
  saveToStorage() {
    localStorage.setItem('collections', JSON.stringify(this.books));
  }

  getBooksFromStorage() {
    const storedBooks = localStorage.getItem('collections');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    }
  }

  //   Creating a displayBooks method in the Library class
  displayBooks() {
    this.shelve.innerHTML = '';
    this.books.forEach((book, i) => {
      // creating the elements that form a book div
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book-div');

      if (i % 2 === 0) bookDiv.style.backgroundColor = 'rgb(221,221,221)';

      const button = document.createElement('button');
      button.className = 'remove';
      button.innerHTML = 'Remove';

      bookDiv.innerHTML += `<h2>"${book.title}" by ${book.author}</h2>`;
      bookDiv.appendChild(button);

      // append the remove button and the horizontal rule to the book div
      // append the book div to the DOM
      this.shelve.appendChild(bookDiv);
    });

    const removeBtns = document.querySelectorAll('.remove');
    removeBtns.forEach((removeBtn, btnIndex) => {
      removeBtn.addEventListener('click', () => {
        // console.log(this.books)
        this.books = this.books.filter((book) => book.id !== btnIndex);
        // console.log(this.books)
        const removeBtnParent = removeBtn.parentNode;
        removeBtnParent.remove();
        this.saveToStorage();
      });
    });
    this.theDate();
  }

  addBook(e) {
    if (this.newTitle.value === '' || this.newAuthor.value === '') return;
    e.preventDefault();
    let id = this.books.length;
    this.books.forEach((c) => {
      while (c.id === id) {
        id += 1;
      }
    });

    const title = this.newTitle.value;
    const author = this.newAuthor.value;
    const newBook = { id, title, author };
    this.books.push(newBook);
    this.newTitle.value = '';
    this.newAuthor.value = '';

    this.displayBooks();
    this.saveToStorage();
  }

  initialize() {
    this.getBooksFromStorage();
    this.displayBooks();
    this.addButton.addEventListener('click', this.addBook);
    this.navigationBar();
  }

  theDate() {
    const dateDiv = document.querySelector('#date');
    dateDiv.innerHTML = this.date;
  }

  navigationBar() {
    const { shelve } = this;
    const addBook = document.querySelector('#add-book');
    const contact = document.querySelector('.contact');
    const short = document.querySelector('.short');

    const links = document.querySelectorAll('header nav ul li');
    links.forEach((link, index) => {
      link.onclick = function linkCaller() {
        if (index === 0) {
          shelve.style.display = 'block';
          addBook.style.display = 'none';
          contact.style.display = 'none';
          short.style.display = 'none';
          links[0].style.backgroundColor = 'rgba(241, 102, 102, 0.9)';
          links[1].style.backgroundColor = 'rgba(241, 102, 102, 0.1)';
          links[2].style.backgroundColor = 'rgba(241, 102, 102, 0.1)';
        } else if (index === 1) {
          shelve.style.display = 'none';
          addBook.style.display = 'block';
          contact.style.display = 'none';
          short.style.display = 'none';
          links[1].style.backgroundColor = 'rgba(241, 102, 102, 0.9)';
          links[0].style.backgroundColor = 'rgba(241, 102, 102, 0.1)';
          links[2].style.backgroundColor = 'rgba(241, 102, 102, 0.1)';
        } else {
          shelve.style.display = 'none';
          addBook.style.display = 'none';
          contact.style.display = 'block';
          short.style.display = 'none';
          links[2].style.backgroundColor = 'rgba(241, 102, 102, 0.9)';
          links[0].style.backgroundColor = 'rgba(241, 102, 102, 0.1)';
          links[1].style.backgroundColor = 'rgba(241, 102, 102, 0.1)';
        }
      };
    });
  }
}

const myLibrary = new Library();
myLibrary.initialize();

setInterval(Library.theDate, 1000)