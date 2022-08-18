const mongoose = require('mongoose')

 const catScheme = mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User'
   },
   meow: {
      type: String,
      require: [true, 'please specify a meow']
   }
 }, {
    timestamps: true
 })

 module.exports = mongoose.model('Cat', catScheme, 'cats')