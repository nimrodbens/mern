const mongoose = require('mongoose')

 const userScheme = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'please add a name']
    },
    email: {
        type: String,
        require: [true, 'please specify an email'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'please specify a password'],
    },
 }, {
    timestamps: true
 })

 module.exports = mongoose.model('User', userScheme, 'users')