const { EmailValidator } = require('@angular/forms');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// const emailValidator  = require('')
const employeeRoles = mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    roleId: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true,
    },
    middle_name: {
        type: String
    },
    last_name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    },
    departmentId: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    mobile_number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        email: EmailValidator,
        required: true
    }
});

employeeRoles.plugin(uniqueValidator);
module.exports = mongoose.model('EmployeeTable', employeeRoles);