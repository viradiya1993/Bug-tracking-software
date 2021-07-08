const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const bugsStatus = mongoose.Schema({
    status: {
        type: String,
        require: true,
        unique: true
    },
    color : {
        type: String,
        default: null
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

bugsStatus.plugin(uniqueValidator);
module.exports = mongoose.model('bug_status', bugsStatus);

