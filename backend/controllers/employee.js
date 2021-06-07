const EmployeeTable = require('../models/employee.js');
const UserRoles = require('../models/user_roles.js');
const UserDepartment = require('../models/departments.js');
const dateFormat = require('../helper/dateFormate.helper');
const ObjectID = require('mongodb').ObjectID;

const { body, validationResult } = require('express-validator');

exports.getEmployee = (req, res, next) => {
    const sort = {};
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    // const sort = +req.query.sortBy;
    const postQuery = EmployeeTable.find();
    let fetchedPosts;
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        // console.log(sort);
    }
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize)
            .sort(sort);
    }
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return EmployeeTable.count();
        })
        .then(count => {
            res.status(200).json({
                message: "Employees List fetched successfully",
                employeeLists: fetchedPosts,
                count: count
            });
        }).catch(error => {
            res.status(500).json({
                message: "Fetching User Department Failed"
            });
        });
}

exports.createEmployee = (req, res, next) => {
    console.log(req.body);
    // for testing purpose
    // return res.status(500).json({
    //     message: "Testing",
    //     data: req.body
    // });
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
                    UserRoles.findOne({ roleId: req.body.roleId })
                        .then(newRole => {
                            UserDepartment.findOne({ departmentId: req.body.departmentId })
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
                                        created_at: dateFormat.set_current_timestamp(),
                                        updated_at: dateFormat.set_current_timestamp(),
                                        actual_updated_at: dateFormat.set_current_timestamp(),
                                    });
                                    employee.save()
                                        .then(result => {
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

exports.getEmployeeById = (req, res, next) => {
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
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // EmployeeTable.findOne({ _id: ObjectID(req.body.id) })
        //     .then(employee => {
        //         console.log(employee);
        //         let fetchedId = employee._id;
        //         EmployeeTable.findOne({ email: req.body.email })
        //             .then(result => {
        //                 console.log("Value", result._id !== ObjectID(req.body.id), result._id, req.body.id);
        //                 if (result._id !== req.body.id && result) {
        //                     return res.status(400).json({
        //                         message: "This Email is Already Taken.",
        //                         errorType: "Email"
        //                     });
        //                 }
        //                 EmployeeTable.findOne({ mobile_number: req.body.mobile_number })
        //                     .then(user => {
        //                         if (user._id !== fetchedId && user) {
        //                             return res.status(400).json({
        //                                 message: "This Mobile Number is Already Taken.",
        //                                 errorType: "Mobile"
        //                             });
        //                         }
        //                         UserRoles.findOne({ roleId: req.body.roleId })
        //                             .then(newRole => {
        //                                 UserDepartment.findOne({ departmentId: req.body.departmentId })
        //                                     .then(newDepartment => {
        //                                         const employeeNew = {
        //                                             role: newRole.role,
        //                                             roleId: req.body.roleId,
        //                                             first_name: req.body.first_name,
        //                                             middle_name: req.body.middle_name,
        //                                             last_name: req.body.last_name,
        //                                             department: newDepartment.department,
        //                                             departmentId: req.body.departmentId,
        //                                             gender: req.body.gender,
        //                                             mobile_number: req.body.mobile_number,
        //                                             email: req.body.email,
        //                                             created_at: dateFormat.set_current_timestamp(),
        //                                             updated_at: dateFormat.set_current_timestamp(),
        //                                             actual_updated_at: dateFormat.set_current_timestamp(),
        //                                         };
        //                                         // console.log("object===================", req.params.id, employeeNew);
        //                                         EmployeeTable.findOneAndUpdate(
        //                                             { _id: ObjectID(req.params.id) },
        //                                             employeeNew,
        //                                             { new: true }).then(
        //                                                 resultupdate => {
        //                                                     // console.log("resultupdate===============", resultupdate._id, resultupdate);
        //                                                     res.status(200).json({
        //                                                         message: "Updated Successfully",
        //                                                         result: resultupdate
        //                                                     });
        //                                                     // if (result.n > 0) {
        //                                                     // } else {
        //                                                     //     res.status(401).json({
        //                                                     //         message: "Not Authorized to Edit"
        //                                                     //     });
        //                                                     // }
        //                                                 })
        //                                             .catch(errorupdate => {
        //                                                 console.log("errorupdate", errorupdate);
        //                                                 res.status(500).json({
        //                                                     message: "Couldn't Update POst"
        //                                                 });
        //                                             });
        //                                     })
        //                             });
        //                     })
        //             });
        //     })
        EmployeeTable.findOne({
            $and: [{ _id: ObjectID(req.body.id) },
            {
                $or: [{ email: req.body.email }, { mobile_number: req.body.mobile_number }]
            }]
        }).then(
            result => {
                if (result._id !== ObjectID(req.body.id) && result.email === req.body.email) {
                    return res.status(400).json({
                        message: "This Email is Already Taken.",
                        errorType: "Email"
                    });
                } else if (result._id !== ObjectID(req.body.id) && result.mobile_number === req.body.mobile_number) {
                    return res.status(400).json({
                        message: "This Mobile is Already Taken.",
                        errorType: "Mobile"
                    });
                } else {
                    console.log(result);
                    res.status(200).json({
                        message: "Updated Successfully",
                        result: result
                    });
                }
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

    // EmployeeTable.findOne({ _id: req.body.id })
    //     .then(() => {
    //         const employee = new EmployeeTable({
    //             role: req.body.roleId,
    //             roleId: req.body.roleId,
    //             first_name: req.body.first_name,
    //             middle_name: req.body.middle_name,
    //             last_name: req.body.last_name,
    //             department: req.body.departmentId,
    //             departmentId: req.body.departmentId,
    //             gender: req.body.gender,
    //             mobile_number: req.body.mobile_number,
    //             email: req.body.email,
    //             created_at: dateFormat.set_current_timestamp(),
    //             updated_at: dateFormat.set_current_timestamp(),
    //             actual_updated_at: dateFormat.set_current_timestamp(),
    //         });
    //         EmployeeTable.updateOne({ _id: req.params.id }, employee).then(
    //             result => {
    //                 if (result.n > 0) {
    //                     res.status(200).json({
    //                         message: "Post Updated Successfully"
    //                     });
    //                 } else {
    //                     res.status(401).json({
    //                         message: "Not Authorized to Edit"
    //                     });
    //                 }
    //             })
    //             .catch(error => {
    //                 res.status(500).json({
    //                     message: "Couldn't Update POst"
    //                 });
    //             });
    //     })
}

exports.deleteEmployee = (req, res, next) => {
    // console.log(req.params.id);
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