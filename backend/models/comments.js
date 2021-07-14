const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const taskDetails = mongoose.Schema({

	bug_status: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'bug_status',
 		default: null
  },

	bug_details: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'bug_detail',
 		default: null
  },

	image: {
		type: String,
		default: null
  },

	task_description: {
		type: String
  },


	created_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		default: null
	},

	created_name: {
		type: String,
		default: null
	},

	updated_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
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

taskDetails.plugin(uniqueValidator);
module.exports = mongoose.model('comment_master', taskDetails);