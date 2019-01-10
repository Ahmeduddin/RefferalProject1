const mongoose = require('mongoose');

const users =  mongoose.model('users',{
    name: String,
    password: String,
    email: String,
    refferal_id: String
})

module.exports = users;