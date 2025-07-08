const db = require("../util/db");

const Expenses = class {
  static async AddExpenses(
    category,
    subcategory,
    amount,
    description,
    idusers
  ) {
    try {
      const [rows] = await db.execute(
        "INSERT INTO expense (category,subcategory, amount,description, idusers) VALUES (?,?,?,?,?)",
        [category, subcategory, amount, description, idusers]
      );

      return { success: true, rows };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }

  static async getExpenses(idusers, filter, from = null, to = null) {
    try {
      let dateCondition = "";
      const params = [idusers];

      switch (filter) {
        case "daily":
          dateCondition = "DATE(createdAt) = CURDATE()";
          break;
        case "weekly":
          dateCondition = "YEARWEEK(createdAt, 1) = YEARWEEK(CURDATE(), 1)";
          break;
        case "monthly":
          dateCondition =
            "MONTH(createdAt) = MONTH(CURDATE()) AND YEAR(createdAt) = YEAR(CURDATE())";
          break;
        case "custom":
          if (from && to) {
            dateCondition = "createdAt BETWEEN ? AND ?";
            params.push(from, to);
          } else {
            return {
              success: false,
              message: "From and To dates are required for custom filter.",
            };
          }
          break;
        default:
          dateCondition = "1"; // no date filter
      }

      const [rows] = await db.execute(
        `SELECT * FROM expense WHERE idusers = ? AND ${dateCondition} ORDER BY createdAt DESC`,
        params
      );

      if (rows.length === 0) {
        return { success: false, message: "There are no expenses" };
      }
      return { success: true, rows };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  static async deleteExpense(id) {
    console.log(id);

    try {
      const [result] = await db.execute("DELETE FROM expense WHERE id = ?", [
        id,
      ]);

      return { success: true, result };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }
};

module.exports = Expenses;
