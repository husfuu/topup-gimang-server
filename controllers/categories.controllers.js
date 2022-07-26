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
