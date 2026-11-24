
const bookModel = require('../models/bookModel');

// GET - Retrieve all books
const getAllBooks = (req, res, next) => {
    try {
        const books = bookModel.getAllBooks();

        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    } catch (error) {
        next(error);
    }
};

// GET - Retrieve book by ID
const getBookById = (req, res, next) => {
    try {
        const book = bookModel.getBookById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    } catch (error) {
        next(error);
    }
};

// POST - Add new book
const addBook = (req, res, next) => {
    try {
        const newBook = bookModel.addBook(req.body);

        res.status(201).json({
            success: true,
            message: 'Book added successfully',
            data: newBook
        });
    } catch (error) {
        next(error);
    }
};

// PUT - Update existing book
const updateBook = (req, res, next) => {
    try {
        const updatedBook = bookModel.updateBook(
            req.params.id,
            req.body
        );

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
    } catch (error) {
        next(error);
    }
};

// DELETE - Delete book
const deleteBook = (req, res, next) => {
    try {
        const deletedBook = bookModel.deleteBook(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: deletedBook
        });
    } catch (error) {
        next(error);
    }
};

// GET - Search books by title
const searchBooks = (req, res, next) => {
    try {
        const title = req.query.title;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a title to search'
            });
        }

        const books = bookModel.getAllBooks().filter(book =>
            book.title.toLowerCase().includes(title.trim().toLowerCase())
        );

        res.status(200).json({
            success: true,
            message: 'Search results retrieved successfully',
            data: books
        });
    } catch (error) {
        next(error);
    }
};

// GET - Filter books by category
const getBooksByCategory = (req, res, next) => {
    try {
        const category = req.params.name;

        const books = bookModel.getAllBooks().filter(book =>
            book.category.toLowerCase() === category.toLowerCase()
        );

        res.status(200).json({
            success: true,
            message: 'Category books retrieved successfully',
            data: books
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
    getBooksByCategory
};
