const dateFormat = require('../helper/dateFormate.helper');
const constant = require('../config/constant');
const Technology = require("../models/technology");


// Create Technology
exports.createTechnology = async (req, res, next) => {
    const {tech_id, tech_name } = req.body;

    try {
        const technology = new Technology();
        technology.tech_id = tech_id;
        technology.tech_name = tech_name;
        technology.created_at = await dateFormat.set_current_timestamp();
        technology.updated_at = await dateFormat.set_current_timestamp();
        technology.actual_updated_at = await dateFormat.set_current_timestamp();
        technology.save()
        .then(technology => {
            return res.status(200).json({
                message: "Technology Added."
            });
        })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong. Please try again later"
        });
    }
}

// Fetch Full Technology list
exports.getTechnologyList = async (req, res, next) => {
    const sort = {};
    let query = {};
    const search = req.query.q ? req.query.q : ''; // for searching
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    const pageOptions = {
        page: parseInt(req.query.skip) || constant.PAGE,
        limit: parseInt(req.query.limit) || constant.LIMIT
    }

    if (search) {
        query.$or = [
            { 'tech_name': new RegExp(search, 'i') },
            { 'tech_id': new RegExp(search, 'i') }
        ]
    }
    
    try {
        var technology;
        technology = await Technology.find(query)
        .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .collation({ locale: "en" })
            .sort(sort);

        if (technology.length <= 0) {
            return res.status(200).json({
                message: "Technology not available.",
                data: {
                    totalcount: 0,
                    technology: []
                }
            });
        }
        const totalcount = await Technology.countDocuments(query);
         return res.status(200).json({
             message: "Technology list fatch successfully.",
             data: {
                 technology,
                 totalcount
             }
         });
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong. Please try again later.",
            data: {}
        })
    }


}

// Fetch Last Added Technology ID
exports.getLastTechnology = async (req, res, next) => {
    try {
        var technology;
        technology = await Technology.findOne({}).sort({_id:-1}).limit(1);
        if (technology) {
            return res.status(200).json({
                message: "Technology last Id available",
                data: {
                    technology
                }
            })
        }
        return res.status(200).json({
            message: "No technology available.",
            data: {}
        })
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong. Please try again later.",
            data: {}
        })
    }
}

// Fetch technology details
exports.getTechnology = async (req, res, next) => {
    try {
        const technology = await Technology.findOne({
            _id: req.params.id
        }); 
       
        if (!technology) {
            return res.status(404).json({
                message: "Technology details not available.",
                data: {}
            });
        }
        return res.status(200).json({
            message: "Technology detail fetch successfully.",
            data: {
                technology
            }
        });
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong. Please try again later.",
            data: {}
        })
    }
}

// Update Technology
exports.updateTechnology = async (req, res, next) => {
    const { tech_name } = req.body;
    
    try {
        const isProjectIdExist = await Technology.findOne({
            _id: req.params.id,
            tech_name
        });

        if (isProjectIdExist) {
            return res.status(400).send({
                message: "Technology already exist choose another one",
                data: {}
            });
        }
        const technology = await  Technology.findOne({
            _id: req.params.id
        });
        if (!technology) {
            return res.status(404).json({
                message: "Technology details not found.",
                data: {}
            });
        }
     
        technology.tech_name = tech_name;
        technology.updated_at = await dateFormat.set_current_timestamp();
        technology.actual_updated_at = await dateFormat.set_current_timestamp();
        technology.save()
        .then(technology => {
            return res.status(200).json({
                message: "Technology updated.",
                data: technology
            });
        })
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong. Please try again later.",
            data: {}
        })
    }
}

// Delete technology details
exports.deleteTechnology = async (req, res, next) => {
    try {
        const technology = await Technology.findOne({
            _id: req.params.id
        }); 
        const query = await Technology.deleteOne(technology);
        if (query.deletedCount === 1) {
            return res.status(200).json({
                message: "Deletion successfull!",
            });
        } else {
            return res.status(200).json({
                message: "Deletion failed!",
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong. Please try again later.",
            data: {}
        })
    }
}

