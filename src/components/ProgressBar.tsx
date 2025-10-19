import React, { useEffect, useState } from "react";

const ProgressBar: React.FC = () => {
  const [progressWidth, setProgressWidth] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgressWidth((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <h3>Progress Bar</h3>
      <div
        className="progress-bar rounded mt-4 py-3"
        style={{
          height: "15px",
          border: "1px solid black",
          background: "#000000",
          color: "#FFFFFF",
          width: `${progressWidth}%`,
        }}
      >
        {progressWidth}%
      </div>
    </>
  );
};

export default ProgressBar;
