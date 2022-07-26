const router = require('express').Router();
const categoryController = require('../controllers/categories.controllers');

router.post("/categories", categoryController.createCategory);
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.put("/categories/:id", categoryController.updateCategoryById);
router.delete("/categories/:id", categoryController.deleteCategoryById);

module.exports = router;