const dateFormat = require('../helper/dateFormate.helper');
const constant = require('../config/constant');
const sendMail = require('../services/email.service');
const bugCreationTemplate = require('../services/emailTemplate/bugCreationTemplate');
const mongoose = require('mongoose');
const projectModel = require('../models/projects');
const bugStatus = require('../models/bugs-status');
const bugType = require('../models/bugtype');
const bugPriority = require('../models/bugs-priority');
const empyolee = require('../models/employee');
const bugModel = require('../models/bug-details');


exports.createBugs = async (req, res, next) => {
	console.log(req);
	const {
		employee_id,
		bug_status,
		project_id,
		bug_type,
		bug_priority,

		bug_title,
		start_date,
		bug_description,
		image
	} = req.body;

	let currentTimeStamp = dateFormat.set_current_timestamp();
	try {
		const logoUrl = constant.URL + '/' + constant.LOGO_MARKER_IMG_URL + '/' + constant.LOGO_IMG_NAME;
		const faceUrl = constant.URL + '/' + constant.LOGO_MARKER_IMG_URL + '/' + constant.Facebook_Img;
		const linkUrl = constant.URL + '/' + constant.LOGO_MARKER_IMG_URL + '/' + constant.LinkedIn_Img;
		const twitterUrl = constant.URL + '/' + constant.LOGO_MARKER_IMG_URL + '/' + constant.Twitter_Img;

		const devloper = await empyolee.find({
			_id: req.body.employee_id
		});
		const projects = await projectModel.findOne();
		const statusofbug = await bugStatus.findOne()
		const typesofbug = await bugType.findOne();
		const priority = await bugPriority.findOne();
		if (devloper) {
			for (let i = 0; i < devloper.length; i++) {
				sendMail(devloper[i].email, 'Bug Assigned to you.',
					bugCreationTemplate({
						logo: logoUrl,
						Facebook: faceUrl,
						LinkedIn: linkUrl,
						Twitter: twitterUrl,
						projectName: projects.project_name,
						status: statusofbug.status,
						bugtype: typesofbug.bug_types,
						priority: priority.priority
					})
				);
			}
		}
		const isbug_title = await bugModel.findOne({
			bug_title
		})

		if (isbug_title) {
			return res.status(400).json({
				message: "Bug title already exist choose another one."
			});
		}

		const url = req.protocol + '://' + req.get("host");

		const bugDetails = new bugModel();
		bugDetails.employee_id = employee_id;
		bugDetails.bug_status = bug_status;
		bugDetails.project_id = project_id;
		bugDetails.bug_type = bug_type;
		bugDetails.bug_priority = bug_priority;
		bugDetails.bug_title = bug_title;
		bugDetails.bug_description = bug_description;
		bugDetails.created_at = currentTimeStamp;
		bugDetails.updated_at = currentTimeStamp;
		bugDetails.actual_updated_at = currentTimeStamp;
		bugDetails.created_by = req.userData.userId;
		bugDetails.image = url + '/images/' + req.file.filename;

		if (start_date) {
			bugDetails.start_date = dateFormat.convertTimestamp(start_date);
		}

		bugDetails.save()
			.then(bugDetails => {
				return res.status(200).json({
					message: "Bug added successfully.",
				})
			})
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "Something went wrong. Please try again later"
		});
	}
}

exports.getBugsList = async (req, res, next) => {
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
				{ 'bug_title': new RegExp(search, 'i') },
				{ 'bug_description': new RegExp(search, 'i') },
			]
		}

		if (req.query.project_id) {
			query.$or = [
				{ 'project_id': mongoose.Types.ObjectId(req.query.project_id) },
			]
		}

		if (req.query.employee_id) {
			query.$or = [
				{ 'employee_id': mongoose.Types.ObjectId(req.query.employee_id) },
			]
		}


		if (req.query.bug_status) {
			query.$or = [
				{ 'bug_status': mongoose.Types.ObjectId(req.query.bug_status) },
			]
		}

		if (req.query.bug_type) {
			query.$or = [
				{ 'bug_type': mongoose.Types.ObjectId(req.query.bug_type) },
			]
		}

		if (req.query.bug_priority) {
			query.$or = [
				{ 'bug_priority': mongoose.Types.ObjectId(req.query.bug_priority) },
			]
		}

		if (req.query.project_id && req.query.employee_id && req.query.bug_status && req.query.bug_type && req.query.bug_priority) {
			query.$and = [
				{ 'project_id': mongoose.Types.ObjectId(req.query.project_id) },
				{ 'employee_id': mongoose.Types.ObjectId(req.query.employee_id) },
				{ 'bug_status': mongoose.Types.ObjectId(req.query.bug_status) },
				{ 'bug_type': mongoose.Types.ObjectId(req.query.bug_type) },
				{ 'bug_priority': mongoose.Types.ObjectId(req.query.bug_priority) },
			]
		}

		const bugsList = await bugModel.find(query)
			.populate({
				path: 'employee_id',
				select: 'first_name',
				model: 'EmployeeTable',
			})
			.populate({
				path: 'project_id',
				select: 'project_name',
				model: 'project_master',
			})
			.populate({
				path: 'bug_status',
				select: 'status',
				model: 'bug_status',
			})
			.populate({
				path: 'bug_type',
				select: 'bug_types',
				model: 'bug_type',
			})
			.populate({
				path: 'bug_priority',
				select: 'priority',
				model: 'bug_priority',
			})
			.skip(pageOptions.page * pageOptions.limit)
			.limit(pageOptions.limit)
			.collation({ locale: "en" })
			.sort(sort);

		if (bugsList.length <= 0) {
			return res.status(200).json({
				message: "Bugs not available.",
				data: {
					totalcount: 0,
					bugsList: []
				}
			});
		}
		const totalcount = await bugModel.countDocuments(query);
		return res.status(200).json({
			message: "Bug list fatch successfully.",
			data: {
				bugsList,
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

//Fetch Bug Details
exports.getBugsDetails = async (req, res, next) => {
	try {
		const bugDetails = await bugModel.findOne({
			_id: req.params.id
		})

		if (!bugDetails) {
			return res.status(404).json({
				message: "Bug details not available.",
				data: {}
			});
		}

		// for (let i = 0; i < bugDetails.employee_id.length; i++) {
		// 	const ele = bugDetails.employee_id[i];
		// 	await empyolee.findOne({ _id: mongoose.Types.ObjectId(ele) })
		// 		.then(emp => {
		// 			bugDetails.employee_id[i] = emp["first_name"];
		// 		})
		// }

		return res.status(200).json({
			message: "Bug detail fetch successfully.",
			bugDetails
		});
	} catch (error) {
		return res.status(400).json({
			message: "Something went wrong. Please try again later.",
			data: {}
		})
	}
}

//Update Bug Details
exports.updateBugDetails = async (req, res, next) => {
	const {
		employee_id,
		bug_status,
		project_id,
		bug_type,
		bug_priority,
		bug_title,
		start_date,
		bug_description,
		image
	} = req.body;

	let currentTimeStamp = dateFormat.set_current_timestamp();
	try {
		const bugDetails = await bugModel.findOne({
			_id: req.params.id
		})

		if (!bugDetails) {
			return res.status(404).json({
				message: "Bug details not available.",
				data: {}
			});
		}
		let image = req.body.image;
		if (req.file) {
			const url = req.protocol + '://' + req.get("host");
			image = url + '/images/' + req.file.filename
		}

		const url = req.protocol + '://' + req.get("host");

		bugDetails.employee_id = JSON.parse(employee_id);
		bugDetails.bug_status = bug_status;
		bugDetails.project_id = project_id;
		bugDetails.bug_type = bug_type;
		bugDetails.bug_priority = bug_priority;
		bugDetails.bug_title = bug_title;
		bugDetails.bug_description = bug_description;
		bugDetails.created_at = currentTimeStamp;
		bugDetails.updated_at = currentTimeStamp;
		bugDetails.actual_updated_at = currentTimeStamp;
		bugDetails.created_by = req.userData.userId;
		bugDetails.image = image;

		if (start_date) {
			bugDetails.start_date = dateFormat.convertTimestamp(start_date);
		}

		bugDetails.save()
			.then(bugDetails => {
				return res.status(200).json({
					message: "Bugs Details updated successfully.",
					data: bugDetails
				})
			})

	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "Something went wrong. Please try again later"
		});
	}
}

//Delete Bug Details
exports.deleteBugDetails = async (req, res, next) => {
	try {
		const bugDetails = await bugModel.findOne({
			_id: req.params.id
		})
		const query = await bugModel.deleteOne(bugDetails);
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
		console.log(error);
		return res.status(400).json({
			message: "Something went wrong. Please try again later.",
			data: {}
		})
	}
}

// Fetch Project 
exports.getProjects = async (req, res, next) => {
	const query = projectModel.find().sort({ project_name: 1 });
	let data;
	query
		.then(status => {

			data = status
			return projectModel.countDocuments();
		})
		.then(count => {
			return res.status(200).json({
				message: "Projects fetched.",
				data: data,
				total: count
			});
		})
		.catch(error => {
			res.status(400).json({
				message: "Something went wrong. Please try again later"
			});
		});
}

// Fetch Bug Status
exports.getBugstatus = async (req, res, next) => {
	const query = bugStatus.find().sort({ status: 1 });
	let data;
	query
		.then(status => {
			data = status
			return bugStatus.countDocuments();
		})
		.then(count => {
			return res.status(200).json({
				message: "Bug status fetched.",
				data: data,
				total: count
			});
		})
		.catch(error => {
			res.status(400).json({
				message: "Something went wrong. Please try again later"
			});
		});
}

// Fetch Bug Type
exports.getBugsType = async (req, res, next) => {
	const query = bugType.find().sort({ bug_types: 1 });
	let data;
	query
		.then(status => {
			data = status
			return bugType.countDocuments();
		})
		.then(count => {
			return res.status(200).json({
				message: "Bug type fetched.",
				data: data,
				total: count
			});
		})
		.catch(error => {
			res.status(400).json({
				message: "Something went wrong. Please try again later"
			});
		});
}

// Fetch Bug Priority
exports.getBugsPriority = async (req, res, next) => {
	const query = bugPriority.find().sort({ priority: 1 });
	let data;
	query
		.then(status => {
			data = status
			return bugPriority.countDocuments();
		})
		.then(count => {
			return res.status(200).json({
				message: "Bugs Priority fetched.",
				data: data,
				total: count
			});
		})
		.catch(error => {
			res.status(400).json({
				message: "Something went wrong. Please try again later"
			});
		});
}