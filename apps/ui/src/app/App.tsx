import { MemoryToggleBar } from "@/app/components/MemoryToggleBar";
import { StopToggleGrid } from "@/app/components/StopToggleGrid";
import { AppToolbar } from "@/app/components/Toolbar/AppToolbar";

export const App = () => (
  <div className="h-dvh">
    <div className="flex flex-col gap-1 h-full">
      <AppToolbar />
      <div className="flex-1">
        <StopToggleGrid />
      </div>
      <MemoryToggleBar />
    </div>
  </div>
);
