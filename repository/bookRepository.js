const bookModel = require('../models/book.js')

class BookRepository {
    
  constructor() {
      this.bookModel = bookModel;
    }
  
    async create(bookData) {
      return this.bookModel.create(bookData);
    }
  
    async findById(bookId) {
      return this.bookModel.findByPk(bookId);
    }
  
    async findAll({title=null, author=null, genre=null, publishedYear=null}) {
      const where = {};

      if (title) {
          where.title = title;
      }

      if (author) {
          where.author = author;
      }

      if (genre) {
          where.genre = genre;
      }

      if (publishedYear) {
          where.publishedYear = publishedYear;
      }

      return this.bookModel.findAll({where});
    }
  }
  
  module.exports = new BookRepository();