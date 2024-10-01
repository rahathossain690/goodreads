const userRepository = require('../repository/userRepository.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {

    async register(req, res, next) {
        const { username, email, password } = req.body;

        const userExists = await userRepository.findByEmail(email);
        if (userExists) {
            next(new Error('Email already exists'))

            return;
        }
        
        const newUser = await  userRepository.create({ username, email, password });
        res.status(201).send();
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await userRepository.findByEmail(email);
        if (!user) {
            next(new Error('Invalid credential'));

            return;
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            next(new Error('Invalid credential'));

            return;
        }

        const userData = user.dataValues;

        const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }

    async profile(req, res) {
        res.json(req.userData)
    }

    async getUserById(req, res, next) {
        const {id} = req.query;

        const user = await userRepository.findById(id)

        if (!user) {
            next(new Error("No user found"))
        }

        res.json(user)
    }

    async getAll(req, res) {
        res.json((await userRepository.findAll()).map(user => user.dataValues).filter(user => user.id != req.userData.id))
    }
}



module.exports = new AuthController();