const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userRoles = mongoose.Schema({
    role: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Number,
    },
    updated_at: {
        type: Number,
    },
    actual_updated_at: {
        type: Number,
        default: null
    },
});

userRoles.plugin(uniqueValidator);
module.exports = mongoose.model('UserRoles', userRoles);