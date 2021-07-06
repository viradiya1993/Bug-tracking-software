const dateFormat = require('../helper/dateFormate.helper');
const sendMail = require('../services/email.service');
const projectCreationTemplete = require('../services/emailTemplate/projectCreationTemplate');
const projectAssignTemplate = require('../services/emailTemplate/projectAssignTemplate');
const constant = require('../config/constant');
const mongoose = require('mongoose');

const project = require('../models/projects');
const Project_Status = require('../models/projectStatus');
const empyolee = require('../models/employee');
const Technology = require('../models/technology');
const { query } = require('express-validator');

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
		// const logoUrl = 'http://localhost:3000/api' + '/' + constant.LOGO_MARKER_IMG_URL + '/' + constant.LOGO_IMG_NAME;
		const logoUrl = constant.URL + '/' + constant.LOGO_MARKER_IMG_URL + '/' + constant.LOGO_IMG_NAME;

		const faceUrl = constant.URL + '/' + constant.LOGO_MARKER_IMG_URL + '/' + constant.Facebook_Img;
		const linkUrl = constant.URL + '/' + constant.LOGO_MARKER_IMG_URL + '/' + constant.LinkedIn_Img;
		const twitterUrl = constant.URL + '/' + constant.LOGO_MARKER_IMG_URL + '/' + constant.Twitter_Img;

		const devloper = await empyolee.find({
			_id: req.body.employee_id
		});

		const manager = await empyolee.findOne({
			_id: req.body.project_manager
		});

		if (devloper) {
			let devName = [];
			for (let i = 0; i < devloper.length; i++) {
				devName.push(devloper[i].first_name)
				sendMail(devloper[i].email, 'Project Created.',
					projectCreationTemplete({
						logo: logoUrl,
						Facebook: faceUrl,
						LinkedIn: linkUrl,
						Twitter: twitterUrl,
						projectName: req.body.project_name,
						projectManger: manager.first_name
					}));

			}
			sendMail(manager.email, 'Project Assigned to developer.',
				projectAssignTemplate({
					logo: logoUrl,
					projectName: req.body.project_name,
					developer: devName.join(',')
				}));

		}

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
		projects.project_manager = project_manager;
		projects.status = status;
		projects.created_at = currentTimeStamp;
		projects.updated_at = currentTimeStamp;
		projects.actual_updated_at = currentTimeStamp;
		projects.created_by = req.userData.userId
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

//Fetch Technology
exports.getTechnology = async (req, res, next) => {
	const postQuery = Technology.find();
	let fetchedPosts;
	postQuery
		.then(documents => {
			fetchedPosts = documents;
			return Technology.countDocuments();
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

//Fetch Project Detail
exports.getProjectList = async (req, res, next) => {
	try {
		var query = {};
		var sort = {};
		const search = req.query.q ? req.query.q : ''; // for searching
		if (req.query.sortBy) { // for sorting
			const parts = req.query.sortBy.split(':');
			sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
		}

		const pageOptions = {
			page: parseInt(req.query.skip) || constant.PAGE,
			limit: parseInt(req.query.limit) || constant.LIMIT
		}

		if (search) {
			query.$or = [
				{ 'project_name': new RegExp(search, 'i') },
				{ 'project_description': new RegExp(search, 'i') },
			]
		}

		if (req.query.departmentId) {
			query.$or = [
				{ 'departmentId': mongoose.Types.ObjectId(req.query.departmentId) },
			]
		}

		if (req.query.technology_id) {
			query.$or = [
				{ 'technology_id': mongoose.Types.ObjectId(req.query.technology_id) },
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
		}

		if (req.query.status) {
			query.$or = [
				{ 'status': mongoose.Types.ObjectId(req.query.status) },
			]
		}
		const projects = await project.find(query)
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
				select: 'first_name',
				model: 'EmployeeTable',
			})
			.populate({
				path: 'project_manager',
				select: 'first_name',
				model: 'EmployeeTable',
			})
			.populate({
				path: 'status',
				select: 'value',
				model: 'Project_Status',
			})
			.skip(pageOptions.page * pageOptions.limit)
			.limit(pageOptions.limit)
			.collation({ locale: "en" })
			.sort(sort);

		if (projects.length <= 0) {
			return res.status(200).json({
				message: "Projects not available.",
				data: {
					totalcount: 0,
					projects: []
				}
			});
		}

		const totalcount = await project.countDocuments(query);

		return res.status(200).json({
			message: "Projects list fatch successfully.",
			data: {
				projects,
				totalcount
			}
		});

	} catch (error) {
		return res.status(400).json({
			message: "Something went wrong. Please try again later.",
			data: {}
		})
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

		for (let i = 0; i < projects.technology_id.length; i++) {
			const ele = projects.technology_id[i];
			await Technology.findOne({ _id: mongoose.Types.ObjectId(ele) })
				.then(tech => {
					projects.technology_id[i] = tech["tech_name"];
				})
		}

		for (let i = 0; i < projects.employee_id.length; i++) {
			const ele = projects.employee_id[i];
			await empyolee.findOne({ _id: mongoose.Types.ObjectId(ele) })
				.then(emp => {
					projects.employee_id[i] = emp["first_name"];
				})
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
		const logoUrl = 'http://localhost:3000/api' + '/' + constant.LOGO_MARKER_IMG_URL + '/' + constant.LOGO_IMG_NAME;

		const devloper = await empyolee.find({
			_id: req.body.employee_id
		});

		const manager = await empyolee.findOne({
			_id: req.body.project_manager
		});

		if (devloper) {
			let devName = [];
			for (let i = 0; i < devloper.length; i++) {
				devName.push(devloper[i].first_name)
				sendMail(devloper[i].email, 'Project Created.',
					projectCreationTemplete({
						logo: logoUrl,
						projectName: req.body.project_name,
						projectManger: manager.first_name
					}));

			}
			sendMail(manager.email, 'Project Assigned to developer.',
				projectAssignTemplate({
					logo: logoUrl,
					projectName: req.body.project_name,
					developer: devName.join(',')
				}));
		}

		const projects = await project.findOne({
			_id: req.params.id
		});
		if (!projects) {
			return res.status(404).json({
				message: "Project details not found.",
				data: {}
			});
		}

		projects.technology_id = technology_id;
		projects.departmentId = departmentId;
		projects.employee_id = employee_id;
		projects.project_no = project_no;
		projects.project_name = project_name;
		projects.project_description = project_description;
		projects.project_manager = project_manager;
		projects.status = status;
		projects.updated_at = currentTimeStamp;
		projects.actual_updated_at = currentTimeStamp;
		projects.updated_by = req.userData.userId

		if (start_date) {
			projects.start_date = dateFormat.convertTimestamp(start_date);
		}
		if (end_date) {
			projects.end_date = dateFormat.convertTimestamp(end_date);
		}
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
		const query = await project.deleteOne(projects);
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

exports.addStatus = async (req, res, next) => {
	try {
		Project_Status.findOne({ value: req.body.value })
			.then(user => {
				if (user) {
					return res.status(400).json({
						message: "This Status is Already Exist"
					});
				}
				const Status = new Project_Status({
					value: req.body.value,
					created_at: dateFormat.set_current_timestamp(),
					updated_at: dateFormat.set_current_timestamp(),
					actual_updated_at: dateFormat.set_current_timestamp(),
				});
				Status.save()
					.then(result => {
						res.status(200).json({
							message: 'Status Created Succesfully',
							result: result
						})
					})
					.catch(err => {
						res.status(500).json({
							message: "Invalid Authentication Credential!"
						})
					})
			});
	} catch {
		return res.status(400).json({
			message: "Something went wrong. Please try again later.",
			data: {}
		});
	}
}

//Get Project Status
exports.getStatus = async (req, res, next) => {
	try {
		const postQuery = Project_Status.find();
		let fetchedPosts;
		postQuery
			.then(documents => {
				fetchedPosts = documents;
				return Project_Status.countDocuments();
			})
			.then(count => {
				res.status(200).json({
					message: "Status fetched successfully",
					status: fetchedPosts,
					status_Count: count
				});
			}).catch(error => {
				res.status(500).json({
					err: error,
					message: "Fetching Status Failed"
				});
			});
	} catch {
		return res.status(400).json({
			message: "Something went wrong. Please try again later.",
			data: {}
		})
	}
}


exports.updateStatusById = async (req, res, next) => {
	let projectId = req.body.projectId;
	let statusId = req.body.statusId;
	try {
		let query = { _id: mongoose.Types.ObjectId(projectId) },
			update = {
				'$set': {
					status: mongoose.Types.ObjectId(statusId)
				}
			}

		project.findOneAndUpdate(query, update)
			.then(result => {
				res.status(200).json({
					message: "Status Update successfully"
				});
			}).catch(error => {
				res.status(500).json({
					err: error,
					message: "Updating Status Failed"
				});
			});
	} catch {
		return res.status(400).json({
			message: "Something went wrong. Please try again later."
		})
	}
}

