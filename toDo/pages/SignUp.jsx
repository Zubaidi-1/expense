import { useEffect } from "react";
import ProgressLanding from "../components/ProgressLanding";
import { motion } from "framer-motion";
import { useState } from "react";
export default function SignUp() {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  console.log(userData);

  const [error, setError] = useState("");

  const handleChange = function (e) {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // passowrd test

  const passwordTest = function (password, confirmPassword) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      setError("Please enter a proper password");
      return false;
    }
    if (password !== confirmPassword) {
      console.log(confirmPassword);

      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async function (e) {
    e.preventDefault();

    if (!passwordTest(userData.password, userData.confirmPassword)) {
      return;
    }

    const signup = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userData.email,
        username: userData.username,
        password: userData.password,
      }),
    });
    const data = await signup.json();

    if (!signup.ok) {
      setError(data.message || "Signup failed");
    }
    if (!data.success) {
      console.log(data.message);
      setError(data.message);
    }
  };

  console.log(error);

  return (
    <div className="h-screen grid grid-cols-2 overflow-hidden">
      {/* Left column */}
      <ProgressLanding />
      {/* Right column */}
      <div className="flex flex-col justify-center items-center h-full bg-white">
        <h1 className="text-black font-sans text-6xl underline decoration-[#1282a2]">
          Spendly
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <input
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
            className="border-2 border-[#1282a2] p-2 w-72 rounded"
            required
          ></input>
          <input
            placeholder="Username"
            type="username"
            name="username"
            onChange={handleChange}
            className="border-2 border-[#1282a2] p-2 w-72 rounded"
            required
          ></input>
          <input
            placeholder="Password"
            name="password"
            onChange={handleChange}
            type="password"
            className="border-2 border-[#1282a2] p-2 w-72 rounded"
            required
          ></input>
          <input
            placeholder="Confirm Passowrd"
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            className="border-2 border-[#1282a2] p-2 w-72 rounded"
            required
          ></input>
          <p className="text-red-500 text-sm">{error}</p>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-lg bg-[#195184] text-white px-4 py-2 rounded mt-4"
          >
            Signup
          </motion.button>
        </form>
        <p className="text-sm mt-2 text-[#1282a2]">
          Have an Account?{" "}
          <a href=" /Todo/todo/#/signin" className="underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
