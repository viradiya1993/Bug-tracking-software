const dateFormat = require('../helper/dateFormate.helper');
const constant = require('../config/constant');
const extractFile = require('../middleware/uploadTaskPic')
const mongoose = require('mongoose');

const empModel = require('../models/employee');
const CommentsModel = require('../models/comments');


//Create Comment
exports.createComment = async (req, res, next) => {
	const {
		bug_status,
		task_description,
		bug_details
	} = req.body;
	let currentTimeStamp = dateFormat.set_current_timestamp();
	try {
		empdetails = await empModel.findOne({ email: req.userData.email })
		const url = req.protocol + '://' + req.get("host");
		const commentsDetails = new CommentsModel();
		commentsDetails.bug_status = bug_status;
		commentsDetails.task_description = task_description;
		commentsDetails.bug_details = bug_details;
		commentsDetails.created_at = currentTimeStamp;
		commentsDetails.updated_at = currentTimeStamp;
		commentsDetails.actual_updated_at = currentTimeStamp;
		commentsDetails.created_by = req.userData.userId
		commentsDetails.created_name = empdetails.first_name  +  empdetails.last_name
		commentsDetails.image = url + '/images/' + req.file.filename;
		commentsDetails.save()
			.then(commentsDetails => {
				return res.status(200).json({
					message: "Comments added successfully.",
					commentsDetails
				})
			})
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "Something went wrong. Please try again later.",
			data: {}
		})
	}
}

//Get Commet
exports.getCommets = async (req, res, next) => {
	try {
		const postQuery = CommentsModel.find()
		let fetched;
		postQuery
			.then(documents => {
				fetched = documents;
				return CommentsModel.countDocuments();
			})
			.then(count => {
				res.status(200).json({
					message: "Comment fetched successfully",
					data: fetched,
					totalcount: count
				});
			}).catch(error => {
				res.status(500).json({
					err: error,
					message: "Fetching Comments Failed"
				});
			});
	} catch (error) {
		return res.status(400).json({
			message: "Something went wrong. Please try again later.",
			data: {}
		})
	}
}







exports.uploadFile = async (req, res, next) => {
	//console.log('amit');
	const file = req.file;
	if (file) {
		return res.json(file)
	} else {
		throw new Error('File upload unsuccessfull')
	}
}



exports.abcdFiles = async (req, res, next) => {
	console.log('amit');
	const files = req.files;
	console.log(files);
	if (Array.isArray(files) && files.length > 0) {
		return res.json(files)
	} else {
		throw new Error('File upload unsuccessfull')
	}
}

//http://localhost:3000/api/taks/file