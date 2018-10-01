//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName : String,
    password : String
});

// Compile model from schema
var userModel = mongoose.model('User', userSchema );

module.exports = userModel;