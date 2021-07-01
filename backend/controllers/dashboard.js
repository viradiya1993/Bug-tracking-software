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
        console.log(error);
		return res.status(400).json({
			message: "Something went wrong. Please try again later.",
			data: {}
		})
    }
}