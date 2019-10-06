const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, read, update, purchaseHistory } = require('../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});

router.get('/user/:userId', requireSignin, isAuth, read) 
//create user profile route
router.put('/user/:userId', requireSignin, isAuth, update)
//create user update profile route. allow user update profile
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory) 

router.param('userId', userById) //if theres userId call userbyid method

module.exports = router;