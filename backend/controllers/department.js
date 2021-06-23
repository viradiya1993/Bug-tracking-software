
const UserDepartment = require('../models/departments.js');
const dateFormat = require('../helper/dateFormate.helper');
const ObjectID = require('mongodb').ObjectID;
const constant = require('../config/constant');


exports.createDepartment = (req, res, next) => {
    UserDepartment.findOne({ department: new RegExp(req.body.department, 'i') })
        .then(user => {
            // console.log(user);
            if (user) {
                return res.status(401).json({
                    message: "This Department is Already Exist"
                });
            }
            const userType = new UserDepartment({
                department: req.body.department,
                created_at: dateFormat.set_current_timestamp(),
                updated_at: dateFormat.set_current_timestamp(),
                actual_updated_at: dateFormat.set_current_timestamp(),
            });
            userType.save()
                .then(result => {
                    // console.log(result);
                    res.status(200).json({
                        message: 'User Department Created Succesfully',
                        result: result
                    })
                })
                .catch(err => {
                    // console.log(err);
                    res.status(500).json({
                        message: "Invalid Authentication Credential!"
                    })
                })
        });

}

// Update Department
exports.updateDepartment = async (req, res, next) => {
    try {
        const department = await UserDepartment.findOne({
            _id: req.params.id
        });
        if (!department) {
            return res.status(404).json({
                message: "Department details not found.",
                data: {}
            });
        }

        UserDepartment.findOne({ department: new RegExp(req.body.department, 'i') })
            .then(user => {
                // console.log(user);
                if (user && (user._id != req.params.id)) {
                    return res.status(401).json({
                        message: "This Department is Already Exist"
                    });
                }
                const userType = {
                    department: req.body.department,
                    created_at: dateFormat.set_current_timestamp(),
                    updated_at: dateFormat.set_current_timestamp(),
                    actual_updated_at: dateFormat.set_current_timestamp(),
                };
                UserDepartment.findOneAndUpdate({ _id: ObjectID(req.params.id) },
                    userType,
                    { new: true })
                    .then(result => {
                        // console.log(result);
                        res.status(200).json({
                            message: 'User Department Updated Succesfully',
                            result: result
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            message: "Invalid Authentication Credential!"
                        })
                    })
            });
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong. Please try again later.",
            data: {}
        })
    }
}

exports.getDepartment = (req, res, next) => {
    const sort = {};
    let query = {};
    const search = req.query.q ? req.query.q : ''; // for searching
    const pageOptions = {
        page: parseInt(req.query.skip) || constant.PAGE,
        limit: parseInt(req.query.limit) || constant.LIMIT
    }

    if (search) {
        query.$or = [
            { 'department': new RegExp(search, 'i') },
        ]
    }
    const postQuery = UserDepartment.find(query);
    let fetchedPosts;
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    if (pageOptions) {
        postQuery
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .collation({ locale: "en" })
            .sort(sort);
    }
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return UserDepartment.countDocuments(query);
        })
        .then(count => {
            res.status(200).json({
                message: "User Department fetched successfully",
                userDepartment: fetchedPosts,
                userDepartment_Count: count
            });
        }).catch(error => {
            res.status(500).json({
                message: "Fetching User Department Failed"
            });
        });
}

// Fetch department details
exports.getDepartmentByID = async (req, res, next) => {
    // console.log(req.body);
    try {
        const department = await UserDepartment.findOne({
            _id: req.params.id
        });

        if (!department) {
            return res.status(404).json({
                message: "Department details not available.",
                data: {}
            });
        }
        return res.status(200).json({
            message: "Department detail fetch successfully.",
            data: {
                department
            }
        });
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong. Please try again later.",
            data: {}
        })
    }
}

// Delete Department
exports.deleteDepartment = async (req, res, next) => {
    try {
        const department = await UserDepartment.findOne({
            _id: req.params.id
        });
        const query = await UserDepartment.deleteOne(department);
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