const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserRoles',
        default: null
    },
    reset_password_token: {
        type: String
    },
    reset_password_expires: {
        type: Number
    },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);