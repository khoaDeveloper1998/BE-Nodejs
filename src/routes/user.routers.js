const express = require('express');
const app = express();
const { validationResult } = require('express-validator');
// import application middlewares
const validatorForUser = require('../middleware/validatior');
const verifySignUp = require('../middleware/verifySignUp');
const passport = require('passport');
const passportAuth = require('../middleware/passport.auth');
// import model 
const user_controller = require('../controller/auth.controller');
module.exports = function (app) {
    app.get('/api/auth/test', (req, res) => {
        res.status(200).send("Testing user routes");
    })
    app.post('/api/auth/signup', [
        validatorForUser.validateRegisterUser(),
        verifySignUp.checkDuplicateUserNameOrEmail,
        verifySignUp.checkRoleExisted
    ], (req, res, next) => {
        console.log(req);
        next();
    }, (req, res) => {
        res.status(200).send(req.body);
        user_controller.signup(req, res);
    });
    app.post('/api/auth/signin',
        passport.authenticate('local-signin', { session: false }),
        (req, res, next) => {
            next();
        },
        (req, res) => {
            console.log("run through here");
            const result = user_controller.signin(req, res);
        }
    )
};