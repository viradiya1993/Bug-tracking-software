const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/users.js');
const moment = require('moment');
const dateFormat = require('../helper/dateFormate.helper');
const constant = require('../config/constant');
const forgotPasswordTemplate = require('../services/emailTemplate/forgotPasswordTemplate');
const sendMail = require('../services/email.service');


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
                    res.status(401).json({
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
}

exports.forgotPassword = async (req, res, next) => {
    let email = req.body.email;
    try {
        User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "User not found!"
                });
            }
            const logoUrl = 'http://localhost:3000/api' + '/' + constant.LOGO_MARKER_IMG_URL + '/' + constant.LOGO_IMG_NAME;
            user_id = user._id
            const token = jwt.sign({ user_id },  process.env.JWT_KEY )
            user.reset_password_token = token;
            user.reset_password_expires = dateFormat.addExpireTime();
            const mailUrl = process.env.ANGULAR_BASE_URL;
            sendMail(email, 'Password Reset', forgotPasswordTemplate({ url: mailUrl + '/' + token, logo: logoUrl}));
            user.save()
            .then(result => {
               return res.status(200).json({
                    message: 'Email send successully please check your email.',
                    error: false
                });
            });
            
        })
    } catch (error) {
        res.status(401).send({
            message: "Error while sending link"
        });
    }
}

exports.forgotUrl = async (req, res, next) => {
    try {
        if (!req.params.token) {
            return res.status(401).json({
                message: "Something went wrong. Please try again later"
            });
        }
        reset_password_token = req.params.token;
        let currentTime = dateFormat.set_current_timestamp();
        User.findOne({ reset_password_token, reset_password_expires: { $gte: currentTime } })

        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Token expired."
                });
            }
        })
        .then(result => {
           return res.status(200).json({
                message: 'Token varified',
                error: false
            })
        });

    } catch (error) {
        return res.status(401).json({
            message: "Something went wrong. Please try again later"
        });
    }
}

exports.setNewPassword = async (req, res, next) => {
    try {
        const {new_password, reset_password_token} = req.body;
        const currentDate = dateFormat.set_current_timestamp();

        User.findOne({reset_password_token, reset_password_expires: {$gte: currentDate}})
        .then(user => {
            if(!user) {
                return res.status(401).json({
                    message: "Your link has been expired."
                });
            }

            if (new_password.length < 6) {
                return res.status(401).json({
                    message: "Your password must contain at least 6 characters."
                });
            }
            user.password = new_password;
            user.reset_password_token = null;
            user.reset_password_expires = null;
            user.updated_at = dateFormat.set_current_timestamp();
            user.actual_updated_at = dateFormat.set_current_timestamp();
            user.save()
            .then(result => {
                return res.status(200).json({
                    message: "Your password has been reset successfully."
                });
            });
        });
    } catch (error) {
        return res.status(401).json({
            message: "Something went wrong. Please try again later"
        });
    }
}