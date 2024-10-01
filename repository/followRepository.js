const followModel = require('../models/follow')

class FollowRepository {
    constructor() {
      this.followModel = followModel;
    }
  
    async create(followerId, followedId) {
      return this.followModel.create({ followerId, followedId });
    }
  
    async remove(followerId, followedId) {
      return this.followModel.destroy({ where: { followerId, followedId } });
    }
  
    async findByFollowerId(followerId) {
      return (await this.followModel.findAll({ where: { followerId }, include: 'followed' })).map(data => data.dataValues.followed.dataValues);
    }
  
    async findByFollowedId(followedId) {
      return (await this.followModel.findAll({ where: { followedId }, include: 'follower' })).map(data => data.dataValues.follower.dataValues);
    }
  }
  
  module.exports = new FollowRepository();
  