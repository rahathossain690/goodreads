const User = require("../models/user");

class UserRepository {
  
    async create(userData) {
      return User.create(userData);
    }
  
    async findByEmail(email) {
      return User.findOne({ where: { email } });
    }
  
    async findById(userId) {
      return User.findByPk(userId);
    }
  
    async findAll() {
      return User.findAll();
    }
  }
  
  module.exports = new UserRepository();