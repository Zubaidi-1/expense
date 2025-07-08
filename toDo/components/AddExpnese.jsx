import { useState, useEffect } from "react";

export default function AddExpense({ setAdded }) {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleSubCategoryChange = (e) => setSelectedSubCategory(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const addExpense = async function (e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authorization token not found.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/addexpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          category,
          subCategory: selectedSubCategory,
          description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add expense.");
      }

      const data = await response.json();
      setAdded((prev) => !prev);
      setSuccess("Expense added successfully!");
      // Optionally reset form:
      setAmount("");
      setCategory("");
      setSelectedSubCategory("");
      setDescription("");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    switch (category) {
      case "Essentials":
        setSubCategory([
          "Utilities",
          "Groceries",
          "Transportation",
          "Insurance",
          "Phone",
        ]);
        break;
      case "Entertainment":
        setSubCategory(["Dining Out", "Movies", "Games", "Subscriptions"]);
        break;
      case "Education":
        setSubCategory(["Courses", "Tuition", "Workshops"]);
        break;
      case "Health":
        setSubCategory(["Medical", "Pharmacy", "Therapy"]);
        break;
      case "Other":
        setSubCategory(["Travel", "Gifts", "Pets", "Childcare", "Debt"]);
        break;
      default:
        setSubCategory([]);
    }
  }, [category]);

  return (
    <div className="max-w-xl mt-32 bg-white p-8 rounded-xl transition hover:shadow-lg shadow-md shadow-[#1282a2]">
      <h1 className="text-3xl font-bold text-[#034078] mb-8">Add an Expense</h1>

      {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
      {success && (
        <p className="text-green-600 font-semibold mb-4">{success}</p>
      )}

      <form className="flex flex-col gap-6" onSubmit={addExpense}>
        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#034078]"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Essentials">Essentials</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Subcategory */}
        <div>
          <label
            htmlFor="subcategory"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Subcategory
          </label>
          <select
            id="subcategory"
            name="subcategory"
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#034078]"
            disabled={!subCategory.length}
          >
            <option value="" disabled>
              {subCategory.length
                ? "Select Subcategory"
                : "Choose a Category First"}
            </option>
            {subCategory.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <input
            onChange={handleAmountChange}
            id="amount"
            name="amount"
            placeholder="Amount"
            type="number"
            value={amount || ""}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#034078]"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <input
            onChange={handleDescriptionChange}
            id="description"
            name="description"
            placeholder="Description"
            value={description || ""}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#034078]"
          />
        </div>

        <button
          type="submit"
          className="bg-[#034078] text-white py-2 px-4 rounded-lg hover:bg-[#022b5b] transition-colors duration-200"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
