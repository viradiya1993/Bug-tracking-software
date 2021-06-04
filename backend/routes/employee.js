const express = require("express");

const { body, validationResult } = require('express-validator');

const EmployeeController = require("../controllers/employee");

const checkAuth = require('../middleware/auth-check');

const router = express.Router();

router.get("", checkAuth, EmployeeController.getEmployee);

router.post("/create", checkAuth,
    // email validation
    body('email').isEmail(),
    // mobile number must be at least 10 chars long
    body('mobile_number').isLength({ min: 10, max: 10 }), EmployeeController.createEmployee);

router.get('/:id', checkAuth, EmployeeController.getEmployeeById);

router.put("/:id", checkAuth, EmployeeController.editEmployee);
module.exports = router;