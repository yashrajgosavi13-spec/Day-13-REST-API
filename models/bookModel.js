
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/books.json');

const readBooks = () => {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
};

const saveBooks = (books) => {
    fs.writeFileSync(dataPath, JSON.stringify(books, null, 2));
};

const getAllBooks = () => readBooks();

const getBookById = (id) => {
    const books = readBooks();
    return books.find(book => book.id === Number(id));
};

const addBook = (book) => {
    const books = readBooks();

    const newBook = {
        id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
        ...book
    };

    books.push(newBook);
    saveBooks(books);

    return newBook;
};

const updateBook = (id, updatedData) => {
    const books = readBooks();
    const index = books.findIndex(book => book.id === Number(id));

    if (index === -1) return null;

    books[index] = { ...books[index], ...updatedData, id: Number(id) };
    saveBooks(books);

    return books[index];
};

const deleteBook = (id) => {
    const books = readBooks();
    const index = books.findIndex(book => book.id === Number(id));

    if (index === -1) return null;

    const deletedBook = books.splice(index, 1)[0];
    saveBooks(books);

    return deletedBook;
};

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
};
