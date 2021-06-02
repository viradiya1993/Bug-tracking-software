const Logger = require('../models/logger.model');
const dateFormat = require('../helper/dateFormate.helper');

exports.responseData = async (req, res) =>  {
    try {
         var log = new Logger({
            url: req.url,
            orginalUrl: req.originalUrl,
            method: req.method,
            body: req.body,
            response: res,
            created_at : dateFormat.set_current_timestamp()
         });   
         await log.save();
    } catch (error) {
        console.log(err);
    }
}