import type { ReactNode } from "react";
import { Button } from "primereact/button";
import { useCarousel } from "@/shared/hooks/useCarousel";

export const Carousel = ({ children }: { children: ReactNode }) => {
  const {
    scrollButtonsEnabled,
    scrollCarousel,
    scrollableContainerRef,
    refreshScrollButtons,
  } = useCarousel();

  return (
    <div className="flex gap-0.5 h-full">
      <Button
        icon="pi pi-arrow-left"
        className="min-w-10 noShadow"
        onClick={() => scrollCarousel("left")}
        disabled={!scrollButtonsEnabled.left}
      />
      <div
        ref={scrollableContainerRef}
        onScroll={refreshScrollButtons}
        className="overflow-x-scroll h-full whitespace-nowrap flex-1 scrollbar-hidden"
      >
        {children}
      </div>
      <Button
        icon="pi pi-arrow-right"
        className="min-w-10 noShadow"
        onClick={() => scrollCarousel("right")}
        disabled={!scrollButtonsEnabled.right}
      />
    </div>
  );
};
