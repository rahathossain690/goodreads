const followRepository = require('../repository/followRepository');

class FollowController {

    async follow(req, res, next) {
        const followerId = req.userData?.id;
        const { followedId } = req.body;
        
        if (followedId == followerId) {
            next(new Error('Follower and followee has to be different'))

            return;
        }

        try {
            const follow = await followRepository.create(followerId, followedId);
            res.status(201).send();
        } catch(error) {
            next(new Error('Error following user'));
        }
    }

    async unfollow(req, res, next) {
        const followerId = req.userData?.id;
        const { followedId } = req.body;

        try {
            await followRepository.remove(followerId, followedId);
            res.status(204).send();
        } catch (error) {
            next(new Error('Error unfollowing user'));
        }
    }

    async getFollowers(req, res, next) {
        const { id } = req.params;

        const followers = await followRepository.findByFollowedId(id);
        res.json(followers);
    }

    async getFollowing(req, res, next) {
        const { id } = req.params;

        const following = await followRepository.findByFollowerId(id);
        res.json(following);
    }
}

module.exports = new FollowController()
