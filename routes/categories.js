const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Category = require('../models/category');

// Create Category
router.post('/create', (req, res, next) => {
    let newCategory = new Category({
        title: req.body.title
    });

    Category.addCategory(newCategory, (err, category) => {
        if(err){
            res.json({success: false, msg: 'Failed to create category'});
        }
        else{
            res.json({success: true, msg: 'Successfully created new category'});
        }
    });

});

// Delete Category
router.post('/delete', (req, res, next) => {
    const id = req.body.id;
    console.log('Got id: ' + id);
    Category.removeCategory(id, (err, category) =>{
        if(err){
            res.json({success: false, msg: 'Failed to delete category'});
        }
        else{
            res.json({success: true, msg: 'Successfully deleted category'});
        }
    })
});

// Update Category
router.post('/update', (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    Category.updateCategory(id, title, (err, category) =>{
        if(err){
            res.json({success: false, msg: 'Failed to update category'});
        }
        else{
            res.json({success: true, msg: 'Successfully updated category'});
        }
    })
});

// Get All Categories
router.get('/getAll', (req, res) => {
    Category.getAllCategories((err, categories) => {
        res.json(categories);
    });
})

module.exports = router;
