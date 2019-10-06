const User = require('../models/user');
const jwt = require('jsonwebtoken'); //generate signed token
const expressJwt = require('express-jwt'); //authorization check
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
    //console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
                
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    })
};

exports.signin = (req, res) => {
    //find the user based on email
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => { //return error or user 
        if(err || !user) {
            return res.status(400).json({
                err: 'User with that email does not exist. Please signup.'
            });
        }
        //if user is found. make sure email and password match
        //create authenticate method in user model
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }
        //generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET) //random token from env
        //persist token as 't' in cookie with expire date
        res.cookie('t', token, {expire: new Date() + 9999})
        //return response with user and token to frontend client
        const {_id, name, email, role} = user 
        //destructure to save time not use user._id, user.email...
        return res.json({token, user: {_id, email, name, role}})
    });
};


exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({message: 'Signout success'});
};

//make sure user has signed in (token)
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.isAuth =(req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
        if(!user) {
            return res.status(402).json({
                error: "Access denied"
            })
        }
        next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) { //if not admin=1
        return res.status(403).json ({
            error: "Admin resource! Access denied"
        })
    }
    next();
};