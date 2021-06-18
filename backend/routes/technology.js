const express = require("express");

const technologyController = require('../controllers/technology');
const checkAuth = require('../middleware/auth-check');
const router = express.Router();

router.get('/getTechnologyList', checkAuth, technologyController.getTechnologyList);
router.get('/getTechnology/:id',checkAuth, technologyController.getTechnology);
router.post('/create', checkAuth, technologyController.createTechnology);
router.post('/updateTechnology/:id', checkAuth, technologyController.updateTechnology);
router.delete('/delete-technology/:id', checkAuth, technologyController.deleteTechnology);

module.exports = router;

