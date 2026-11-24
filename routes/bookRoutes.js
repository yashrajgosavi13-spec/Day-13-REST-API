
const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const { validateBook } = require('../middleware/validator');

// Search books by title
router.get('/search', bookController.searchBooks);

// Filter books by category
router.get('/category/:name', bookController.getBooksByCategory);

// Get all books
router.get('/', bookController.getAllBooks);

// Get book by ID
router.get('/:id', bookController.getBookById);

// Add new book
router.post('/', validateBook, bookController.addBook);

// Update existing book
router.put('/:id', validateBook, bookController.updateBook);

// Delete book
router.delete('/:id', bookController.deleteBook);

module.exports = router;
