const EmployeeTable = require('../models/employee.js');
const UserRoles = require('../models/user_roles.js');
const empStatusModel = require('../models/emp-status');
const UserDepartment = require('../models/departments.js');
const dateFormat = require('../helper/dateFormate.helper');
const ObjectID = require('mongodb').ObjectID;
const constant = require('../config/constant');

const users = require('./users');
const { body, validationResult } = require('express-validator');

exports.getEmployee = (req, res, next) => {
	const sort = {};

	const pageSize = +req.query.pageSize;
	const currentPage = +req.query.page;

	const first_name = req.query.first_name != null ? req.query.first_name : ''
	const middle_name = req.query.middle_name != null ? req.query.middle_name : ''
	const last_name = req.query.last_name != null ? req.query.last_name : ''
	const email = req.query.email != null ? req.query.email : ''
	const mobile_number = req.query.mobile_number != null ? req.query.mobile_number : ''
	const gender = req.query.gender != null ? req.query.gender : ''
	const roleId = req.query.roleId != null ? req.query.roleId : ''
	const departmentId = req.query.departmentId != null ? req.query.departmentId : ''
	const status = req.query.status != null ? req.query.status : ''


	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':');
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
		console.log(sort);
	}
	const pageOptions = {
		page: parseInt(currentPage) || constant.PAGE,
		limit: parseInt(pageSize) || constant.LIMIT
	}
	let query = {};
	if (first_name) {
		query.$and = [
			{ 'first_name': new RegExp(first_name, 'i') },
		]
	}
	if (middle_name) {
		query.$and = [
			{ 'middle_name': new RegExp(middle_name, 'i') },
		]
	}
	if (last_name) {
		query.$and = [
			{ 'last_name': new RegExp(last_name, 'i') },
		]
	}
	if (email) {
		query.$and = [
			{ 'email': new RegExp(email, 'i') },
		]
	}
	if (mobile_number) {
		query.$and = [
			{ 'mobile_number': mobile_number },
		]
	}
	if (gender) {
		query.$and = [
			{ 'gender': ObjectID(gender) },
		]
	}
	if (roleId) {
		query.$and = [
			{ 'roleId': ObjectID(roleId) },
		]
	}
	if (departmentId) {
		query.$and = [
			{ 'departmentId': ObjectID(departmentId) },
		]
	}
	if (status) {
		query.$and = [
			{ 'status': ObjectID(status) },
		]
	}
	const postQuery = EmployeeTable.find(query)
		.populate({
			path: 'departmentId',
			select: 'department',
			model: 'UserDepartment',
		})
		.populate({
			path: 'roleId',
			select: 'role',
			model: 'UserRoles',
		})
		.populate({
			path: 'gender',
			select: 'value',
			model: 'GenderTable',
		})
		.populate({
			path: 'status',
			select: 'status',
			model: 'employee_Status',
		})
	// console.log(postQuery);
	let fetchedPosts;
	// currentPage ? currentPage : currentPage = 1;
	postQuery
		.skip(pageOptions.page * pageOptions.limit)
		.limit(pageOptions.limit)
		.sort(sort);

	postQuery
		.then(documents => {
			// console.log(documents);
			fetchedPosts = documents;
			return postQuery.countDocuments();
		})
		.then(count => {
			res.status(200).json({
				message: "Employees List fetched successfully",
				employeeLists: fetchedPosts,
				count: count
			});
		}).catch(error => {
			console.log(error);
			res.status(500).json({
				message: "Fetching Employees List Failed"
			});
		});
}

exports.createEmployee = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	EmployeeTable.findOne({ email: req.body.email })
		.then(result => {
			if (result) {
				return res.status(400).json({
					message: "This Email is Already Taken.",
					errorType: "Email"
				});
			}
			EmployeeTable.findOne({ mobile_number: req.body.mobile_number })
				.then(user => {
					if (user) {
						return res.status(400).json({
							message: "This Mobile Number is Already Taken.",
							errorType: "Mobile"
						});
					}
					UserRoles.findOne({ _id: req.body.roleId })
						.then(newRole => {
							UserDepartment.findOne({ _id: req.body.departmentId })
								.then(newDepartment => {
									const employee = new EmployeeTable({
										role: newRole.role,
										roleId: req.body.roleId,
										first_name: req.body.first_name,
										middle_name: req.body.middle_name,
										last_name: req.body.last_name,
										department: newDepartment.department,
										departmentId: req.body.departmentId,
										gender: req.body.gender,
										mobile_number: req.body.mobile_number,
										email: req.body.email,
										status: req.body.status,
										created_at: dateFormat.set_current_timestamp(),
										updated_at: dateFormat.set_current_timestamp(),
										actual_updated_at: dateFormat.set_current_timestamp(),
									});
									employee.save()
										.then(result => {
											let body = {
												first_name: req.body.first_name,
												email: req.body.email,
												roleId: ObjectID(req.body.roleId)
											}
											users.createDefaultUser(body);
											res.status(200).json({
												message: 'Employee Created Succesfully',
												result: result
											})
										})
										.catch(err => {
											res.status(500).json({
												message: "Invalid Authentication Credential!",
												err: err
											})
										})
								})
						});
				})
		});

}

exports.getEmployeeById = async (req, res, next) => {
	EmployeeTable.findById(req.params.id).then((data) => {
		if (data) {
			res.status(200).json(data);
		} else {
			res.status(404).json('Can not find Employee')
		}
	}).catch(error => {
		res.status(500).json({
			message: "Fetching Employee Failed"
		});
	});

}

exports.editEmployee = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		EmployeeTable.findOne({
			$and: [{ _id: ObjectID(req.body.id) }]
		}).then(
			result => {
				let fetchedData = {};
				fetchedData = result;
				// console.log("fetchedData", fetchedData);
				EmployeeTable.findOne({
					$and: [
						{ email: req.body.email }
					]
				}).then(
					result => {
						let fetchedEmailData = {};
						fetchedEmailData = result;
						// console.log("fetchedEmailData", fetchedEmailData);
						EmployeeTable.findOne({
							$and: [
								{ mobile_number: req.body.mobile_number }
							]
						}).then(result => {
							// console.log(result);
							let fetchedMobileData = {};
							fetchedMobileData = result;
							// console.log("fetchedMobileData", fetchedMobileData);

							if (fetchedEmailData && fetchedEmailData._id != req.body.id && fetchedEmailData.email === req.body.email) {
								return res.status(400).json({
									message: "This Email is Already Taken.",
									errorType: "Email"
								});
							} else if (fetchedMobileData && fetchedMobileData._id != req.body.id && fetchedMobileData.mobile_number === req.body.mobile_number) {
								return res.status(400).json({
									message: "This Mobile is Already Taken.",
									errorType: "Mobile"
								});
							} else {
								// console.log("else", result);
								UserRoles.findOne({ _id: ObjectID(req.body.roleId) })
									.then(newRole => {
										UserDepartment.findOne({ _id: ObjectID(req.body.departmentId) })
											.then(newDepartment => {
												const employeeNew = {
													role: newRole.role,
													roleId: req.body.roleId,
													first_name: req.body.first_name,
													middle_name: req.body.middle_name,
													last_name: req.body.last_name,
													department: newDepartment.department,
													departmentId: req.body.departmentId,
													gender: req.body.gender,
													mobile_number: req.body.mobile_number,
													email: req.body.email,
													status: req.body.status,
													created_at: dateFormat.set_current_timestamp(),
													updated_at: dateFormat.set_current_timestamp(),
													actual_updated_at: dateFormat.set_current_timestamp(),
												};
												let body = {
													first_name: req.body.first_name,
													email: req.body.email,
													roleId: ObjectID(req.body.roleId)
												}
												users.updateDefaultUser(body);
												EmployeeTable.updateOne(
													{ _id: ObjectID(req.body.id) },
													employeeNew,
													{ new: true })
													.then(

														result => {
															if (result.n > 0) {
																res.status(200).json({
																	message: "Employee Updated Successfully",
																	result: employeeNew,
																	error: false
																});
															} else {
																res.status(400).json({
																	message: "Employee Updated UnSuccessfully",
																	error: true
																});
															}
														})
											});
									});
							}
						})
					}
				)
			}
		).catch(
			err => {
				res.status(400).json({
					err: err
				})
			}
		)
	} catch (e) {
		res.status(500).json({
			message: e
		});
	}
}

exports.deleteEmployee = (req, res, next) => {
	EmployeeTable.deleteOne({ _id: req.params.id }).then((result) => {
		if (result.n > 0) {
			res.status(200).json({
				message: "Employee Data Deleted Successfully"
			});
		} else {
			res.status(401).json({
				message: "Not Authorized to delete"
			});
		}
	})
		.catch(error => {
			res.status(500).json({
				message: "Deleting Data Failed"
			});
		});
}

exports.AddEmpStatus = async (req, res, next) => {
	const { status } = req.body;
	try {
		const empStatus = new empStatusModel();
		empStatus.status = status;
		empStatus.created_at = await dateFormat.set_current_timestamp();
		empStatus.updated_at = await dateFormat.set_current_timestamp();
		empStatus.actual_updated_at = await dateFormat.set_current_timestamp();
		empStatus.save()
			.then(empStatus => {
				return res.status(200).json({
					message: "Status Added."
				});
			})
	} catch (error) {
		res.status(400).json({
			message: "Something went wrong. Please try again later"
		});
	}
}

exports.getEmpStatus = async (req, res, next) => {
	try {
		const postQuery = empStatusModel.find();
		let fetchedPosts;
		postQuery
			.then(documents => {
				fetchedPosts = documents;
				return empStatusModel.countDocuments();
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
	} catch (error) {
		return res.status(400).json({
			message: "Something went wrong. Please try again later.",
			data: {}
		})
	}
}

