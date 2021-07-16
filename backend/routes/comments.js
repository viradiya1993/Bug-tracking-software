const express = require("express");
const commentsController = require("../controllers/comments");
const checkAuth = require('../middleware/auth-check');
const multiUpload = require('../middleware/multiupload');
const router = express.Router();

router.post('/create', multiUpload, checkAuth, commentsController.createComment);
router.get('/getComment', multiUpload, commentsController.getCommets);




module.exports = router; 