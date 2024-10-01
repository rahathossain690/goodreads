const followRepository = require('../repository/followRepository.js');
const reviewRepository = require('../repository/reviewRepository.js');

class ReviewController {

    async create(req, res, next) {
        const { reviewText, rating, bookId } = req.body;
        const userId = req.userData?.id;

        const existingReviews = await reviewRepository.findAll({userId, bookId})
        if (existingReviews.length != 0) {
            next(new Error("Review exists already"));

            return;
        }

        const review = await reviewRepository.create({ reviewText, rating, userId, bookId });
        res.status(201).send();
    }

    async getAll(req, res, next) {
        const {bookId, userId} = req.query;
        const reviews = await reviewRepository.findAll({bookId, userId});
        res.json(reviews);
    }

    async getById(req, res, next) {
        const { id } = req.params;

        const review = await reviewRepository.findById(id);
        if (!review) {
            next(new Error('Review not found'));
            return;
        }

        res.json(review);
    }

    async getNewsFeed(req, res, next) {
        const { id } = req.userData;

        let reviews = (await reviewRepository.findAll({ userId: id })).map(review => review.dataValues);
        const followingUsers = await followRepository.findByFollowerId(id);

        for (const user of followingUsers) {
            const userReviews = (await reviewRepository.findAll({ userId: user.id })).map(review => review.dataValues);
            reviews = reviews.concat(userReviews); 
        }

        reviews.sort((review1, review2) => review2.createdAt - review1.createdAt); 
        res.json(reviews);
    }
}

module.exports = new ReviewController();