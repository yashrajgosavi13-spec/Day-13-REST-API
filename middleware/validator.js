
const { body, validationResult } = require('express-validator');

const validateBook = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Book title is required'),

    body('author')
        .trim()
        .notEmpty()
        .withMessage('Author name is required'),

    body('category')
        .trim()
        .notEmpty()
        .withMessage('Book category is required'),

    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be greater than 0'),

    body('isbn')
        .trim()
        .matches(/^(?:\d{10}|\d{13})$/)
        .withMessage('ISBN must contain 10 or 13 digits'),

    body('publishedYear')
        .isInt({ min: 1000, max: new Date().getFullYear() })
        .withMessage('Enter a valid published year'),

    body('stock')
        .isInt({ min: 0 })
        .withMessage('Stock quantity cannot be negative'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array().map(error => ({
                    field: error.path,
                    message: error.msg
                }))
            });
        }

        next();
    }
];

module.exports = { validateBook };
