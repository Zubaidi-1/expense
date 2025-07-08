import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function MyProgress({ value }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const intervalTime = 10; // milliseconds between updates
    const steps = duration / intervalTime;
    const increment = value / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(interval);
      }
      setProgress(Math.round(current));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [value]);
  return (
    <CircularProgressbar
      className="h-40"
      value={progress}
      text={`${progress}%`}
      styles={buildStyles({
        strokeLinecap: "square",
        pathColor: "#f6ae2d",
        textColor: "#000",
      })}
    />
  );
}
