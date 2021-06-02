const moment = require('moment');

exports.set_current_timestamp = function(){
    return moment().format("x");
}

exports.getDateFormatFromTimeStamp = function(dt){
    // return moment.unix(dt).format("MM/DD/YYYY") // old   
    return moment(dt, "x").format("MM/DD/YYYY")    // new
}

exports.addExpireTime = function(){
    return moment().add(1, 'hours').format('x');
}

exports.convertTimestamp = function(start_date){
    return moment(start_date).format("x");
}