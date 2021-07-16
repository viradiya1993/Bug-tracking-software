const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CommentDetails = mongoose.Schema({

	bug_status: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'bug_status',
		default: null
	},

	bug_title: {
		type: String,
		default: null
	},

	image: {
		type: Array,
		default: null
	},

	task_description: {
		type: String
	},
	
	employee_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'EmployeeTable',
		default: null
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

CommentDetails.plugin(uniqueValidator);
module.exports = mongoose.model('comment_master', CommentDetails);