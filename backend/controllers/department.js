
const UserDepartment = require('../models/departments.js');


exports.createDepartment = (req, res, next) => {
    // console.log(req.body);
    UserDepartment.findOne({ department: req.body.department })
        .then(user => {
            if (user) {
                return res.status(401).json({
                    message: "This Department is Already Exist"
                });
            }
            const userType = new UserDepartment({
                department: req.body.department,
                departmentId: req.body.departmentId
            });
            userType.save()
                .then(result => {
                    res.status(200).json({
                        message: 'User Department Created Succesfully',
                        result: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Invalid Authentication Credential!"
                    })
                })
        });
}

exports.getDepartment = (req, res, next) => {

    // const pageSize = +req.query.pageSize;
    // const currentPage = +req.query.page;
    const postQuery = UserDepartment.find();
    let fetchedPosts;
    // if (pageSize && currentPage) {
    //     postQuery
    //         .skip(pageSize * (currentPage - 1))
    //         .limit(pageSize)
    // }
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return UserDepartment.count();
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