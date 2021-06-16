const express = require("express");

const projectsController = require('../controllers/projects');
const checkAuth = require('../middleware/auth-check');
const router = express.Router();


router.get('/gettechnology', projectsController.getTechnology);

router.get('/get-project-list', projectsController.getProjectList)
router.get('/getproject/:id',  projectsController.getProjectDetail);
router.post('/create', projectsController.createProject);
router.post('/updateproject/:id', projectsController.updateProject);
router.delete('/delete-projects/:id', projectsController.deleteProject);

module.exports = router;