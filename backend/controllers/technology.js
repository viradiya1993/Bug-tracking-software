const dateFormat = require('../helper/dateFormate.helper');
const constant = require('../config/constant');
const Technology = require("../models/technology");
const technology = require('../models/technology');

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

exports.getTechnology = async (req, res, next) => {
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
            {'tech_name': new RegExp(search, 'i')},
            {'tech_id': new RegExp(search, 'i')}
        ]
    }

    try {
        var technology;
        technology = await Technology.find(query)
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .collation({locale: "en"})
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
        console.log(technology);
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