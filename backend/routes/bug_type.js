const express = require("express");

const bugsTypeController = require('../controllers/bug_type');
const checkAuth = require('../middleware/auth-check');
const router = express.Router();

router.get('/getbugTypeList', bugsTypeController.getBugtypeList);
router.get('/getbugtype/:id', bugsTypeController.getBugTypeDetails);
router.post('/create', bugsTypeController.createBugType);
router.post('/updateBugtype/:id', bugsTypeController.updateBugType);
router.delete('/delete-bugtype/:id', bugsTypeController.deleteBugType);




module.exports = router;