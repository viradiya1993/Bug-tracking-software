const UserRoles = require('../models/user_roles.js');
const dateFormat = require('../helper/dateFormate.helper');


exports.createUserRole = (req, res, next) => {
    console.log(req.body);
    UserRoles.findOne({ role: req.body.role })
        .then(result => {
            console.log(result);
            if (result) {
                return res.status(401).json({
                    message: "This User Role is Already Exist"
                });
            }

            const newRole = new UserRoles({
                role: req.body.role,
                created_at: dateFormat.set_current_timestamp(),
                updated_at: dateFormat.set_current_timestamp(),
                actual_updated_at: dateFormat.set_current_timestamp(),
            });
            newRole.save()
                .then(result => {
                    res.status(200).json({
                        message: 'User Roles Created Succesfully',
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

}

exports.getRole = (req, res, next) => {

    // const pageSize = +req.query.pageSize;
    // const currentPage = +req.query.page;
    const postQuery = UserRoles.find();
    let fetchedPosts;
    // if (pageSize && currentPage) {
    //     postQuery
    //         .skip(pageSize * (currentPage - 1))
    //         .limit(pageSize)
    // }
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return UserRoles.count();
        })
        .then(count => {
            res.status(200).json({
                message: "User Roles fetched successfully",
                userRoles: fetchedPosts,
                userRoles_Count: count
            });
        }).catch(error => {
            res.status(500).json({
                message: "Fetching User Roles Failed"
            });
        });
}