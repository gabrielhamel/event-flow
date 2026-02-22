import { ToggleButton as PrimeReactToggleButton } from "primereact/togglebutton";

export const ToggleButton = ({
  label,
  value,
  onToggle,
}: {
  label: string;
  value: boolean;
  onToggle: (newValue: boolean) => void;
}) => (
  <PrimeReactToggleButton
    checked={value}
    onChange={(e) => onToggle(e.value)}
    className="w-full h-full"
    onLabel={label}
    offLabel={label}
    pt={{
      label: {
        className: "line-clamp-2 sm:line-clamp-3 md:line-clamp-4",
      },
    }}
  />
);
