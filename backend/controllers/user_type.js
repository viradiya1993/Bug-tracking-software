
const UserType = require('../models/user_type.js');


exports.createUserType = (req, res, next) => {
    UserType.findOne({ designation: req.body.designation })
        .then(user => {
            if (user) {
                return res.status(401).json({
                    message: "This User is Already Exist"
                });
            }
            const userType = new UserType({
                designation: req.body.designation
            });
            userType.save()
                .then(result => {
                    res.status(200).json({
                        message: 'User Designation Created Succesfully',
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

exports.getUserType = (req, res, next) => {

    // const pageSize = +req.query.pageSize;
    // const currentPage = +req.query.page;
    const postQuery = UserType.find();
    let fetchedPosts;
    // if (pageSize && currentPage) {
    //     postQuery
    //         .skip(pageSize * (currentPage - 1))
    //         .limit(pageSize)
    // }
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return UserType.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: "User Type fetched successfully",
                userTypes: fetchedPosts,
                UserTypes_Count: count
            });
        }).catch(error => {
            res.status(500).json({
                message: "Fetching User Type Failed"
            });
        });
}