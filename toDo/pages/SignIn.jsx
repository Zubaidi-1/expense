import { useState } from "react";
import ProgressLanding from "../components/ProgressLanding";
import { motion } from "framer-motion";
export default function SignIn() {
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = function (e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const login = async function (e) {
    e.preventDefault();

    const fetchLogin = await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });

    const data = await fetchLogin.json();

    if (!fetchLogin.ok) {
      console.log(data);
      setError(data.message || "Failed to login");
      return;
    }

    console.log(data.token);
    setError("");
    localStorage.setItem("token", data.token);

    // ✅ Now redirect after saving the token
    window.location.href = "/Todo/todo/#/homepage";
  };

  console.log(localStorage.getItem(token));

  return (
    <div className="h-screen grid grid-cols-2 overflow-hidden">
      {/* Left column */}
      <ProgressLanding />
      {/* Right column */}
      <div className="flex flex-col justify-center items-center h-full bg-white">
        <h1 className="text-black font-sans text-6xl underline decoration-[#1282a2]">
          Spendly
        </h1>
        <form onSubmit={login} className="flex flex-col gap-4 mt-6">
          <input
            placeholder="Email"
            name="email"
            onChange={handleChange}
            type="email"
            className="border-2 border-[#1282a2] p-2 w-72 rounded"
            required
          ></input>
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
            className="border-2 border-[#1282a2] p-2 w-72 rounded"
            required
          ></input>
          <p className="text-sm mt-2 text-[#1282a2]">
            Forgot Passowrd?{" "}
            <a href="/Todo/todo/#/forgotpass" className="underline">
              Reset Password
            </a>
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-lg bg-[#195184] text-white px-4 py-2 rounded mt-4"
          >
            Log In
          </motion.button>
        </form>
      </div>
    </div>
  );
}
