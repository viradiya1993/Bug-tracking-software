const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const project = mongoose.Schema({
   
    technology_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'technology',
        default: null
    }],
    department_id: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDepartment',
        default: null
    }],
   
    employee_id: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeTable',
        default: null
    }],
    project_no : { 
        type: Number,
        require: true, 
        unique: true
    },
    project_name: { 
        type: String,
        require: true,
        unique: true
    },
    project_description: { 
        type: String
    },
    status : { 
        type : String 
    },
    start_date: {
         type: Number,
        default : null
    },
    end_date: { 
        type: Number, 
        default : null 
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