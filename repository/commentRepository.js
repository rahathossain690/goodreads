const commentModel = require('../models/comment.js')

class CommentRepository {
    constructor() {
      this.commentModel = commentModel;
    }
  
    async create(commentData) {
      return this.commentModel.create(commentData);
    }
  
    async findByReviewId(reviewId) {
      return this.commentModel.findAll({ where: { reviewId }, include: 'User' });
    }
  
    async findById(commentId) {
      return this.commentModel.findByPk(commentId);
    }
  }
  
  module.exports = new CommentRepository();
  