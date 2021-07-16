const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const bugDetail = mongoose.Schema({

    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeTable',
        default: null
    },

    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project_master',
        default: null
    },

    bug_status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bug_status',
        default: null
    },

    bug_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bug_type',
        default: null
    },

    bug_priority: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bug_priority',
        default: null
    },

    bug_no: {
        type: Number,
        default: null
    },

    project_name: {
        type: String,
        default: null
    },

    created_name: {
        type: String,
        default: null
    },

    bug_title: {
        type: String,
        require: true,
        unique: true
    },

    start_date: {
        type: Number,
        default: null
    },

    bug_description: {
        type: String
    },

    image: {
		type: Array,
		default: null
	},
    
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

bugDetail.plugin(uniqueValidator);
module.exports = mongoose.model('bug_detail', bugDetail);

