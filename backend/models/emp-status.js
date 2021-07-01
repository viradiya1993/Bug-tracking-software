const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const employeeStatus = mongoose.Schema({
    status: {
        type: String,
        require: true,
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
    }
});

employeeStatus.plugin(uniqueValidator);

module.exports = mongoose.model('employee_Status', employeeStatus);
