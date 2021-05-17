const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/users.js');

exports.createUser = (req, res, next) => {
    console.log(req.body);
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
    console.log(req.body);
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
            // console.log(result);
            if (!result) {
                return res.status(401).json({
                    message: "Auth Failed"
                });
            }
            // console.log(user.email);
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
                userId: fetchedUser._id
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid Authentication Credential!"
            });
        });
}