import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ expenses }) {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Monthly Expenses by Category",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const categories = [
    "Essentials",
    "Entertainment",
    "Education",
    "Health",
    "Other",
  ];
  const colors = {
    Essentials: "rgba(255, 99, 132, 0.5)",
    Entertainment: "rgba(54, 162, 235, 0.5)",
    Education: "rgba(255, 206, 86, 0.5)",
    Health: "rgba(75, 192, 192, 0.5)",
    Other: "rgba(153, 102, 255, 0.5)",
  };

  // Initialize a mapping for categories with 12 months
  const categoryMap = {};
  categories.forEach((cat) => {
    categoryMap[cat] = new Array(12).fill(0);
  });

  // Fill the map with actual expense data
  expenses.forEach((expense) => {
    const monthIndex = new Date(expense.createdAt).getMonth(); // 0-11
    const category = expense.category;
    const amount = parseFloat(expense.amount) || 0;

    if (categoryMap[category]) {
      categoryMap[category][monthIndex] += amount;
    } else {
      // In case a new category shows up that's not in the predefined list
      categoryMap[category] = new Array(12).fill(0);
      categoryMap[category][monthIndex] = amount;
    }
  });

  const datasets = Object.entries(categoryMap).map(
    ([category, monthlyData]) => ({
      label: category,
      data: monthlyData,
      backgroundColor: colors[category] || "rgba(100,100,100,0.5)",
    })
  );

  const data = {
    labels,
    datasets,
  };

  return <Bar className="w-full" options={options} data={data} />;
}
