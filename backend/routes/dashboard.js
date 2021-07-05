const express = require("express");
const checkAuth = require('../middleware/auth-check');

const dashboardController = require('../controllers/dashboard');
const router = express.Router();

router.get('/get-project-count', checkAuth, dashboardController.getProjectCount);
router.get('/get-active-project', checkAuth, dashboardController.AssignActiveProject);
router.get('/get-activeassignpmproject', checkAuth, dashboardController.AssignActivePMprojects);

module.exports = router; 