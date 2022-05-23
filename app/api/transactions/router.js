const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const { getTransactionList, detailTransactionList } = require("./controller");

router.get("/transactions", auth, getTransactionList);
router.get("/transactions/:id", auth, detailTransactionList);

module.exports = router;
