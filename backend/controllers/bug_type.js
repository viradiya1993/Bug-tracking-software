const dateFormat = require('../helper/dateFormate.helper');
const constant = require('../config/constant');
const BugTypeModel = require('../models/bugtype');


//Create BugType
exports.createBugType = async (req, res, next) => {
	const { bug_types } = req.body;
	try {
		const isExists = await BugTypeModel.findOne({
			bug_types
		})
		if (isExists) {
			return res.status(400).send({
					message: 'Bug Type already exist choose another one',
					error: true,
					data: {}
			});
		}
		bugType = await BugTypeModel()
		bugType.bug_types = bug_types;
		bugType.created_at = await dateFormat.set_current_timestamp();
		bugType.updated_at = await dateFormat.set_current_timestamp();
		bugType.actual_updated_at = await dateFormat.set_current_timestamp();
		bugType.save()
		.then(bugType => {
			return res.status(200).json({
					message: "Bug Type Added."
			});
		})
	} catch (error) {
		console.log(error)
		res.status(400).json({
				message: "Something went wrong. Please try again later"
		});
	}
}

//get Bugtype List
exports.getBugtypeList = async (req, res, next) => {
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
            { 'bug_types': new RegExp(search, 'i') },
        ]
    }
    bugType = await BugTypeModel.find(query)
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .collation({ locale: "en" })
    .sort(sort);
    if (bugType.length <= 0) {
        return res.status(200).json({
            message: "BugType not available.",
            data: {
                totalcount: 0,
                bugType: []
            }
        });
    }
		const totalcount = await BugTypeModel.countDocuments(query);
		return res.status(200).json({
				message: "Bug Type list fatch successfully.",
				data: {
						bugType,
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

//Get BugType Details
exports.getBugTypeDetails = async (req, res, next) => {
	try {
		const bugType = await BugTypeModel.findOne({
			_id: req.params.id
		}); 
		if (!bugType) {
			return res.status(404).json({
					message: "Bug Type details not available.",
					data: {}
			});
		}
	return res.status(200).json({
			message: "Bug Type detail fetch successfully.",
			bugType
	});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "Something went wrong. Please try again later.",
			data: {}
		})
	}
}

//Update Bug Type
exports.updateBugType = async (req, res, next) => {
	const { bug_types } = req.body;
	try {
		const bugType = await  BugTypeModel.findOne({
			_id: req.params.id
		});
		if (!bugType) {
			return res.status(404).json({
					message: "Bug Type details not available.",
					data: {}
			});
		}
		BugTypeModel.findOne({bug_types: req.body.bug_types})
		.then(bugType => {
				if (bugType && (bugType._id != req.params.id)) {
						return res.status(400).send({
								message: "Bug Type already exist choose another one",
								data: {}
						});
				}
				bugType.bug_types = bug_types;
				bugType.updated_at = dateFormat.set_current_timestamp();
				bugType.actual_updated_at =  dateFormat.set_current_timestamp();
				bugType.save()
				.then(bugType => {
						return res.status(200).json({
								message: "BugType updated.",
								data: bugType
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

// Delete Bug type details
exports.deleteBugType = async (req, res, next) => {
	try {
			const bugType = await BugTypeModel.findOne({
					_id: req.params.id
			}); 
			const query = await BugTypeModel.deleteOne(bugType);
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