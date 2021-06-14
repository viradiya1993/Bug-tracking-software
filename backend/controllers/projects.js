const dateFormat = require('../helper/dateFormate.helper');
const constant = require('../config/constant');
const project = require('../models/projects');
const empyolee = require('../models/employee');
const Technology = require('../models/technology');
const { findOne } = require('../models/technology');
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
    console.log('amit')
    try {
        // let query = {
        //     department_id: '60c0afc99214780b84a4fad1'
        // }
        // const projects = await project.find(
        //    query
        // )
        //  .sort({ created_at: -1 })
        //  .populate({
        //     path: 'department_id',
        //     select: 'department',
        //     model: 'UserDepartment',
        //   })
        //   console.log(JSON.stringify(projects))
      //  console.log(projects)
      const sort = {};
      var query = {};
      const search = req.query.q ? req.query.q : ''; // for searching
      if (req.query.sortBy) { // for sorting
          const parts = req.query.sortBy.split(':');
          sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
      }
      const pageOptions = {
        page: parseInt(req.query.skip) || constant.PAGE,
        limit: parseInt(req.query.limit) || constant.LIMIT
      }
    //   let query = {
        
    //     //department_id: "60c0afc99214780b84a4fad1"
    //     //technology_id: "60c3330437b4375114a1185a"
    //     //employee_id: "60c0db5513a24c276cb3a0a4"
    //   }
    //   query.$and = [
    //     { 'department_id': ObjectID('60c0afc99214780b84a4fad1') },
    //     { 'technology_id': ObjectID('60c3330437b4375114a1185a') },
    //     { 'employee_id': ObjectID('60c0db5513a24c276cb3a0a4') }
    //   ]
    //   const projects = await project.find(query)
    if (req.query.technology_id) {
        query.$and = [
            { 'technologys._id': mongoose.Types.ObjectId(req.query.technology_id) },
        ]
    }
    if (req.query.technology_id && req.query.employee_id && req.query.departmentId) {
        query.$and = [
            { 'technologys._id': mongoose.Types.ObjectId(req.query.technology_id) },
            { 'employee._id': mongoose.Types.ObjectId(req.query.employee_id) },
            { 'empdepartment._id': mongoose.Types.ObjectId(req.query.departmentId) }
        ]
    }
     const projects = await project.aggregate([
         {
						$lookup: {
								from: 'technology',
								localField: 'technology_id',
								foreignField: '_id',
								as: 'technologys'
						}
         },	

				{ $unwind: '$technologys' },

				{
					$lookup: {
							from: 'UserDepartment',
							localField: 'departmentId',
							foreignField: '_id',
							as: 'departments'
					}
				},

				{ $unwind: "$departments" },
				
				{
					$lookup: {
							from: 'EmployeeTable',
							localField: 'employee_id',
							foreignField: '_id',
							as: 'empdepartment'
					}
				},

				{ $unwind: '$empdepartment' },

				{
					$match: query
				},
				{
					$group: {
						_id: null,
						count: { $sum: 1 },
						'project_data': {
							$push: {
								'_id': '$_id',
								'project_no': '$project_no',
								'project_name': '$project_name',
								'project_description': '$project_description',
								'status': '$status',
								'start_date': '$start_date',
								'end_date': '$end_date',
							  'technology_id': '$technologys._id',
							  'tech_name': '$technologys.tech_name',
							  'department': '$departments.department',
								'departmentId': '$departments._id',
								'employee_id': '$empdepartment._id',
								'first_name': '$empdepartment.first_name'
							}
						}
					}
				},
				
     ]) 
		 if (projects.length <= 0) {
				return res.status(200).send({
						message: 'success projects',
						data: {
								totalProjects: [{ count: 0 }],
								projects: [{
									project_data
								}],
						}
				});
		}

		
      console.log(projects,'-----------Oq')

    } catch (error) {
        console.log(error);
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