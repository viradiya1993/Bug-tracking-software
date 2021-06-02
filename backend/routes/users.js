const express = require("express");

const UserController = require("../controllers/users");
const checkAuth = require('../middleware/auth-check');

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginUser);

router.post("/forgot-password", UserController.forgotPassword);

router.get('/reset-password/:token*?', UserController.forgotUrl);

router.post('/set-password', UserController.setNewPassword);

router.post("/change-password", checkAuth, UserController.changePassword);


module.exports = router;