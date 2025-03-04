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
        <img
          src="https://storage.googleapis.com/lex_assets/loader.gif"
          alt=""
          style={{ width: 100 }}
        />
        <div className="loader-text d-none">
          {loaderConstants[currentIndex]}
        </div>
      </div>
    </>
  );
}
