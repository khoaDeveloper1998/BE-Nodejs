// Require third-party middleware and Model
const User = require('../models/User')
const Role = require('../models/Role')
const { Mongoose } = require('mongoose')

const checkDuplicateUserNameOrEmail = async (req, res, next) => {
    // check duplicate UserName
    const result = await User
        .findOne({
            username: req.body.username
        })
        .exec((err, result) => {
            if (err) {
                res.status(500).send({ message: "Check your variables" });
                return;
            }
            if (result) {
                console.log("result",result);
                res.status(400).send({ message: "username exists" });
                return;
            }
               // check duplicate Email
            User
                .findOne({
                    email: req.body.email
                })
                .exec((err, result) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (result) {
                        res.status(500).send({ message: "email exists" });
                        return;
                    }
                    next();
                })
        })
}

const checkRoleExisted = async (req, res, next) => {
    if (req.body.roles) {
        let data = await Role.find({}, (err, docs) => {
            if (!err) {
                console.log(docs);
            } else {
                res.status(500).send({ message: err })
                return;
            }
        })
        for (let i = 0; i < req.body.roles.lengthl; i++) {
            if (!data.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Roles ${req.body.roles[i]} doesn't exist`
                })
                return;
            }
        }
        next();
    }
}
module.exports = {
    checkDuplicateUserNameOrEmail,
    checkRoleExisted
}