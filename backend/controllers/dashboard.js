const mongoose = require('mongoose');

const project = require('../models/projects');
const empModel = require('../models/employee');




exports.getProjectCount = async (req, res, next) => {
	try {
        var query = {}
        if (req.query.statusOpen) {
            query.$or = [
                { 'status': mongoose.Types.ObjectId(req.query.statusOpen) }
            ]
        }

				if (req.query.statusInPro) {
					query.$or = [
						{ 'status': mongoose.Types.ObjectId(req.query.statusInPro) }
					]
				}
				activeEmployee = await empModel.countDocuments({ status:  mongoose.Types.ObjectId(req.query.status) });
        projects = await project.countDocuments(query)
        totalProjects = await project.countDocuments()
        
        return res.status(200).json({
            message: "Dashboard data fatch successfully",
            data: {
                projects,
                totalProjects,
								activeEmployee
            }
        });
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "Something went wrong. Please try again later.",
			data: {}
		})
	}
}

exports.AssignActiveProject = async (req, res, next) => {
		try {
			empdetails = await empModel.findOne({email: req.userData.email})
			var Emp_id = empdetails._id;
			var	queryAssign  = {'employee_id': mongoose.Types.ObjectId(Emp_id) }
		  var query = {}
			if (req.query.statusOpen && req.query.statusInPro && Emp_id) {
					query.$and = [
							{ 'employee_id': mongoose.Types.ObjectId(Emp_id) }
					],
					query.$or = [
						{ 'status': mongoose.Types.ObjectId(req.query.statusOpen) },
						{ 'status': mongoose.Types.ObjectId(req.query.statusInPro) },
					]
			}
			totalAssignProjects = await project.countDocuments(queryAssign)
			totalActiveProjects = await project.countDocuments(query)
			return res.status(200).json({
					message: "Dashboard data fatch successfully",
					data: {
						totalAssignProjects,
						totalActiveProjects
					}
			});
		} catch (error) {
			console.log(error);
			return res.status(400).json({
				message: "Something went wrong. Please try again later.",
				data: {}
			})
		}
}

exports.AssignActivePMprojects = async (req, res, next) => {
	try {
			var query = {}
			manager_details = await empModel.findOne({email: req.userData.email})
			var manager_id = manager_details._id
		  var	queryAssign  = {'project_manager': mongoose.Types.ObjectId(manager_id) }
			query  = {'project_manager': mongoose.Types.ObjectId(manager_id) }
			if (req.query.statusOpen) {
					query.$or = [
							{ 'status': mongoose.Types.ObjectId(req.query.statusOpen) }
					]
			}

			if (req.query.statusInPro) {
				query.$or = [
					{ 'status': mongoose.Types.ObjectId(req.query.statusInPro) }
				]
			}
			activeAssignProject = await project.countDocuments(query)
			assignbyManager = await project.countDocuments(queryAssign)
			return res.status(200).json({
					message: "Dashboard data fatch successfully",
					data: {
						activeAssignProject,
						assignbyManager
					}
			});
	} catch (error) {
		console.log(error);
		 return res.status(400).json({
			message: "Something went wrong. Please try again later.",
			data: {}
		})
	}
}