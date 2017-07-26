const express = require('express');
const router = express.Router();
const config = require('../config/database');
const multer = require('multer');
const Post = require('../models/post');
const path = require('path');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');

var storage = multer.diskStorage({
  destination: './angular-src/src/assets/uploads/photos',
  filename: function (req, file, cb) {
      return cb(null, file.originalname + '.jpeg')
  }
})

var upPath = multer({storage: storage});

// Create Post
router.post('/create', (req, res, next) => {
    let newPost = new Post({
        title: req.body.title,
        category: req.body.category,
        intro: req.body.intro,
        content: req.body.content,
        image: req.body.image,
        isImportant: req.body.isImportant,
        dateCreated: req.body.dateCreated,
        dateEdited: req.body.dateCreated,
        initialized: req.body.initialized
    });

    Post.addPost(newPost, (err, post) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to create post' + err});
        }
        else{
            res.json({success: true, msg: 'Successfully created new post'});
        }
    });

});

// Delete Post
router.post('/delete', (req, res, next) => {
    const id = req.body.id;
    Post.removePost(id, (err, post) =>{
        if(err){
            res.json({success: false, msg: 'Failed to delete post'});
        }
        else{
            res.json({success: true, msg: 'Successfully deleted post'});
        }
    })
});

// Update Post
router.post('/update', (req, res, next) => {
    const id = req.body.id;
    const category = req.body.category;
    const title = req.body.title;
    const intro = req.body.intro;
    const content = req.body.intro;
    const image = req.body.image;
    const isImportant = req.body.isImportant;
    const dateEdited = req.body.dateEdited;

    Post.updatePost(id, category, title, intro, content, image, isImportant, dateEdited, (err, post) =>{
        if(err){
            res.json({success: false, msg: 'Failed to update post'});
        }
        else{
            res.json({success: true, msg: 'Successfully updated post'});
        }
    })
});

// Get All Posts
router.get('/getAll', (req, res) => {
    Post.getAllPosts((err, posts) => {
        res.json(posts);
    });
})


// Get Post by Category
router.get('/getPosts/:category', (req, res) => {
    const category = req.params.category;
    Post.getPostsByCategory(category, (err, posts) => {
        res.json(posts);
    });
})

router.get('/getPost/:id', (req, res) => {
    const id = req.params.id;
    Post.getPostById(id, (err, post) => {
        res.json(post);
    });
})

router.get('/getPostsL/:category', (req, res) => {
    const category = req.params.category;
    console.log(category);
    Post.getPostsByCategoryLimited(category, (err, posts) => {
        res.json(posts);
    })
})

router.post('/upload', upPath.single('photo'), (req, res) => {
    console.log(req.file);
    imagemin(['./angular-src/src/assets/uploads/photos/' + req.file.name], './angular-src/src/assets/uploads/photos/', {
	plugins: [
		imageminJpegtran()
	]
})
})


module.exports = router;
