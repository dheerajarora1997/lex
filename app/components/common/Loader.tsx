import { useEffect, useState } from "react";
import { loaderConstants } from "../../constants/loaderConstants";

export default function Loader() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === loaderConstants.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [loaderConstants]);

  return (
    <>
      <div className="backdrop">
        <div className="loader-text">{loaderConstants[currentIndex]}</div>
        <svg
          className="d-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          width="40"
          height="40"
          style={{
            shapeRendering: "auto",
            display: "block",
          }}
        >
          <g data-idx="1">
            <circle
              strokeDasharray="164.93361431346415 56.97787143782138"
              r="35"
              strokeWidth="10"
              stroke="#ffffff"
              fill="none"
              cy="50"
              cx="50"
              data-idx="2"
              transform="matrix(0.9510565162951535,-0.3090169943749477,0.3090169943749477,0.9510565162951535,-13.00367553350506,17.89802390398971)"
            ></circle>
            <g data-idx="4"></g>
          </g>
        </svg>
      </div>
    </>
  );
}
