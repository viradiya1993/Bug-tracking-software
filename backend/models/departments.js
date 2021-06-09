const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userDepartment = mongoose.Schema({
    department: {
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

userDepartment.plugin(uniqueValidator);
module.exports = mongoose.model('UserDepartment', userDepartment);