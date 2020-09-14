// Require third-part middlewares
const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');

// import models
const User = require('../models/User');
const Role = require('../models/Role');
const user_service = require('../services/user.service');

//sign up 
const signup = async (req, res) => {
    const userDTO = req.body;
    try {
        await user_service.createUser(userDTO);
        res.status(200).send({ message: "User sign up successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "found err " + error });
    }
}
//sign in
const signin = async (req, res) => {
    const userDTO = req.body;
    try {
        const result = await user_service.userSignin(userDTO);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(400).send({ message: "Please check your username and password" })
        }
    } catch (error) {
        console.log("err",error);
        res.status(500).send({ message: "found err " + error });
    }
}
module.exports = {
    signup,
    signin
}