// const { EmailValidator } = require('@angular/forms');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// const emailValidator  = require('')
const employeeRoles = mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserRoles',
        default: null
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDepartment',
        default: null
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

employeeRoles.plugin(uniqueValidator);
module.exports = mongoose.model('EmployeeTable', employeeRoles);