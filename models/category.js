const mongoose = require('mongoose');
const config = require('../config/database');

// Category Schema
const CategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    about: {
        type: String,
        required: true
    }
});

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.getCategoryByTitle = function(title, callback){
    const query = {title: title};
    Category.findOne(query, callback);
};

module.exports.getAllCategories = function(callback){
    Category.find({}, callback);
};

module.exports.getCategoryById = function(id, callback){
    Category.findById(id, callback);
}

module.exports.addCategory = function(newCategory, callback){
    newCategory.save(callback);
};

module.exports.removeCategory = function(id, callback){
    const query = ({_id: id});
    Category.remove(query, callback);
};

module.exports.updateCategory = function(id, title, about, callback){
    const query = ({_id: id}, {$set: {title: title, about: about}});
    Category.update(query, callback);
}

