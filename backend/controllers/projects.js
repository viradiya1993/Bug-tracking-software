const dateFormat = require('../helper/dateFormate.helper');
const constant = require('../config/constant');
const commonFunction = require('../helper/commonFunction.helper')
const project = require('../models/projects');
const empyolee = require('../models/employee');
const Technology = require('../models/technology');
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');

//Create Project
exports.createProject = async (req, res, next) => {
    const {
        technology_id,
        departmentId,
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
        const isProjectNo = await project.findOne({
            project_no
        })
       if (isProjectNo) {
           return res.status(400).json({
               message: "Project no already exist choose another one."
           });
       }
        const isProjectName = await project.findOne({
            project_name
        })
        if (isProjectName) {
            return res.status(400).json({
                message: "Project Name already exist choose another one."
            });
        }
       const projects = new project();
       projects.technology_id = technology_id;
       projects.departmentId = departmentId;
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
                message: "Project added successfully.",
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

//Fetch Technology
exports.getTechnology = async (req, res, next) => {
	const postQuery = Technology.find();
	let fetchedPosts;
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return Technology.count();
        })
        .then(count => {
            res.status(200).json({
                message: "Technology fetched successfully",
                data: fetchedPosts,
                totalCount: count
            });
        }).catch(error => {
            res.status(500).json({
                message: "Fetching technology Failed"
            });
        });
}

exports.getProjectList = async (req, res, next) => {
	//query.$and = [
    //         { 'technologys._id': mongoose.Types.ObjectId(req.query.technology_id) },
    //     ]
    console.log('amit')
    try {
				var query = {};
				var sort = {};
				const search = req.query.q ? req.query.q : ''; // for searching
				if (req.query.sortBy) { // for sorting
					const parts = req.query.sortBy.split(':');
					sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
				}

				if (search) {
					query.$or = [
							{ 'tech_name': new RegExp(search, 'i') },
					]
				}

				const pageOptions = {
					page: parseInt(req.query.skip) || constant.PAGE,
					limit: parseInt(req.query.limit) || constant.LIMIT
				}

        // query.$or = [
				// 	{ technology_id: mongoose.Types.ObjectId(req.query.technology_id) },
				// 	{	departmentId: mongoose.Types.ObjectId(req.query.departmentId) },
				// 	{	employee_id: mongoose.Types.ObjectId(req.query.employee_id) }
				// ]
				query.$or = [
					{ technology_id: mongoose.Types.ObjectId('60be1d84a2ac210534fbd57a') },
					{ departmentId: mongoose.Types.ObjectId('60c0afc99214780b84a4fad1') },
					{ employee_id: mongoose.Types.ObjectId('60c71f19da179629b4a15def') }
				]

        // const projects = await project.find(query)
        const projects = await project.find()
        .populate({
            path: 'departmentId',
            select: 'department',
            model: 'UserDepartment',
         })
        .populate({
            path: 'technology_id',
            select: 'tech_name',
            model: 'technology',
        })
        .populate({
            path: 'employee_id',
            select: 'first_name,',
            model: 'EmployeeTable',
         })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .collation({ locale: "en" })
        .sort(sort);
        const totalcount = await project.count(query);
				console.log(projects)
				console.log(totalcount)
		return res.json(commonFunction.getStandardResponse(200,"Fetch Projects", {projects, totalcount}))
		
		

		
      
    } catch (error) {
        console.log(error,'-------- error');
    }
}

//Fetch Project Details
exports.getProjectDetail = async (req, res, next) => {
    try {
        const projects = await project.findOne({
            _id: req.params.id
        });
        if (!projects) {
            return res.status(404).json({
                message: "Project details not available.",
                data: {}
            });
        }
        return res.status(200).json({
            message: "Projects detail fetch successfully.",
            projects
        });
       
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong. Please try again later.",
            data: {}
        })
    }
}

//Update Project Details
exports.updateProject = async (req, res, next) => {
    const { 
        technology_id,
        department_id,
        employee_id,
        project_no,
        project_name,
        project_description,
        status,
        start_date,
        end_date
    } = req.body;

    try {
        const isProjectExist = await project.findOne({
            technology_id,
            department_id,
            employee_id,
            project_no,
            project_name,
            project_description,
            status,
            start_date,
            end_date
        });
        if (isProjectExist) {
            return res.status(400).send({
                message: "Project Details already exist choose another one",
                data: {}
            });
        }
        const projects = await  project.findOne({
            _id: req.params.id
        });
        if (!projects) {
            return res.status(404).json({
                message: "Project details not found.",
                data: {}
            });
        }
       
        projects.technology_id = technology_id;
        projects.department_id = department_id;
        projects.employee_id = employee_id;
        projects.project_no = project_no;
        projects.project_name = project_name;
        projects.project_description = project_description;
        projects.status = status;
        projects.updated_at = currentTimeStamp;
        projects.actual_updated_at = currentTimeStamp;
        projects.save()
        .then(projects => {
            res.status(200).json({
                message: "Project Details updated.",
                data: projects
            });
        });
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong. Please try again later.",
            data: {}
        })
    }
}

//Delete Projects Details
exports.deleteProject = async (req, res, next) => {
    try {
        const projects = await project.findOne({
            _id: req.params.id
        });
        const query = await projects.deleteOne(technology);
        if (query.deletedCount === 1) {
            return res.status(200).json({
                message: "Deletion successfull!",
            });
        } else {
            return res.status(200).json({
                message: "Deletion failed!",
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong. Please try again later.",
            data: {}
        })
    }
}