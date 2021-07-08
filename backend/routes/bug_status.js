const express = require("express");

const bugsStatusController = require('../controllers/bug_status');
const checkAuth = require('../middleware/auth-check');
const router = express.Router();

router.get('/getbugstatusList', bugsStatusController.getBugStatusList);
router.get('/getbugstatus/:id', bugsStatusController.getBugStatusDetails);
router.post('/create', bugsStatusController.createBugStatus);
router.post('/updateBugstatus/:id', bugsStatusController.updateBugStatus);
router.delete('/delete-bugstatus/:id', bugsStatusController.deleteStatus);

module.exports = router;