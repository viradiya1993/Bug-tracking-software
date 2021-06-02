const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userRoles = mongoose.Schema({
    role: {
        type: String,
        required: true,
        unique: true
    },
    roleId: {
        type: String,
        required: true,
        unique: true
    }
});

userRoles.plugin(uniqueValidator);
module.exports = mongoose.model('UserRoles', userRoles);