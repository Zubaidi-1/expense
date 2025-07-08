const express = require("express");
const expenseController = require("../controllers/Expenses");
const verifyToken = require("../middlewares/auth");

const router = express.Router();

router.post("/addexpense", verifyToken, expenseController.AddExpenses);
router.post("/getexpense", verifyToken, expenseController.getExpenses);
router.post("/deleteexpense", verifyToken, expenseController.deleteExpense);

module.exports = router;
