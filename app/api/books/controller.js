const { Book, Category } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword = "", category = "" } = req.query;
      //   console.log(keyword);

      let condition = {
        user: req.user.id,
      };

      // untuk mencari buku berdasarkan keyword
      if (keyword !== "") {
        condition = { ...condition, title: { [Op.like]: `%${keyword}%` } };
      }

      if (category !== "") {
        condition = { ...condition, category: category };
      }

      // req.user untuk menangkap category yang dimiliki oleh user yang sudah login
      const books = await Book.findAll({
        where: condition,
        include: {
          model: Category,
          attributes: ["id", "name"],
        },
      });

      res.status(200).json({
        message: "Succes get All Books",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },

  createBooks: async (req, res, next) => {
    try {
      let user = req.user.id;
      const { image, title, category, author, publish, price, stock } =
        req.body;

      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user: user,
        },
      });

      if (!checkCategory) {
        return res.status(404).json({ message: "id Categgory not found" });
      }

      const books = await Book.create({
        image,
        title,
        category,
        author,
        publish,
        price,
        stock,
        user: user,
      });

      res.status(201).json({
        message: "Success create Books",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },

  updateBooks: async (req, res, next) => {
    try {
      let user = req.user.id;
      const { id } = req.params;
      const { image, title, category, author, publish, price, stock } =
        req.body;

      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user: user,
        },
      });

      if (!checkCategory) {
        return res.status(404).json({ message: "id Category not found" });
      }

      const checkBook = await Book.findOne({
        where: { id: id },
      });

      if (!checkBook) {
        return res.status(404).json({ message: "id Book not found" });
      }

      const books = await checkBook.update({
        image,
        title,
        category,
        author,
        publish,
        price,
        stock,
        user: user,
      });

      res.status(200).json({
        message: "Success update Books",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteBooks: async (req, res, next) => {
    try {
      const { id } = req.params;

      const books = await Book.findOne({
        where: { id: id },
      });

      if (!books) {
        return res.status(404).json({ message: "id book not found" });
      }

      books.destroy();

      res.status(202).json({
        message: "Success delete Books",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },
};
