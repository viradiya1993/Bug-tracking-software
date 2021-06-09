const dateFormat = require('../helper/dateFormate.helper');
const project = require('../models/projects');
const empyolee = require('../models/employee');

//Create Project
exports.createProject = async (req, res, next) => {
    const {
        technology_id,
        department_id,
        employee_id,
        project_no,
        project_name,
        project_description,
        status,
        start_date,
        end_date,
    } = req.body;
    let currentTimeStamp = dateFormat.set_current_timestamp();
    try {
       const projects = new project();
       projects.technology_id = technology_id;
       projects.department_id = department_id;
       projects.employee_id = employee_id;
       projects.project_no = project_no;
       projects.project_name = project_name;
       projects.project_description = project_description;
       projects.status = status;
       projects.created_at = currentTimeStamp;
       projects.updated_at = currentTimeStamp;
       projects.actual_updated_at = currentTimeStamp;

        if (start_date) {
            projects.start_date = dateFormat.convertTimestamp(start_date);
        }
        if (end_date) {
            projects.end_date = dateFormat.convertTimestamp(end_date);
        }
       projects.save()
       .then(projects => {
           return res.status(200).json({
               messge: "Project Added.",
           })
       })
       
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong. Please try again later"
        });
    }
}

//Fetch Employee
exports.getEmployee = async (req, res, next) => {
    const postQuery = empyolee.find();
    let fetchedPosts;
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return empyolee.count();
        })
        .then(count => {
            res.status(200).json({
                message: "Employee fetched successfully",
                data: fetchedPosts,
                totalCount: count
            });
        }).catch(error => {
            res.status(500).json({
                message: "Fetching employee Failed"
            });
        });
}