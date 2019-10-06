const express = require('express');
const router = express.Router();

const { 
    create, 
    productById, 
    read, 
    remove, 
    update, 
    list, 
    listRelated, 
    listCategories,
    listBySearch,
    photo,
    listSearch
} = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create); 
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update)
router.get('/products', list)
router.get('/products/search', listSearch)
router.get('/products/related/:productId', listRelated)
router.get('/products/categories', listCategories)
router.post('/products/by/search', listBySearch) // route - make sure its post
router.get('/product/photo/:productId', photo)

router.param('userId', userById); //check if userid exist then populate user
router.param('productId', productById);

module.exports = router;