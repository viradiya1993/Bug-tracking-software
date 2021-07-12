const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const project = mongoose.Schema({
    technology_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'technology',
        default: null
    }],

    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDepartment',
        default: null
    },

    employee_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeTable',
        default: null
    }],

    project_no: {
        type: Number,
        default: null
    },

    project_name: {
        type: String,
        require: true,
        unique: true
    },

    project_description: {
        type: String
    },

    project_manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeTable',
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


    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project_Status',
        default: null
    },

    start_date: {
        type: Number,
        default: null
    },

    end_date: {
        type: Number,
        default: null
    },

    created_at: {
        type: Number
    },

    updated_at: {
        type: Number
    },

    actual_updated_at: {
        type: Number,
        default: null
    },

},
    {
        collection: 'project_master'
    }
);

project.plugin(uniqueValidator);

module.exports = mongoose.model('project_master', project);