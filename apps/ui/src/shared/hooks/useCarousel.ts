import { useEffect, useRef, useState } from "react";

export const useCarousel = () => {
  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!scrollableContainerRef.current) {
      return;
    }

    const position = scrollableContainerRef.current.scrollLeft;
    const pageWidth = scrollableContainerRef.current.clientWidth;

    const newPosition = position + pageWidth * (direction === "right" ? 1 : -1);

    scrollableContainerRef.current.scroll({
      behavior: "smooth",
      left: newPosition,
    });
  };

  const [scrollButtonsEnabled, setScrollButtonsEnabled] = useState({
    left: false,
    right: false,
  });

  const refreshScrollButtons = () => {
    if (!scrollableContainerRef.current) {
      return;
    }

    const position = scrollableContainerRef.current.scrollLeft;
    const pageWidth = scrollableContainerRef.current.clientWidth;
    const totalWidth = scrollableContainerRef.current.scrollWidth;

    const hasReachStart = position <= 0;
    const hasReachEnd = position + pageWidth >= totalWidth;

    setScrollButtonsEnabled({
      left: !hasReachStart,
      right: !hasReachEnd,
    });
  };

  useEffect(() => {
    refreshScrollButtons();
  }, []);

  return {
    refreshScrollButtons,
    scrollButtonsEnabled,
    scrollCarousel,
    scrollableContainerRef,
  };
};
