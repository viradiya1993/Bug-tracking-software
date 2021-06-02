const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/users.js');
const moment = require('moment');

exports.createUser = (req, res, next) => {
    // console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(200).json({
                        message: 'User Created Succesfully',
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

exports.loginUser = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth Failed"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth Failed"
                });
            }
            const token = jwt.sign(
                {
                    email: fetchedUser.email,
                    userId: fetchedUser._id,
                },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id,
                message: "Login Successfully"
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid Authentication Credential!"
            });
        });
}

exports.changePassword = async (req, res, next) => {
    let fetchedUser;
    let reqdata = req.body;
    let currentDate = moment();
    // console.log(currentDate);
    // return;
    User.findOne({ _id: req.userData.userId })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "User details not available at this time."
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.old_password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Please enter valid Old password."
                });
            }
            bcrypt.hash(reqdata.new_password, 10)
                .then(hash => {
                    fetchedUser.password = hash;
                    fetchedUser.updated_at = currentDate;
                })
            user = fetchedUser;

            // fetchedUser.actual_updated_at = await dateFormat.set_current_timestamp();
            user.save()
                .then(result => {
                    res.status(200).json({
                        message: 'Your password successfully changed',
                        error: false
                    })
                })
                .catch(err => {
                    return res.status(401).json({
                        message: "Something went wrong. Please try again later"
                    });
                });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Something went wrong. Please try again later"
            });
        });
    // let reqdata = req.body;
    // let user = await User.findOne({ _id: req.userData.userId });
    // if (!user) {
    //     return res.status(401).json({
    //         message: 'User details not available at this time.',
    //         error: true
    //     });
    // }
    // console.log(bcrypt.compare(req.body.old_password, user.password));
    // if (!bcrypt.compare(req.body.old_password, user.password)) {
    //     return res.status(400).json({
    //         message: 'Please enter valid Old password.',
    //         error: true
    //     });
    // }

    // if (reqdata.new_password.length < 6) {
    //     return res.status(400).json({
    //         message: 'Your password must contain at least 6 characters.',
    //         error: true
    //     });
    // }
    // if (bcrypt.compare(req.body.old_password, user.password)) {
    //     bcrypt.hash(reqdata.new_password, 10)
    //         .then(hash => {
    //             user.password = hash;
    //         })
    //     // user.updated_at = await dateFormat.set_current_timestamp();
    //     // user.actual_updated_at = await dateFormat.set_current_timestamp();
    //     await user.save();

    //     res.status(200).json({
    //         message: 'Your password successfully changed',
    //         error: false,
    //         data: {},
    //     }).catch(error => {
    //         res.status(401).send({
    //             message: 'Something went wrong. Please try again later',
    //             error: true,
    //             data: {},
    //         });
    //     });
    // }

}