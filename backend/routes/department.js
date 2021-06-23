const express = require("express");

const UserDepartmentController = require("../controllers/department");

const checkAuth = require('../middleware/auth-check');

const router = express.Router();

router.post("/create-department", checkAuth, UserDepartmentController.createDepartment);

router.get("/getDepartmentList", checkAuth, UserDepartmentController.getDepartment);

router.get("/getDepartmentByID/:id", checkAuth, UserDepartmentController.getDepartmentByID);

router.delete("/delete-department/:id", checkAuth, UserDepartmentController.deleteDepartment);

router.put('/update-department/:id', checkAuth, UserDepartmentController.updateDepartment);


module.exports = router;