import { FaEdit, FaHome, FaMusic } from "react-icons/fa";
import Categories from "../components/Categories";
import { ExpensesProvider } from "../components/Context";
import AddExpense from "../components/AddExpnese";
import View from "../components/View";
import { useState, useEffect } from "react";
import GetExpenses from "../components/GetExpenses";
import Chart from "../components/Chart";

export default function HomePage() {
  const token = localStorage.getItem("token");
  console.log(token);

  const [selected, setSelected] = useState("Daily");
  const [added, setAdded] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const getExpenses = async () => {
    const now = new Date();
    const from = `${now.getFullYear()}-01-01`;
    const to = `${now.getFullYear()}-12-31`;

    try {
      const response = await fetch("http://localhost:3000/getExpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ filter: "custom", from, to }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch expenses.");
      }

      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error.message);
    }
  };

  useEffect(() => {
    getExpenses();
  }, [added]);

  console.log(expenses);

  return (
    <div className="h-screen">
      <ExpensesProvider>
        <div className="grid grid-cols-[1fr_1fr]">
          <div className="flex flex-col items-start ml-24 mt-16">
            <h1 className="text-3xl text-[#034078]">Your monthly Spendings</h1>
            <div className="gap-8">
              <div className="mt-12">
                <Categories
                  icon={<FaHome size={25} />}
                  title={"Essentials"}
                  subCategory={[
                    "Utilities (electricity, water, gas)",
                    "Groceries",
                    "Transportation (fuel, public transport)",
                    "Insurance (health, car, home)",
                    "Phone / Internet",
                  ]}
                />
              </div>
              <div className="mt-12">
                <Categories
                  icon={<FaMusic size={25} />}
                  title={"Entertainment"}
                  subCategory={[
                    "Dining Out",
                    "Entertainment (movies, streaming services)",
                    "Shopping (clothes, electronics)",
                    "Gym / Fitness",
                    "Subscriptions (Netflix, Spotify, etc.)",
                  ]}
                />
              </div>
              <div className="mt-12">
                <Categories
                  icon={<FaMusic size={25} />}
                  title={"Education"}
                  subCategory={[
                    "Courses / Books",
                    "Tuition / School Fees",
                    "Workshops / Training",
                  ]}
                />
              </div>
              <div className="mt-12">
                <Categories
                  icon={<FaMusic size={25} />}
                  title={"Health"}
                  subCategory={[
                    "Medical Bills",
                    "Pharmacy / Medication",
                    "Therapy / Mental Health",
                  ]}
                />
              </div>
              <div className="mt-12 mb-8 col-span-2 self-center justify-self-center">
                <Categories
                  added={added}
                  icon={<FaMusic size={25} />}
                  title={"Other"}
                  subCategory={[
                    "Travel / Vacations",
                    "Gifts & Donations",
                    "Pets",
                    "Childcare",
                    "Debt",
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 items-start mr-8">
            <div className="flex flex-col h-full">
              <AddExpense setAdded={setAdded} className="flex-grow" />
            </div>

            <div className="flex flex-col space-y-4 h-full">
              <div className="h-48">
                <View selected={selected} setSelected={setSelected} />
              </div>
              <div>
                <GetExpenses
                  filter={selected}
                  added={added}
                  setAdded={setAdded}
                />
              </div>
            </div>

            <div className="col-span-2 p-6 mr-12 ">
              <Chart expenses={expenses} />
            </div>
          </div>
        </div>
      </ExpensesProvider>
    </div>
  );
}
