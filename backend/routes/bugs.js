const express = require("express");

const bugsController = require('../controllers/bugs');
const checkAuth = require('../middleware/auth-check');
const router = express.Router();

router.get('/getproject', bugsController.getProjects);
router.get('/getbugstatus', bugsController.getBugstatus);
router.get('/getbugstype', bugsController.getBugsType)
router.get('/getbugspriority', bugsController.getBugsPriority);

router.get('/get-bugs-list', bugsController.getBugsList);
router.post('/create', checkAuth, bugsController.createBugs);

module.exports = router;