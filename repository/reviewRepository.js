const reviewModel = require('../models/review.js')

class ReviewRepository {
    constructor() {
      this.reviewModel = reviewModel;
    }
  
    async create(reviewData) {
      return this.reviewModel.create(reviewData);
    }
  
    async findAll({userId = null, bookId = null}) {
      const where = {}

      if (userId) {
        where.userId = userId
      }

      if (bookId) {
        where.bookId = bookId
      }

      return this.reviewModel.findAll({ where, include: ['User', 'Book']});
    }
  
    async findById(reviewId) {
      return this.reviewModel.findByPk(reviewId, {include: ['User', 'Book']});
    }
  }
  
  module.exports = new ReviewRepository();
  