const express = require("express");

const bugsController = require('../controllers/bugs');
const checkAuth = require('../middleware/auth-check');
const router = express.Router();

router.get('/getbugstatus', bugsController.getBugstatus);
router.get('/getbugstype', bugsController.getBugsType)
router.get('/getbugspriority', bugsController.getBugsPriority);


module.exports = router;