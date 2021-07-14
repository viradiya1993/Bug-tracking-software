const express = require("express");

const bugsController = require('../controllers/bugs');
const checkAuth = require('../middleware/auth-check');
const router = express.Router();
const uploadFile = require('../middleware/file');


router.get('/getproject', checkAuth, bugsController.getProjects);
router.get('/getbugstatus', checkAuth, bugsController.getBugstatus);
router.get('/getbugstype', checkAuth, bugsController.getBugsType)
router.get('/getbugspriority', checkAuth, bugsController.getBugsPriority);

router.get('/get-bugs-list', checkAuth, bugsController.getBugsList);
router.get('/getbugdetails/:id', checkAuth, bugsController.getBugsDetails);
router.post('/create', checkAuth, uploadFile, bugsController.createBugs);
router.post('/updatebugdetails/:id', checkAuth, uploadFile, bugsController.updateBugDetails);
router.delete('/delete-bugs/:id', checkAuth, bugsController.deleteBugDetails);

module.exports = router;