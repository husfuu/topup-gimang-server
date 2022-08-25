const router = require("express").Router();
const categoryController = require("../controllers/categories.controllers");
const isLoginAdmin = require("../middlewares/auth");

// view
router.get("/categories", isLoginAdmin, categoryController.viewAllCategories);
router.get(
    "/categories/create",
    isLoginAdmin,
    categoryController.viewCreateCategories,
);
router.get(
    "/categories/edit/:id",
    isLoginAdmin,
    categoryController.viewEditCategories,
);

// actions
router.post(
    "/categories/create",
    isLoginAdmin,
    categoryController.actionCreateCategories,
);
router.post(
    "/categories/delete/:id",
    isLoginAdmin,
    categoryController.actionDeleteCategories,
);
router.post(
    "/categories/edit/:id",
    isLoginAdmin,
    categoryController.actionEditCategories,
);

module.exports = router;
