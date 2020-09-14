const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require('../models/User');
const Role = require('../models/Role');


// verfiyToken using jwt.verify
const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']
    if (!token) {
        res.status(403).send({ message: "No token Provided" })
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    })
}
// check if user is admin 
const isAdmin = (req, res, next) => {
    User
        .findById({ _id: req.userId })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }
            if (user) {
                Role
                    .find({
                        _id: { $in: user.roles }
                    })
                    .exec((err, roles) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        for (let i = 0; i < roles.length; i++) {
                            if (roles[i].name.toLowerCase() == "admin") {
                                next();
                                return;
                            }
                        }
                        res.status(403).send({ message: "Role Admin Required" })
                    })
            }
        })
};


const isManager = (req, res, next) => {
    User
        .findById({
            _id: req.userId
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                Role
                    .find({ _id: { $in: user.roles } })
                    .exec((err, roles) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        if (roles) {
                            for (let i = 0; i < roles.length(); i++) {
                                if (roles[i].name.toLowerCase() == "manager") {
                                    next();
                                    return;
                                }
                            }
                            res.status(403).send({ message: "Role Admin Required" })
                        }
                    }
                    )
            }
        })
}

module.exports = {
    verifyToken,
    isAdmin,
    isManager
}