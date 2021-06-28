const dateFormat = require('../helper/dateFormate.helper');
const constant = require('../config/constant');
const projectModel = require('../models/projects');
const bugStatus = require('../models/bugs-status');
const bugType = require('../models/bugtype');
const bugPriority = require('../models/bugs-priority');
const bugModel = require('../models/bug-details');

const mongoose = require('mongoose');

exports.createBugs = async (req, res, next) => {
	const {
			employee_id,
			bug_status,
			project_id,
			bug_type,
			bug_priority,
			bug_title,
			start_date,
			bug_description
	} = req.body;

	let currentTimeStamp = dateFormat.set_current_timestamp();
	try {
		const isbug_title = await bugModel.findOne({
			bug_title
		})

		if (isbug_title) {
			return res.status(400).json({
				message: "Bug title already exist choose another one."
			});
		}
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
		bugDetails.created_by = req.userData.userId

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
		  //project_id: '60d463a36ff27053d8cdc8cf'
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
		  console.log(error);
			return res.status(400).json({
				message: "Something went wrong. Please try again later.",
				data: {}
			})
	 }
}

// Fetch Project 
exports.getProjects = async (req, res, next) => {
	const query = projectModel.find();
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
	const query = bugStatus.find();
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
	const query = bugType.find();
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
	const query = bugPriority.find();
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