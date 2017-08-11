const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');


router.post('/register', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    })

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({err})
        }
        else{
            res.json('sucess')
        }
    })
})

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({sucess: false, msg: 'Neteisingas vartotojo vardas'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username
                    }
                })
            }
            else {
                return res.json({sucess: false, msg: 'Neteisingas slaptažodis'})
            }
        })
    })
})

router.post('/delete',  passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const id = req.body.id;
    User.removeUser(id, (err, user) => {
        if(err){
            res.json(err);
        }
        else res.json('sucess')
    });
})

router.get('/getAll', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    User.getAllUsers((err, users) => {
        if(err) throw err;
        res.json(users);
    })
})

module.exports = router;