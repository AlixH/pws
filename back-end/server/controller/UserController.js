const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {

    register : async function (req, res, next) {
        console.log("register user");
        // Create a new user
        try {
            const user = new User(req.body);
            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    },


    login: async function (req, res, next) {
        console.log("login user");
        //Login a registered user
        try {
            const password = req.body.password;
            const email = req.body.email;
            const user = await User.findByCredentials(email, password);
            if (!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            }
            const token = await user.generateAuthToken();
            res.send({user, token})
        } catch (error) {
            res.status(400).send(error)
        }
    }
};
