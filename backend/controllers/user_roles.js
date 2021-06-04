const UserRoles = require('../models/user_roles.js');


exports.createUserRole = (req, res, next) => {
    console.log(req.body);
    UserRoles.findOne({ id: req.body.roleId })
        .then(result => {
            if (result) {
                return res.status(401).json({
                    message: "This User Role is Already Exist"
                });
            }
            UserRoles.findOne({ role: req.body.role })
                .then(user => {
                    if (user) {
                        return res.status(401).json({
                            message: "This User Role is Already Exist"
                        });
                    }
                    const newRole = new UserRoles({
                        role: req.body.role,
                        roleId: req.body.roleId
                    });
                    newRole.save()
                        .then(result => {
                            res.status(200).json({
                                message: 'User Roles Created Succesfully',
                                result: result
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: "Invalid Authentication Credential!"
                            })
                        })
                });
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