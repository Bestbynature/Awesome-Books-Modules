import Book from './modules/Book.js';
import Storage from './modules/storage.js';
import DateTime from './node_modules/luxon/src/datetime.js';

export default class Library {
  constructor() {
    this.books = [];
    this.newTitle = document.querySelector('form #title');
    this.newAuthor = document.querySelector('form #author');
    this.addButton = document.querySelector('#add');
    this.shelve = document.querySelector('.shelve');
    this.currentDate = DateTime.now();
  }

  displayBooks = () => {
    this.shelve.innerHTML = '';
    this.books.forEach((book, i) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book-div');

      if (i % 2 === 0) bookDiv.style.backgroundColor = 'rgb(221,221,221)';

      const button = document.createElement('button');
      button.className = 'remove';
      button.innerHTML = 'Remove';

      bookDiv.innerHTML += `<h2>"${book.title}" by ${book.author}</h2>`;
      bookDiv.appendChild(button);

      this.shelve.appendChild(bookDiv);
    });

    const removeBtns = document.querySelectorAll('.remove');
    removeBtns.forEach((removeBtn, btnIndex) => {
      removeBtn.addEventListener('click', () => {
        this.books = this.books.filter((book) => book.id !== btnIndex);
        const removeBtnParent = removeBtn.parentNode;
        removeBtnParent.remove();
        Storage.saveToStorage(this.books);
      });
    });
    this.theDate();
  }

  addBook = (e) => {
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
    const newBook = new Book(id, title, author);
    this.books.push(newBook);
    this.newTitle.value = '';
    this.newAuthor.value = '';

    this.displayBooks();
    Storage.saveToStorage(this.books);
  }

  initialize = () => {
    this.books = Storage.getBooksFromStorage();
    this.displayBooks();
    this.addButton.addEventListener('click', this.addBook.bind(this));
    this.navigationBar();
  }

  theDate= () => {
    const dateDiv = document.querySelector('#date');
    const dt = this.currentDate;
    const day = dt.toFormat('dd');
    const month = dt.toFormat('MMMM');
    const year = dt.toFormat('yyyy');
    const hour = dt.toFormat('hh');
    const minute = dt.toFormat('mm');
    const second = dt.toFormat('ss');
    const amPm = dt.toFormat('a');
    const now = `${day}-${month}-${year} ${hour}:${minute}:${second} ${amPm}`;
    dateDiv.innerHTML = now;
  }

  navigationBar = () => {
    const { shelve } = this;
    const addBook = document.querySelector('#add-book');
    const contact = document.querySelector('.contact');
    const short = document.querySelector('.short');

    const links = document.querySelectorAll('header nav ul li');
    links.forEach((link, index) => {
      link.onclick = () => {
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
          addBook.style.display = 'flex';
          contact.style.display = 'none';
          short.style.display = 'none';
          links[1].style.backgroundColor = 'rgba(241, 102, 102, 0.9)';
          links[0].style.backgroundColor = 'rgba(241, 102, 102, 0.1)';
          links[2].style.backgroundColor = 'rgba(241, 102, 102, 0.1)';
        } else if (index === 2) {
          shelve.style.display = 'none';
          addBook.style.display = 'none';
          contact.style.display = 'flex';
          short.style.display = 'none';
          links[2].style.backgroundColor = 'rgba(241, 102, 102, 0.9)';
          links[0].style.backgroundColor = 'rgba(241, 102, 102, 0.1)';
          links[1].style.backgroundColor = 'rgba(241, 102, 102, 0.1)';
        } else {
          shelve.style.display = 'none';
          addBook.style.display = 'none';
          contact.style.display = 'none';
          short.style.display = 'block';
        }
      };
    });
  }
}

const myLibrary = new Library();
myLibrary.initialize();