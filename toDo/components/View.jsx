import { useState } from "react";

export default function View({ selected, setSelected }) {
  const options = ["Daily", "Weekly", "Monthly"];

  return (
    <div className="flex gap-8 mt-32 h-screen items-start">
      {options.map((option) => (
        <p
          key={option}
          onClick={() => setSelected(option)}
          className={`cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200 ${
            selected === option
              ? "bg-[#034078] text-white font-semibold"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {option}
        </p>
      ))}
    </div>
  );
}
