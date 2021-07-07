const express = require("express");

const { body, validationResult } = require('express-validator');

const EmployeeController = require("../controllers/employee");

const checkAuth = require('../middleware/auth-check');

const router = express.Router();

// Get List
router.get("", checkAuth, EmployeeController.getEmployee);
router.get("/getEmployee", checkAuth, EmployeeController.getEmployeeByRoleId);
router.get('/get-status', EmployeeController.getEmpStatus);
router.post('/add-status', EmployeeController.AddEmpStatus);

// Create
router.post("/create",
    // email validation
    body('email').isEmail(),
    // mobile number must be at least 10 chars long
    body('mobile_number').isLength({ min: 10, max: 10 }), EmployeeController.createEmployee);


// GetById
router.get('/:id', checkAuth, EmployeeController.getEmployeeById);

// Update
router.put('/:id', checkAuth, EmployeeController.editEmployee);

// Delete
router.delete('/:id', checkAuth, EmployeeController.deleteEmployee);


module.exports = router;