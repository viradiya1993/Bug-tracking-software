const express = require("express");
const checkAuth = require('../middleware/auth-check');

const dashboardController = require('../controllers/dashboard');
const router = express.Router();

router.get('/get-project-count', dashboardController.getProjectCount);
router.get('/get-active-emp', dashboardController.getActiveEmp);

module.exports = router;