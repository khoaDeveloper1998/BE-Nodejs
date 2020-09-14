const dbConnection = require("../db/dbConnection");
const roleModel = require('../models/Role');
const bcrypt = require('bcrypt');
const user_model = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const authConfig = require("../config/auth.config");


/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/

// insert new user
let createUser = async (userDTO) => {
    console.log("userDTO", userDTO);
    const user = new user_model({
        username: userDTO.username,
        email: userDTO.email,
        password: bcrypt.hashSync(userDTO.password, 8)
    });

    console.log('user = ', user);
    try {
        user.save((err, user) => {
            if (err) {
                throw err;
            }
            if (userDTO.roles) {

                roleModel.find(
                    {
                        name: { $in: userDTO.roles }
                    },
                    (err, roles) => {
                        if (err) {
                            throw err;
                        } else {
                            user.roles = roles.map(role => role._id);
                            user.save(err => {
                                if (err) {
                                    throw err;
                                }
                            })
                        }
                    }
                )
            } else {
                roleModel.findOne({
                    name: 'User'
                }, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        user.roles = result._id;
                        user.save(err => {
                            if (err) {
                                throw err;
                            }
                        })
                    }
                })
            }
        })
    } catch (err) { console.log('error in service layers with err = ', err); };
}


const userSignin = async (userDTO) => {
    return await user_model
        .findOne(
            {
                email: userDTO.email
            },
            {
                _v: 0
            }
        )
        .populate("roles")
        .exec()
        .then((user) => {
            if (!user) {
                return;
            }
            console.log("user with roles", user);
            let passwordIsValid = bcrypt.compareSync(userDTO.password, user.password);
            if (!passwordIsValid) {
                return;
            }
            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400
            })
            let authorities = [];
            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            let result = {
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            }
            return result;
        }
        )
}
module.exports = {
    createUser,
    userSignin
}
