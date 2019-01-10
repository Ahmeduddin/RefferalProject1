const mongoose = require('mongoose');

const refferal =  mongoose.model('refferal',{
    refferal_code: String,
    users_id: []
})

module.exports = refferal;