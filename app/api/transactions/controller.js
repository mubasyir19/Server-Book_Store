const { Op } = require("sequelize");
const { Transaction, DetailTransaction } = require("../../db/models");

module.exports = {
  getTransactionList: async (req, res, next) => {
    try {
      const { keyword = "" } = req.query;

      let condition = {
        user: req.user.id,
      };

      if (keyword !== "") {
        condition = { ...condition, invoice: { [Op.like]: `%${keyword}%` } };
      }

      const transaction = await Transaction.findAll({
        where: condition,
        include: {
          model: DetailTransaction,
          as: "detailTransaction",
        },
        attributes: ["invoice", "user", "date"],
      });

      res.status(200).json({
        message: "Success get All Transaction",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  },
  detailTransactionList: async (req, res, next) => {
    try {
      const { id } = req.params;

      const detailTransaction = await Transaction.findOne({
        where: { id: id },
        include: {
          model: DetailTransaction,
          as: "detailTransaction",
        },
        // attributes: ["invoice", "user", "date"],
      });

      res.status(200).json({
        message: "Success get All Detail Transaction",
        data: detailTransaction,
      });
    } catch (error) {
      next(error);
    }
  },
};
