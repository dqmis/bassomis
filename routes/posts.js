const express = require('express');
const router = express.Router();
const fs = require('fs');
const passport = require('passport');
const config = require('../config/database');
const multer = require('multer');
const Post = require('../models/post');
const path = require('path');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: process.env.S3_KEY, secretAccessKey: process.env.S3_SECRET });
var s3 = new AWS.S3();

// Create Post
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res, next) => {
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
            res.json({success: false, msg: 'Failed to create post' + err});
        }
        else{
            res.json({success: true, msg: 'Successfully created new post'});
        }
    });

});

// Delete Post
router.post('/delete', passport.authenticate('jwt', {session: false}), (req, res, next) => {
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
router.post('/update', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const id = req.body.id;
    const category = req.body.category;
    const title = req.body.title;
    const intro = req.body.intro;
    const content = req.body.content;
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
    Post.getPostsByCategoryLimited(category, (err, posts) => {
        res.json(posts);
    })
})

router.post('/deletePhoto', passport.authenticate('jwt', {session: false}), (req, res) => {
    key = req.body.key;
    var params = {
        Bucket:'bassomisbicket/photos', 
        Key: key
    };

    s3.deleteObject(params, function(err, data) {
        return  0;
    });
})


router.post('/upload', multipartMiddleware, passport.authenticate('jwt', {session: false}), function(req, res){
    var file = req.files.photo;
    var fileStream = fs.createReadStream(file.path);

    fileStream.on('open', function () {

        s3.putObject({
            Bucket: 'bassomisbicket/photos',
            Key: file.name,
            Body: fileStream
        },

        function (err) {
            if (err) { throw err; }
        });
    }); 
})


module.exports = router;
