const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const technology = mongoose.Schema({
    tech_name: {
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
	},
});

technology.plugin(uniqueValidator);
module.exports = mongoose.model('technology', technology);