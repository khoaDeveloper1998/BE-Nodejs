// Require third-party middleware
const mongoose = require('mongoose');
const role_model = require('../models/Role');
// Initialize User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
})
module.exports = mongoose.model("User",UserSchema,"User")
