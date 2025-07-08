import ProgressLanding from "../components/ProgressLanding";

import { motion } from "framer-motion";
export default function Landing() {
  return (
    <div className="h-screen grid grid-cols-2 overflow-hidden">
      {/* Left column */}
      <ProgressLanding />
      {/* Right column */}
      <div className="flex flex-col justify-center items-center h-full bg-white">
        <h1 className="text-black font-sans text-6xl underline decoration-[#1282a2]">
          Spendly
        </h1>
        <h3 className="text-2xl text-[#034078] mt-6">
          Take control of your money — effortlessly.
        </h3>
        <div className="flex gap-6 mt-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-xl bg-[#1282a2] text-white px-6 py-3 rounded"
          >
            <a href=" /Todo/todo/#/signup"> Get Started!</a>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-xl bg-[#195184] text-white px-6 py-3 rounded"
          >
            <a href=" /Todo/todo/#/signin"> Log in</a>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
