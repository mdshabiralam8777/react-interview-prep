import React, { useEffect, useState } from "react";

const TrafficLight: React.FC = () => {
  const colors = ["red", "yellow", "green"];
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column align-items-center bg-dark p-4 rounded">
        <h3 className="my-4 text-white">Traffic Lights</h3>
        <div
          className="rounded-circle my-1"
          style={{
            width: "100px",
            height: "100px",
            background: colors[currentIndex] === "red" ? "red" : "gray",
          }}
        ></div>
        <div
          className="rounded-circle my-1"
          style={{
            width: "100px",
            height: "100px",
            background: colors[currentIndex] === "yellow" ? "yellow" : "gray",
          }}
        ></div>
        <div
          className="rounded-circle my-1"
          style={{
            width: "100px",
            height: "100px",
            background: colors[currentIndex] === "green" ? "green" : "gray",
          }}
        ></div>
      </div>
    </div>
  );
};

export default TrafficLight;
