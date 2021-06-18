const dateFormat = require('../helper/dateFormate.helper');
const constant = require('../config/constant');
const commonFunction = require('../helper/commonFunction.helper')
const projectData = require('../models/projects');
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
		project_manager,
		status,
		start_date,
		end_date,
	} = req.body;
	let currentTimeStamp = dateFormat.set_current_timestamp();
	try {
		const isProjectNo = await projectData.findOne({
			project_no
		})
		if (isProjectNo) {
			return res.status(400).json({
				message: "Project no already exist choose another one."
			});
		}
		const isProjectName = await projectData.findOne({
			project_name
		})
		if (isProjectName) {
			return res.status(400).json({
				message: "Project Name already exist choose another one."
			});
		}
		const projectDetails = new projectData();
		projectDetails.technology_id = technology_id;
		projectDetails.departmentId = departmentId;
		projectDetails.employee_id = employee_id;
		projectDetails.project_no = project_no;
		projectDetails.project_name = project_name;
		projectDetails.project_description = project_description;
		projectDetails.project_manager = project_manager;
		projectDetails.status = status;
		projectDetails.created_at = currentTimeStamp;
		projectDetails.updated_at = currentTimeStamp;
		projectDetails.actual_updated_at = currentTimeStamp;

		if (start_date) {
			projectDetails.start_date = dateFormat.convertTimestamp(start_date);
		}
		if (end_date) {
			projectDetails.end_date = dateFormat.convertTimestamp(end_date);
		}
		projectDetails.save()
			.then(projectDetails => {
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
	try {
		var query = {};
		var sort = {};
		const search = req.query.q ? req.query.q : ''; // for searching
		start_date = req.query.start_date ? req.query.start_date : '';
		end_date = req.query.end_date ? req.query.end_date : '';

		if (req.query.sortBy) { // for sorting
			const parts = req.query.sortBy.split(':');
			sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
		}

		const pageOptions = {
			page: parseInt(req.query.skip) || constant.PAGE,
			limit: parseInt(req.query.limit) || constant.LIMIT
		}

		if (req.query.technology_id) {
			query.$or = [
				{ 'technology_id': mongoose.Types.ObjectId(req.query.technology_id) },
			]
		}

		if (req.query.departmentId) {
			query.$or = [
				{ 'departmentId': mongoose.Types.ObjectId(req.query.departmentId) },
			]
		}


		if (req.query.employee_id) {
			query.$or = [
				{ 'employee_id': mongoose.Types.ObjectId(req.query.employee_id) },
			]
		}

		if (req.query.project_manager) {
			query.$or = [
				{ 'project_manager': mongoose.Types.ObjectId(req.query.project_manager) },
			]
			console.log(req.query.project_manager,'manager id');
		}
		if (search) {
			query.$or = [
				{ 'project_name': new RegExp(search, 'i') },
				{ 'status': new RegExp(search, 'i') },
			]
		}
		
		if (start_date && end_date) {
			query.start_date = { $gte: start_date },
				query.$or = [
					{ 'end_date': { $lte: end_date } },
					{ 'end_date': { $eq: null } },
				]
		}
	
		// const projectDetails = await projectData.aggregate([
		// 	{ 
		// 		$lookup : { 
		// 			from : "userdepartments", 
		// 			localField : "departmentId", 
		// 			foreignField : "_id", 
		// 			as : "Departments"
		// 		}
		// 	},
		// 	{$unwind: "$Departments"},
		// 	{ 
		// 		$lookup : { 
		// 			from : "technologies", 
		// 			localField : "technology_id", 
		// 			foreignField : "_id", 
		// 			as : "Tech"
		// 		}
		// 	},
		// 	{$unwind: "$Tech"},
		// 	 { 
		// 		$lookup : { 
		// 			from : "employeetables", 
		// 			localField : "employee_id", 
		// 			foreignField : "_id", 
		// 			as : "Emp"
		// 		}
		// 	},
		// 	{$unwind: "$Emp"}, 

		// 	{
        //         $match: query
        //     },

        //     {
        //         $sort: sort
        //     },

        //     {
        //         $skip: (pageOptions.page * pageOptions.limit)
        //     },

        //     {
        //         $limit: pageOptions.limit
        //     },
			
		// 	{
		// 		$project: {
		// 			project_no: 1,
		// 			project_name: 1,
		// 			project_description: 1,
		// 			project_manager: 1,
		// 			status: 1,
		// 			start_date: 1,
		// 			end_date: 1,
		// 			department: "$Departments.department",
		// 			tech_name: "$Tech.tech_name",
		// 			employee_id: "$Emp.first_name"
					
		// 		}
		// 	},
		// ])
		// console.log(projectDetails.length, 'projects')
		const projectDetails = await projectData.find(query)
			.populate({
				path: 'departmentId',
				select: 'department',
				model: 'UserDepartment'
				
			})
			.populate({
				path: 'technology_id',
				select: 'tech_name',
				model: 'technology'
				
			})
			.populate({
				path: 'employee_id',
				select: 'first_name',
				model: 'EmployeeTable'
				
			})
			.populate({
				path: 'project_manager',
				select: 'first_name',
				model: 'EmployeeTable'
			})
			.skip(pageOptions.page * pageOptions.limit)
			.limit(pageOptions.limit)
			.collation({ locale: "en" })
			.sort(sort);
		if (projectDetails.length <= 0) {
			return res.status(200).json({
				message: "Projects not available.",
				data: {
					totalcount: 0,
					projects: []
				}
			});
		}

		const totalcount = await projectData.countDocuments(query);
		for (let index = 0; index < projectDetails.length; index++) {
			let techname = [];
			let employee = [];
			
			const element = projectDetails[index].technology_id;
			const empValue = projectDetails[index].employee_id;
			for (let i = 0; i < element.length; i++) {
				const ele = element[i];
				techname.push(ele.tech_name)
			}

			for (let index = 0; index < empValue.length; index++) {
				const element = empValue[index];
				employee.push(element.first_name);
			}
			projectDetails[index].technology_id = techname.join(',');
			projectDetails[index].employee_id = employee.join(',');
		
		}
		 
		return res.status(200).json({
			message: "Projects list fatch successfully.",
			data: {
				projectDetails,
				totalcount
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

//Fetch Project Details
exports.getProjectDetail = async (req, res, next) => {
	try {
		const projectDetails = await projectData.findOne({
			_id: req.params.id
		});
		if (!projectDetails) {
			return res.status(404).json({
				message: "Project details not available.",
				data: {}
			});
		}
		
		for (let i = 0; i < projectDetails.technology_id.length; i++) {
			const ele = projectDetails.technology_id[i];
			await Technology.findOne({ _id: ObjectID(ele) })
				.then(tech => {
					projectDetails.technology_id[i] = tech["tech_name"];
				})
		}
		
		for (let i = 0; i < projectDetails.employee_id.length; i++) {
			const ele = projectDetails.employee_id[i];
			await empyolee.findOne({_id: ObjectID(ele)})
			.then(emp => {
			 projectDetails.employee_id[i] = emp["first_name"];
			})
		}

		return res.status(200).json({
			message: "Projects detail fetch successfully.",
			projectDetails
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
		departmentId,
		employee_id,
		project_no,
		project_name,
		project_description,
		project_manager,
		status,
		start_date,
		end_date
	} = req.body;

	let currentTimeStamp = dateFormat.set_current_timestamp();
	try {
		
		const projectDetails = await projectData.findOne({
			_id: req.params.id
		});
		if (!projectDetails) {
			return res.status(404).json({
				message: "Project details not found.",
				data: {}
			});
		}

		projectDetails.technology_id = technology_id;
		projectDetails.departmentId = departmentId;
		projectDetails.employee_id = employee_id;
		projectDetails.project_no = project_no;
		projectDetails.project_name = project_name;
		projectDetails.project_description = project_description;
		projectDetails.project_manager = project_manager;
		projectDetails.status = status;
		projectDetails.updated_at = currentTimeStamp;
		projectDetails.actual_updated_at = currentTimeStamp;

		if (start_date) {
			projectDetails.start_date = dateFormat.convertTimestamp(start_date);
		}
		if (end_date) {
			projectDetails.end_date = dateFormat.convertTimestamp(end_date);
		}
		projectDetails.save()
			.then(projectDetails => {
				res.status(200).json({
					message: "Project Details updated.",
					data: projectDetails
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
        const projectDetails = await projectData.findOne({
            _id: req.params.id
        }); 
        const query = await projectData.deleteOne(projectDetails);
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