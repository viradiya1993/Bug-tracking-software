const dateFormat = require('../helper/dateFormate.helper');
var dir = '../images/';
const constant = require('../config/constant');
const mongoose = require('mongoose');

const empModel = require('../models/employee');
const CommentsModel = require('../models/comments');
const BugDetailmodel = require('../models/bug-details');
const BugStatusModel = require('../models/bugs-status');
const fs = require('fs');


//Create Comment
exports.createComment = async (req, res, next) => {
	const {
		bug_status,
		task_description,
		employee_id
	} = req.body;
	let currentTimeStamp = dateFormat.set_current_timestamp();
	try {
	  empdetails = await empModel.findOne({ email: req.userData.email })
	  bugstatus = await BugStatusModel.findOne({ _id: mongoose.Types.ObjectId(req.body.bug_status) });
		const reqFiles = []
		const url = req.protocol + '://' + req.get("host");
		for (var i = 0; i < req.files.length; i++) {
			reqFiles.push(url + '/images/' + req.files[i].filename)
		}
	// /	console.log(req.files);
	  const files = req.files;
		const commentsDetails = new CommentsModel();
		commentsDetails.bug_status = bug_status;
		commentsDetails.employee_id = employee_id
		commentsDetails.task_description = task_description;
		commentsDetails.bug_title = bugstatus.status;
		commentsDetails.created_at = currentTimeStamp;
		commentsDetails.updated_at = currentTimeStamp;
		commentsDetails.actual_updated_at = currentTimeStamp;
		commentsDetails.created_by = req.userData.userId
		commentsDetails.created_name = empdetails.first_name  +  empdetails.last_name
		commentsDetails.image = reqFiles;
	//	commentsDetails.image = req.files;
		// let imgArray = files.map((file) => {
		// 	let img = fs.readFileSync(file.path)
		// 	return encode_image = img.toString('base64');
		// })
		// imgArray.map((src, index) => {
		// 	let finalImage = {
		// 		filename: files[index].ori
		// 	}
		// })
	
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
		const postQuery = CommentsModel.find().sort({_id: -1})
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




exports.downloadFile = (req, res, next) => {
	console.log(req);
//	const url = req.protocol + '://' + req.get("host");
	let filename = req.params.filename;
	//console.log(filename);
	//res.download(filename);  
}