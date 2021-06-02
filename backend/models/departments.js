const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userDepartment = mongoose.Schema({
    department: {
        type: String,
        required: true,
        unique: true
    },
    departmentId: {
        type: String,
        required: true,
        unique: true
    }
});

userDepartment.plugin(uniqueValidator);
module.exports = mongoose.model('UserDepartment', userDepartment);