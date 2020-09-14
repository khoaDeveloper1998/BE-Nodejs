const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const user_model = require('../models/User');

// passport strategy 
const JwtStrategy = require('passport-jwt').Strategy;
const Extractjwt = require('passport-jwt').ExtractJwt;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config/auth.config');
const bcrypt = require('bcrypt')
const role_model = require('../models/Role');
passport.use('local-signin', new localStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        console.log("username and password " + email + password);
        console.log("req.body  = " + JSON.stringify(req.body));
        return await user_model
            .findOne(
                {
                    email: email
                },
                {
                    __v: 0
                }
            )
            .populate('roles')
            .exec((err, user) => {
                console.log("user", user);
                if (err || !user) {
                    return done(err, false, { message: "failed to received credentials" });
                }
                const isValidPassword = bcrypt.compareSync(password, user.password);
                if (!isValidPassword) {
                    console.log("here1");
                    return done(null, false, { message: "the password is wrong" });

                } else {
                    console.log("here2");
                    return done(null, JSON.stringify(user));
                }
            })
    }))
// verify token and check if user is an admin
passport.use('jwt', new JwtStrategy(
    {
        jwtFromRequest: Extractjwt.fromHeader('x-access-token'),
        secretOrKey: config.secret
    }, async (jwtPayload, done) => {
        console.log('jwtPayload', JSON.stringify(jwtPayload));
        return await user_model
            .findOne({ _id: jwtPayload.id })
            .populate('roles')
            .exec((err, user) => {
                if (err || !user) {
                    return done(null, false, { message: "invalid token access" })
                }
                role_model
                    .find({ _id: { $in: user.roles } })
                    .exec((err, roles) => {
                        if (err || !roles) {
                            return done(null, false, { message: "cant find any roles" })
                        }
                        console.log("roles found = " + roles);
                        for (let i = 0; i < roles.length; i++) {
                            console.log('roles name', roles[i].name);
                            if (roles[i].name.toLowerCase() == "admin") {
                                return done(null, user);
                            }
                        }
                        console.log("run here");
                        return done(null, false, { message: "Failed" });
                    })

            })
    }))
// Use the GoogleStrategy within Passport.
// Strategies in passport require a`verify` function, which accept
// credentials(in this case, a token, tokenSecret, and Google profile), and
// invoke a callback with a user object.
    passport.use(new GoogleStrategy({
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: "/auth/google/callback"
    },
        function (accessToken, tokenSecret, profile, done) {
            console.log(JSON.stringify(profile));
            console.log(accessToken);
        }
    ))