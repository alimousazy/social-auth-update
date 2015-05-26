let mongoose = require('mongoose')

require('songbird')
let findOrCreate = require('mongoose-findorcreate')

let userSchema = mongoose.Schema({
      user_name: String,
      facebook_id: String,
      accessToken: String,
      refreshToken: String,
      email: String,
      password: String,
      blog_name: String,
      blog_desc: String
})
userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema)
