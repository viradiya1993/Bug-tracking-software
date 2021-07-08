const dateFormat = require('../helper/dateFormate.helper');
const constant = require('../config/constant');
const BugStatusModel = require('../models/bugs-status');

// Create Bug Status
exports.createBugStatus = async (req, res, next) => {
	const { status, color } = req.body;
	try {
		const isExists = await BugStatusModel.findOne({
			status
		})
		if (isExists) {
			return res.status(400).send({
					message: 'Bug Status already exist choose another one',
					error: true,
					data: {}
			});
		}
		bugStatus = await BugStatusModel()
		bugStatus.status = status;
		bugStatus.color = color;
		bugStatus.created_at = await dateFormat.set_current_timestamp();
		bugStatus.updated_at = await dateFormat.set_current_timestamp();
		bugStatus.actual_updated_at = await dateFormat.set_current_timestamp();
		bugStatus.save()
		.then(bugStatus => {
			return res.status(200).json({
					message: "Bug Status Added."
			});
		})
	} catch (error) {
		console.log(error)
		res.status(400).json({
				message: "Something went wrong. Please try again later"
		});
	}
}

//Fetch All Status
exports.getBugStatusList = async (req, res, next) => {
	try {
		const sort = {};
    let query = {};
    const search = req.query.q ? req.query.q : ''; // for searching
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
		const pageOptions = {
			page: parseInt(req.query.skip) || constant.PAGE,
			limit: parseInt(req.query.limit) || constant.LIMIT
		}
		if (search) {
				query.$or = [
						{ 'status': new RegExp(search, 'i') },
				]
		}
		 bugStatus = await BugStatusModel.find(query)
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .collation({ locale: "en" })
    .sort(sort);
    if (bugStatus.length <= 0) {
        return res.status(200).json({
            message: "Bug Status not available.",
            data: {
                totalcount: 0,
                bugStatus: []
            }
        });
    }
		const totalcount = await BugStatusModel.countDocuments(query);
		return res.status(200).json({
				message: "Bug Type list fatch successfully.",
				data: {
						bugStatus,
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

//Get Bug Status Details
exports.getBugStatusDetails = async (req, res, next) => {
	try {
		const bugStatus = await BugStatusModel.findOne({
			_id: req.params.id
		}); 
		if (!bugStatus) {
			return res.status(404).json({
					message: "Bug Status details not available.",
					data: {}
			});
		}
		return res.status(200).json({
			message: "Bug Status detail fetch successfully.",
			bugStatus
	});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "Something went wrong. Please try again later.",
			data: {}
		})
	}
}

//Update Bug Status
exports.updateBugStatus = async (req, res, next) => {
	const { status, color } = req.body;
	try {
		const bugStatus = await  BugStatusModel.findOne({
			_id: req.params.id
		});
		console.log(bugStatus);
		if (!bugStatus) {
			return res.status(404).json({
					message: "Bug Status details not available.",
					data: {}
			});
		}
		BugStatusModel.findOne({status: req.body.status})
		.then(bugstatus => {
				if (bugstatus && (bugstatus._id != req.params.id)) {
						return res.status(400).send({
								message: "Bug status already exist choose another one",
								data: {}
						});
				}
				bugstatus.status = status;
			  bugstatus.color = color;
				bugstatus.updated_at = dateFormat.set_current_timestamp();
				bugstatus.actual_updated_at =  dateFormat.set_current_timestamp();
				bugstatus.save()
				.then(bugstatus => {
						return res.status(200).json({
								message: "Bug status updated.",
								data: bugstatus
						});
				})
				.catch(err => {
						res.status(500).json({
								message: "Invalid Authentication Credential!"
						})
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
// Delete Bug status details
exports.deleteStatus = async (req, res, next) => {
	try {
		const bugStatus = await BugStatusModel.findOne({
			_id: req.params.id
		}); 
		const query = await BugStatusModel.deleteOne(bugStatus);
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