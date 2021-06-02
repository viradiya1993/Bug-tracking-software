const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userTypeSchema = mongoose.Schema({
    designation: {
        type: String,
        required: true,
        unique: true
    }
});

userTypeSchema.plugin(uniqueValidator);
module.exports = mongoose.model('UserType', userTypeSchema);