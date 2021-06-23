const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const bugsType = mongoose.Schema({
    bug_types: {
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

bugsType.plugin(uniqueValidator);
module.exports = mongoose.model('bug_type', bugsType);

