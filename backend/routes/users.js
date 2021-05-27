const express = require("express");

const UserController = require("../controllers/users");
const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginUser);

router.post("/change-password", UserController.changePassword);

module.exports = router;