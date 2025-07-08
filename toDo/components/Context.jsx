import { createContext, useContext, useState } from "react";

const ExpensesContext = createContext();

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState({
    Essentials: {
      Utilities: 0,
      Groceries: 0,
      Transportation: 0,
      Insurance: 0,
      Phone: 0,
    },
    Education: {
      Courses: 0,
      Tuition: 0,
      Workshops: 0,
    },
    Health: {
      Medical: 0,
      Pharmacy: 0,
      Therapy: 0,
    },
    Other: {
      Travel: 0,
      Gifts: 0,
      Pets: 0,
      Childcare: 0,
      Debt: 0,
    },
  });

  return (
    <ExpensesContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpensesContext);
}
