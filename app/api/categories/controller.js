const { Category } = require("../../db/models");

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      //   console.log(req.user);
      // req.user untuk menangkap category yang dimiliki olej user yang sudah login
      const categories = await Category.findAll({
        where: {
          user: req.user.id,
        },
        attributes: ["id", "name"],
      });

      res.status(200).json({
        message: "Succes get All Categories",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  },

  createCategories: async (req, res, next) => {
    try {
      const { name } = req.body;

      const categories = await Category.create({
        name: name,
        user: req.user.id,
      });

      res.status(201).json({
        message: "Success create Categories",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  },

  updateCategories: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const checkCategories = await Category.findOne({
        where: { id: id, user: req.user.id },
      });

      const categories = await checkCategories.update({ name });

      res.status(201).json({
        message: "Success update category",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteCategories: (req, res, next) => {
    Category.findOne({
      where: { id: req.params.id, user: req.user.id },
    })
      .then((categories) => {
        if (categories) {
          categories.destroy();

          res.status(200).json({
            message: "Success delete Category",
            data: categories,
          });
        }
      })
      .catch((error) => next(error));
  },
};
