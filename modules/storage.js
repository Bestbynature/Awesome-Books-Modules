export default class Storage {
    static saveToStorage = (books) => {
      localStorage.setItem('collections', JSON.stringify(books));
    }

    static getBooksFromStorage = () => {
      const storedBooks = localStorage.getItem('collections');
      return storedBooks ? JSON.parse(storedBooks) : [];
    }
}
