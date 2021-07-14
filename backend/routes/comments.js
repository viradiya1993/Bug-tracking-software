const express = require("express");
const commentsController = require("../controllers/comments");
const checkAuth = require('../middleware/auth-check');
const upload = require('../middleware/uploadTaskPic');
const router = express.Router();

router.post('/create', upload, checkAuth, commentsController.createComment);
router.get('/getComment', commentsController.getCommets);



router.post('/file', upload, commentsController.uploadFile);
router.post('/multiple', upload, commentsController.abcdFiles);
module.exports = router; 