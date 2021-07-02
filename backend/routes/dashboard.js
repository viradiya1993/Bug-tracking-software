const express = require("express");
const checkAuth = require('../middleware/auth-check');

const dashboardController = require('../controllers/dashboard');
const router = express.Router();

router.get('/get-project-count', checkAuth, dashboardController.getProjectCount);
router.get('/get-active-emp', checkAuth, dashboardController.getActiveEmp);
router.get('/get-assign-project',checkAuth, dashboardController.AssignProject);
router.get('/get-active-project', checkAuth, dashboardController.AssignActiveProject);

module.exports = router; 