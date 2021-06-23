const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const bugspriority = mongoose.Schema({
    priority: {
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

bugspriority.plugin(uniqueValidator);
module.exports = mongoose.model('bug_priority', bugspriority);

