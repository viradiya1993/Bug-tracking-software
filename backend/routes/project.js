const express = require("express");

const projectsController = require('../controllers/projects');
const checkAuth = require('../middleware/auth-check');
const router = express.Router();

router.post('/create', projectsController.createProject);

router.get('/getemployee', projectsController.getEmployee);

module.exports = router;