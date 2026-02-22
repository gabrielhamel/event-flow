import { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleOnResize = () => {
      setScreenSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleOnResize);

    return () => {
      window.removeEventListener("resize", handleOnResize);
    };
  }, []);

  return screenSize;
};
