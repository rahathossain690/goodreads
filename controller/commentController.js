const commentRepository = require('../repository/commentRepository.js');

class CommentController {

    async create(req, res, next) {
        const { commentText, reviewId } = req.body;
        const userId = req.userData?.id;

        const newComment = await commentRepository.create({ commentText, userId, reviewId });
        res.status(201).send();
    }

    async getAll(req, res, next) {
        const { reviewId} = req.query;

        const comments = await commentRepository.findByReviewId(reviewId);
        res.json(comments);
    }
}

module.exports = new CommentController()