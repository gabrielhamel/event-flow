import { useState } from "react";
import { ToggleButton } from "@/shared/components/atoms/ToggleButton";
import { ResponsiveGrid } from "@/shared/components/organisms/ResponsiveGrid";

const STOPS = [
  { id: "1", name: "Principal 8′" },
  { id: "2", name: "Bourdon 16′" },
  { id: "3", name: "Flûte à cheminée 4′" },
  {
    id: "4",
    name: "A big long text here, it's a very long text, very very very long not enough apparently A big long text here, it's a very long text, very very very long not enough apparently A big long text here, it's a very long text, very very very long not enough apparently",
  },
  { id: "5", name: "Doublette 2′" },
  { id: "6", name: "Fourniture IV" },
  { id: "7", name: "Cymbale III" },
  { id: "8", name: "Trompette 8′" },
  { id: "9", name: "Clairon 4′" },
  { id: "10", name: "Cornet V" },
  { id: "11", name: "Nazard 2 2/3′" },
  { id: "12", name: "Tierce 1 3/5′" },
  { id: "13", name: "Quarte de Nazard 1 1/3′" },
  { id: "14", name: "Voix céleste 8′" },
  { id: "15", name: "Salicional 8′" },
  { id: "16", name: "Flûte traversière 8′" },
  { id: "17", name: "Basson 16′" },
  { id: "18", name: "Hautbois 8′" },
  { id: "19", name: "Viole de gambe 8′" },
  { id: "20", name: "Tremblant" },
];

const StopToggle = ({ name }: { name: string }) => {
  const [stopEnabled, setStopEnabled] = useState(false);

  return (
    <div className="h-20 md:h-24 lg:h-30 xl:h-34 2xl:h-40">
      <ToggleButton
        label={name}
        value={stopEnabled}
        onToggle={setStopEnabled}
      />
    </div>
  );
};

export const StopToggleGrid = () => (
  <ResponsiveGrid>
    {STOPS.map((stop) => (
      <StopToggle key={stop.id} name={stop.name} />
    ))}
  </ResponsiveGrid>
);
