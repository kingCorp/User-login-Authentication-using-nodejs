var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
mongoose.connect('localhost:27017/myform', function () { 
  console.log('connected to database');
 });

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var User = module.exports = mongoose.model('User', userSchema);

//getUserByUsername function
module.exports.getUserByUsername = function(username, callback) {
    query = {username: username}
    User.findOne(query, callback);
 }
//compare password
module.exports.comparePassword = function(candpassword, hash, callback) { 
    return bcrypt.compare(candpassword, hash, function (err, isMatch) { 
        if (err) return callback(err);
        callback(null, isMatch);
     });

 }