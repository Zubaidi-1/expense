const Expenses = require("../Modal/Expenses");

exports.AddExpenses = async (req, res) => {
  const { category, subCategory, amount, description } = req.body;
  const { id } = req.user;
  try {
    const expense = await Expenses.AddExpenses(
      category,
      subCategory,
      amount,
      description,
      id
    );

    if (expense.success) {
      return res.status(200).json(expense.rows);
    } else
      return res.status(401).json({ success: false, message: expense.message });
  } catch (e) {
    return res.status(401).json({ success: false, message: e.message });
  }
};
exports.getExpenses = async (req, res) => {
  const { filter, from, to } = req.body;
  const { id } = req.user;

  try {
    const getExpense = await Expenses.getExpenses(id, filter, from, to);

    if (getExpense.success) {
      return res.status(200).json(getExpense.rows);
    } else {
      return res
        .status(400)
        .json({ success: false, message: getExpense.message });
    }
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.deleteExpense = async (req, res) => {
  console.log(req.body);

  const { id } = req.body;

  try {
    const deleteExpense = await Expenses.deleteExpense(id);
    if (deleteExpense.success) {
      return res
        .status(200)
        .json({ success: true, result: deleteExpense.result });
    } else {
      return res
        .status(401)
        .json({ success: false, message: deleteExpense.message });
    }
  } catch (e) {
    return res.status(401).json({ success: false, message: e.message });
  }
};
