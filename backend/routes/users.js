const express = require("express");

const UserController = require("../controllers/users");
const UserTypeController = require("../controllers/user_type");
const UserRoleController = require("../controllers/user_roles");
const UserDepartmentController = require("../controllers/department");

const checkAuth = require('../middleware/auth-check');

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginUser);

router.post("/forgot-password", UserController.forgotPassword);

router.get('/reset-password/:token*?', UserController.forgotUrl);

router.post('/set-password', UserController.setNewPassword);

router.post("/change-password", checkAuth, UserController.changePassword);

router.post("/add-role", UserRoleController.createUserRole);

router.get("/getRole", UserRoleController.getRole);

router.post("/create-designation", UserTypeController.createUserType);

router.get("/getUserTypeList", UserTypeController.getUserType);

router.post("/create-department", UserDepartmentController.createDepartment);

router.get("/getDepartmentList", UserDepartmentController.getDepartment);

module.exports = router;