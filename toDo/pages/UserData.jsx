import ProgressLanding from "../components/ProgressLanding";
import { motion } from "framer-motion";
export default function UserData() {
  return (
    <div className="h-screen grid grid-cols-2 overflow-hidden">
      {/* Left column */}
      <ProgressLanding />
      {/* Right column */}
      <div className="flex flex-col justify-center items-center h-full bg-white">
        <h1 className="text-black font-sans text-6xl underline decoration-[#1282a2]">
          Spendly
        </h1>
        <div className="flex flex-col gap-4 mt-6">
          <input
            placeholder="Username"
            className="border-2 border-[#1282a2] p-2 w-72 rounded"
            required
          ></input>
          <input
            placeholder="Password"
            type="password"
            className="border-2 border-[#1282a2] p-2 w-72 rounded"
            required
          ></input>
          <input
            placeholder="Confirm password"
            type="password"
            className="border-2 border-[#1282a2] p-2 w-72 rounded"
            required
          ></input>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-lg bg-[#195184] text-white px-4 py-2 rounded mt-4"
        >
          <a href=" /Todo/todo/#/signin"> Next</a>
        </motion.button>
        <button></button>
      </div>
    </div>
  );
}
