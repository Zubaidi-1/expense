import { useState } from "react";
import ProgressLanding from "../components/ProgressLanding";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = function (e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

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

  const pass = async function (e) {
    e.preventDefault();

    if (!passwordTest(userData.password, userData.confirmPassword)) {
      return;
    }
    const fetchPass = await fetch("http://localhost:3000/forgotpass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });

    const data = await fetchPass.json();

    if (!fetchPass.ok) {
      console.log(data);
      setError(data.message || "failed to login");
    }
    setError("");
    console.log(data);
  };

  return (
    <div className="h-screen grid grid-cols-2 overflow-hidden">
      {/* Left column */}
      <ProgressLanding />
      {/* Right column */}
      <div className="flex flex-col justify-center items-center h-full bg-white">
        <h1 className="text-black font-sans text-6xl underline decoration-[#1282a2]">
          Spendly
        </h1>
        <form onSubmit={pass} className="flex flex-col gap-4 mt-6">
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
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            className="border-2 border-[#1282a2] p-2 w-72 rounded"
            required
          ></input>
          <p className="text-sm mt-2 text-[#1282a2]">
            Forgot Passowrd? <a className="underline">Reset Password</a>
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-lg bg-[#195184] text-white px-4 py-2 rounded mt-4"
          >
            Change Password
          </motion.button>
        </form>
      </div>
    </div>
  );
}
