const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

})

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback)
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback)
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

module.exports.removeUser = function(id, callback){
    const query = ({_id: id});
    console.log(id);
    User.remove(query, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){

    callback(null, isMatch);

}

module.exports.getAllUsers = function(callback){
    User.find({}, callback);
}

 
