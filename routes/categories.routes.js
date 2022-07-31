const router = require("express").Router();
const categoryController = require("../controllers/categories.controllers");

router.post("/api/v1/categories", categoryController.createCategory);
router.get("/api/v1/categories", categoryController.getAllCategories);
router.get("/api/v1/categories/:id", categoryController.getCategoryById);
router.put("/api/v1/categories/:id", categoryController.updateCategoryById);
router.delete("/api/v1/categories/:id", categoryController.deleteCategoryById);

// view
router.get("/categories", categoryController.viewAllCategories);
router.get("/categories/create", categoryController.viewCreateCategories);
router.get("/categories/edit/:id", categoryController.viewEditCategories);

// actions
router.post("/categories/create", categoryController.actionCreateCategories);
router.post(
    "/categories/delete/:id",
    categoryController.actionDeleteCategories,
);
router.post("/categories/edit/:id", categoryController.actionEditCategories);

module.exports = router;
