const { Categories } = require("../models");

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the category name",
                },
            });
        }

        const categoryExists = await Categories.findOne({
            where: {
                name,
            },
        });

        if (categoryExists) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "category is already exists!",
                },
            });
        }

        const category = await Categories.create({
            name,
        });

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "New category successfully created!",
                category,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
        });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll();

        if (!categories) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "the category not found!",
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "Successfully get all categories",
                categories,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
        });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Categories.findByPk(categoryId);

        if (!category) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `category with id = ${categoryId} is not found`,
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "Successfully get bank account!",
                category,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
        });
    }
};

exports.updateCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Categories.findByPk(categoryId);

        if (!category) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `category with id = ${categoryId} is not found!`,
                },
            });
        }

        const { name } = req.body;

        if (!name) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the name",
                },
            });
        }

        await Categories.update(
            {
                name,
            },
            {
                where: {
                    id: categoryId,
                },
            },
        );

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Successfully update category with id = ${categoryId}!`,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
        });
    }
};

exports.deleteCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Categories.findByPk(categoryId);

        if (!category) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `category with id = ${categoryId} is not found!`,
                },
            });
        }

        await Categories.destroy({
            where: {
                id: categoryId,
            },
        });

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Successfully delete category with id = ${categoryId}`,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
        });
    }
};

exports.viewAllCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll();

        const alertMesage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");

        const alert = { message: alertMesage, status: alertStatus };

        res.render("admin/category/view_category", {
            title: "Category Page",
            categories,
            alert,
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/category");
    }
};

exports.viewCreateCategories = async (req, res) => {
    try {
        res.render("admin/category/add_category", {
            title: "Add Category",
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/categories");
    }
};

exports.viewEditCategories = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Categories.findByPk(categoryId);

        res.render("admin/category/edit_category", {
            category,
            title: "Edit Category",
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/category");
    }
};

exports.actionCreateCategories = async (req, res) => {
    try {
        const { name } = req.body;

        await Categories.create({
            name,
        });

        req.flash("alertMessage", "Successfully added Category");
        req.flash("alertStatus", "success");

        res.redirect("/categories");
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/categories");
    }
};

exports.actionEditCategories = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const { name } = req.body;

        await Categories.update(
            {
                name,
            },
            {
                where: {
                    id: categoryId,
                },
            },
        );

        req.flash("alertMessage", "Successfully edited Category");
        req.flash("alertStatus", "success");

        res.redirect("/categories");
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/categories");
    }
};

exports.actionDeleteCategories = async (req, res) => {
    try {
        const categoryId = req.params.id;

        await Categories.destroy({
            where: {
                id: categoryId,
            },
        });

        req.flash("alertMessage", "Successfully deleted Category");
        req.flash("alertStatus", "success");

        res.redirect("/categories");
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/categories");
    }
};
