const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const projectStatus = mongoose.Schema({
    value: {
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

projectStatus.plugin(uniqueValidator);

module.exports = mongoose.model('Project_Status', projectStatus);
