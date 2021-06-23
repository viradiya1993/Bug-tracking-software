const dateFormat = require('../helper/dateFormate.helper');
const constant = require('../config/constant');
const bugStatus = require('../models/bugs-status');
const bugType = require('../models/bugtype');
const bugPriority = require('../models/bugs-priority');



// Fetch Bug Status
exports.getBugstatus = async (req, res, next) => {
    const query = bugStatus.find();
    let data;
    query
    .then(status => {
        data = status
        return bugStatus.countDocuments();
    })
    .then(count => {
        return res.status(200).json({
            message: "Bug status fetched.",
            data: data,
            total: count
        });
    })
    .catch(error => {
        res.status(400).json({
            message: "Something went wrong. Please try again later"
        });
    });
}

// Fetch Bug Type
exports.getBugsType = async (req, res, next) => {
    const query = bugType.find();
    let data;
    query
    .then(status => {
        data = status
        return bugType.countDocuments();
    })
    .then(count => {
        return res.status(200).json({
            message: "Bug type fetched.",
            data: data,
            total: count
        });
    })
    .catch(error => {
        res.status(400).json({
            message: "Something went wrong. Please try again later"
        });
    });
}

// Fetch Bug Priority
exports.getBugsPriority = async (req, res, next) => {
    const query = bugPriority.find();
    let data;
    query
    .then(status => {
        data = status
        return bugPriority.countDocuments();
    })
    .then(count => {
        return res.status(200).json({
            message: "Bugs Priority fetched.",
            data: data,
            total: count
        });
    })
    .catch(error => {
        res.status(400).json({
            message: "Something went wrong. Please try again later"
        });
    });
}