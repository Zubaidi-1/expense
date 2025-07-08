import { useEffect, useMemo } from "react";
import { useExpenses } from "./Context";

export default function Categories({ title, icon, subCategory, added }) {
  const { expenses, setExpenses } = useExpenses([]);
  const token = localStorage.getItem("token");

  const getExpenses = async () => {
    try {
      const response = await fetch("http://localhost:3000/getExpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ filter: "monthly" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch expenses.");
      }

      const data = await response.json();
      setExpenses(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching expenses:", error.message);
    }
  };

  useEffect(() => {
    getExpenses();
  }, [added]);

  const totalForCategory = useMemo(() => {
    if (!Array.isArray(expenses)) return 0;
    return expenses
      .filter((e) => e.category === title)
      .reduce((acc, cur) => acc + parseFloat(cur.amount || 0), 0);
  }, [expenses, title]);

  return (
    <div className="bg-white rounded-2xl shadow-md shadow-[#1282a2] p-6 w-2xl transition hover:shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-3xl text-[#1282a2]">{icon}</div>
        <h1 className="text-xl font-semibold text-gray-800">
          {title} –{" "}
          <span className="text-[#1282a2]">${totalForCategory.toFixed(2)}</span>
        </h1>
      </div>

      <div className="flex gap-12 items-start">
        <ul className="space-y-2 pl-2 flex flex-col gap-1">
          {subCategory.map((item, index) => (
            <li
              key={index}
              className="text-gray-600 border-l-4 border-[#1282a2] px-3 py-1 pl-3 hover:font-medium transition"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
