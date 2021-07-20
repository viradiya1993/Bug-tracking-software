const express = require("express");

const bugsController = require('../controllers/bugs');
const checkAuth = require('../middleware/auth-check');
const router = express.Router();
const multiUpload = require('../middleware/multiupload');


router.get('/getproject', checkAuth, bugsController.getProjects);
router.get('/getbugstatus', checkAuth, bugsController.getBugstatus);
router.get('/getbugstype', checkAuth, bugsController.getBugsType)
router.get('/getbugspriority', checkAuth, bugsController.getBugsPriority);

router.get('/get-bugs-list', checkAuth, bugsController.getBugsList);
router.get('/getbugdetails/:id', checkAuth, bugsController.getBugsDetails);
router.post('/create', checkAuth, multiUpload, bugsController.createBugs);
router.post('/updatebugdetails/:id', checkAuth, multiUpload, bugsController.updateBugDetails);
router.delete('/delete-bugs/:id', checkAuth, bugsController.deleteBugDetails);

router.post('/updatebugStatus', bugsController.updateBugStatusById);

module.exports = router;