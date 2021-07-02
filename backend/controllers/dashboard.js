const mongoose = require('mongoose');

const project = require('../models/projects');
const empModel = require('../models/employee');




exports.getProjectCount = async (req, res, next) => {
	try {
        var query = {}
        if (req.query.statusOpen && req.query.statusInPro) {
            query.$or = [
                { 'status': mongoose.Types.ObjectId(req.query.statusOpen) },
                { 'status': mongoose.Types.ObjectId(req.query.statusInPro) }
            ]
        }
       
        projects = await project.countDocuments(query)
        totalProjects = await project.countDocuments()
        
        return res.status(200).json({
            message: "Dashboard data fatch successfully",
            data: {
                projects,
                totalProjects
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

exports.getActiveEmp = async (req, res, next) => {
    try {
        activeEmployee = await empModel.countDocuments({ status:  mongoose.Types.ObjectId(req.query.status) });
        return res.status(200).json({
            message: "Dashboard data fatch successfully",
            data: {
                activeEmployee
            }
        });
    } catch (error) {
			return res.status(400).json({
				message: "Something went wrong. Please try again later.",
				data: {}
			})
    }
}

exports.AssignProject = async (req, res, next) => {
    try {
				empdetails = await empModel.findOne({email: req.userData.email})
				var Emp_id = empdetails._id
		  	var	query  = {'employee_id': mongoose.Types.ObjectId(Emp_id) }
        totalAssignProjects = await project.countDocuments(query)
        return res.status(200).json({
            message: "Dashboard data fatch successfully",
            data: {
							totalAssignProjects
            }
        });
    } catch (error) {
				return res.status(400).json({
					message: "Something went wrong. Please try again later.",
					data: {}
				})
    }
}

exports.AssignActiveProject = async (req, res, next) => {
		try {
			var query = {}
			empdetails = await empModel.findOne({email: req.userData.email})
			var Emp_id = empdetails._id
			if (req.query.statusOpen && req.query.statusInPro) {
					query.$or = [
							{ 'status': mongoose.Types.ObjectId(req.query.statusOpen) },
							{ 'status': mongoose.Types.ObjectId(req.query.statusInPro) },
							{'employee_id': mongoose.Types.ObjectId(Emp_id) }
					]
			}
			totalActiveProjects = await project.countDocuments(query)
			return res.status(200).json({
					message: "Dashboard data fatch successfully",
					data: {
						totalActiveProjects
					}
			});
		} catch (error) {
			console.log(error);
		}
}