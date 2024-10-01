const bookRepository = require('../repository/bookRepository.js');
const Book = require('../models/book');

class BookController {

    async create(req, res, next) {
        const { title, author, genre, publishedYear } = req.body;

        const existingBooks = await bookRepository.findAll({title});
        if (existingBooks.length != 0) {
            next(new Error('Book already exists'));
            return;
        }

        const newBook = await bookRepository.create({ title, author, genre, publishedYear });
        res.status(201).send();
    }

    async getAll(req, res, next) {
        const books = await bookRepository.findAll(req.query);
        res.json(books);
    }

    async getById(req, res, next) {
        const { id } = req.params;

        const book = await bookRepository.findById(id);
        if (!book) {
            next(new Error('Book not found'));
            return;
        }

        res.json(book);
    }
}

module.exports = new BookController();