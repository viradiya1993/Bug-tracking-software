const express = require("express");

const UserController = require("../controllers/users");
const checkAuth = require('../middleware/auth-check');

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginUser);

router.post("/change-password", checkAuth, UserController.changePassword);

module.exports = router;