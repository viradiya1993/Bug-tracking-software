const express = require("express");

const UserController = require("../controllers/users");
const UserTypeController = require("../controllers/user_type");
const UserRoleController = require("../controllers/user_roles");

const checkAuth = require('../middleware/auth-check');

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginUser);

router.post("/forgot-password", UserController.forgotPassword);

router.get('/reset-password/:token*?', UserController.forgotUrl);

router.post('/set-password', UserController.setNewPassword);

router.post("/change-password", checkAuth, UserController.changePassword);

router.post("/add-role", checkAuth, UserRoleController.createUserRole);

router.get("/getRole", checkAuth, UserRoleController.getRole);

router.post("/create-designation", checkAuth, UserTypeController.createUserType);

router.get("/getUserTypeList", checkAuth, UserTypeController.getUserType);

router.post('/gender/add', checkAuth, UserController.addGender);

router.get('/gender', checkAuth, UserController.getGender);

module.exports = router;