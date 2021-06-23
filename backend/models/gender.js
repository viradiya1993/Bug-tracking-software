const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const GenderSchema = mongoose.Schema({
    value: {
        type: String,
        required: true,
        unique: true
    }
});

GenderSchema.plugin(uniqueValidator);
module.exports = mongoose.model('GenderTable', GenderSchema);