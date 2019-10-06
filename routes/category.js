const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/category/:categoryId', read); //found category id and render
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create); 
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update); 
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove); 
router.get('/categories', list); //get all categories

router.param('categoryId', categoryById); //if there's category ID
router.param('userId', userById); //check if userid exist then populate user


module.exports = router;