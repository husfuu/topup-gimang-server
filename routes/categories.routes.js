const router = require('express').Router();
const categoryController = require('../controllers/categories.controllers');

router.get('/category', categoryController.viewCategories);

module.exports = router;