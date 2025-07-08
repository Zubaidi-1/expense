import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function GetExpenses({ filter, added, setAdded }) {
  const token = localStorage.getItem("token");
  const [expenses, setExpenses] = useState([]);

  const getExpenses = async () => {
    try {
      const response = await fetch("http://localhost:3000/getExpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ filter }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch expenses.");
      }

      const data = await response.json();
      setExpenses(data); // ✅ set state
    } catch (error) {
      console.error("Error fetching expenses:", error.message);
    }
  };
  const deleteExpense = async function (id) {
    try {
      console.log(id);

      const response = await fetch("http://localhost:3000/deleteexpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        console.log("hi");

        const errorData = await response.json();
        console.log(errorData);

        throw new Error(errorData.message || "Failed to fetch expenses.");
      }
      const data = await response.json();
      setAdded((prev) => !prev);
      console.log(data);
    } catch (error) {
      console.log(error);

      console.error("Error fetching expenses:", error.message);
    }
  };

  useEffect(() => {
    getExpenses();
  }, [filter, added]);
  console.log(expenses);

  return (
    <div className="space-y-4 mt-4 h-[500px] overflow-y-auto">
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses found.</p>
      ) : (
        expenses.map((expense) => (
          <div
            key={expense.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold text-[#034078]">
                {expense.category} — {expense.subcategory}
              </h4>
              <p className="text-sm text-gray-600">{expense.description}</p>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                {new Date(expense.createdAt).toLocaleString()}
                <button
                  onClick={() => {
                    deleteExpense(expense.id);
                  }}
                  className="text-red-500"
                >
                  <MdDelete />
                </button>
              </p>
            </div>
            <div className="text-lg font-bold text-green-600">
              ${expense.amount}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
