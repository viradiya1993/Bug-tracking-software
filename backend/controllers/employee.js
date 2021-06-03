const EmployeeTable = require('../models/employee.js');
const UserRoles = require('../models/user_roles.js');
const UserDepartment = require('../models/departments.js');

const { body, validationResult } = require('express-validator');

exports.getEmployee = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = EmployeeTable.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize)
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
                                        email: req.body.email
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