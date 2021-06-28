const express = require("express");

const projectsController = require('../controllers/projects');
const checkAuth = require('../middleware/auth-check');
const router = express.Router();


router.get('/gettechnology', checkAuth, projectsController.getTechnology);

router.get('/get-project-list', checkAuth, projectsController.getProjectList)
router.get('/getproject/:id', checkAuth, projectsController.getProjectDetail);
router.post('/create', checkAuth, projectsController.createProject);
router.post('/updateproject/:id', checkAuth, projectsController.updateProject);
router.delete('/delete-projects/:id', checkAuth, projectsController.deleteProject);

router.post('/status/add', checkAuth, projectsController.addStatus);
router.get('/status', checkAuth, projectsController.getStatus);

router.post('/updateStatusById', checkAuth, projectsController.updateStatusById);

module.exports = router;