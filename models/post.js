const mongoose = require('mongoose');
const config = require('../config/database');

// Post Schema
const PostSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isImportant: {
        type: Boolean
    },
    dateCreated: {
        type: String,
        required: true
    },
    dateEdited: {
        type: String,
        required: true
    },
    initialized: {
        type: Date,
        required: true
    }
});


const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.getPostsByCategory = function(catId, callback){
    const query = {category: catId};
    Post.find(query, callback);
};

module.exports.getPostsByCategoryLimited = function(catId, callback){
    const query = {category: catId, isImportant: false};
    Post.find(query, callback).sort({initialized: -1}).limit(4);
}

module.exports.getPostById = function(Id, callback){
    const query = {_id: Id};
    Post.findOne(query, callback);
}

module.exports.getAllPosts = function(callback){
    Post.find({}, callback).sort({initialized: -1});
};

module.exports.getImportantPosts = function(callback){
    const query = {isImportant: true};
    Post.find(query, callback);
};

module.exports.addPost = function(newPost, callback){
    newPost.save(callback);
};

module.exports.removePost = function(id, callback){
    const query = ({_id: id});
    Post.remove(query, callback);
};

module.exports.updatePost = function(id, category, title, intro, content, image, isImportant,  callback, dateEdited){
    const query = ({_id: id}, {$set: {
        title: title,
        category: category,
        intro: intro,
        content: content, 
        image: image,
        isImportant: isImportant,
        dateEdited: dateEdited
    }});
    Post.update(query, callback);
}
