const express = require("express");

const technologyController = require('../controllers/technology');
const checkAuth = require('../middleware/auth-check');
const router = express.Router();

router.get("/gettechnology", checkAuth, technologyController.getTechnology);
router.post("/create", technologyController.createTechnology);

module.exports = router;

