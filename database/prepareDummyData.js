const { faker } = require('@faker-js/faker');
const bookRepository = require('../repository/bookRepository');
const commentRepository = require('../repository/commentRepository');
const followRepository = require('../repository/followRepository');
const reviewRepository = require('../repository/reviewRepository');
const userRepository = require('../repository/userRepository');

function generateDistinctRandomNumbers(min, max, k) {
    const numbers = [];

    while (numbers.length < k) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }

    return numbers;
}

function getRandomElements(array, k) {
    if (k > array.length) {
        throw new Error("k cannot be greater than the array length");
    }

    const shuffledArray = array.slice().sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, k);
}

module.exports = async function prepareDummyData(params) {
    try {
        if ((await userRepository.findById(1)) != null) {
            console.log("Already added")
            return;
        }

        const n_users = 10;
        const n_books = 10;
        const n_review_per_user = 3;
        const n_comment_per_review = 3;
        const n_follower_per_user = 5;

        let promises;

        // Create users
        let userData = [];
        for (let i = 0; i < n_users - 1; i++) {
            userData.push({
                username: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            });
        }

        userData.push({
            username: process.env.DEMO_USER_USERNAME,
            email: process.env.DEMO_USER_EMAIL,
            password: process.env.DEMO_USER_PASSWORD
        })

        promises = userData.map(async user => (await userRepository.create(user)).dataValues);
        userData = await Promise.all(promises);

        // Create books
        let bookData = [];
        for (let i = 0; i < n_books; i++) {
            bookData.push({
                title: faker.music.album(),
                author: faker.music.artist(),
                genre: faker.music.genre(),
                publishedYear: faker.date.past().getFullYear()
            });
        }

        promises = bookData.map(async book => (await bookRepository.create(book)).dataValues);
        bookData = await Promise.all(promises);

        // Create reviews
        let reviewData = [];
        userData.forEach(user => {
            const choosenBooks = generateDistinctRandomNumbers(0, n_books - 1, n_review_per_user).map(idx => bookData[idx]);

            choosenBooks.forEach(book => {
                reviewData.push({
                    userId: user.id,
                    bookId: book.id,
                    reviewText: faker.lorem.paragraph(),
                    rating: faker.number.int({ min: 1, max: 5 })
                });
            });
        });

        promises = reviewData.map(async review => (await reviewRepository.create(review)).dataValues);
        reviewData = await Promise.all(promises);

        // Create comments
        let commentData = [];
        reviewData.forEach(review => {
            getRandomElements(userData.filter(user => review.userId !== user.id), n_comment_per_review)
                .forEach(user => {
                    commentData.push({
                        userId: user.id,
                        reviewId: review.id,
                        commentText: faker.lorem.words()
                    });
                });
        });

        promises = commentData.map(async comment => (await commentRepository.create(comment)).dataValues);
        commentData = await Promise.all(promises);

        // Create follows
        let followData = [];
        userData.forEach(user => {
            getRandomElements(userData.filter(user2 => user2.id !== user.id), n_follower_per_user)
                .forEach(user2 => {
                    followData.push({
                        followedId: user.id,
                        followerId: user2.id
                    });
                });
        });

        promises = followData.map(async follow => await followRepository.create(follow.followerId, follow.followedId).dataValues);
        followData = await Promise.all(promises);

    } catch (err) {
        console.error(err);
    }
};
