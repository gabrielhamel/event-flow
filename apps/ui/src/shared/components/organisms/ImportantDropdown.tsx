import { type ReactNode, useRef } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useScreenSize } from "@/shared/hooks/useScreenSize";

export interface ImportantDropdownOption {
  value: string;
  label: string;
}

export const ImportantDropdown = <Option extends ImportantDropdownOption>({
  options,
  value,
  onSelect,
  onCreate,
  createLabel,
  itemTemplate,
}: {
  options: Option[];
  value: Option["value"];
  onSelect: (value: Option["value"]) => void;
  onCreate: () => void;
  createLabel: string;
  itemTemplate: (option: Option) => ReactNode;
}) => {
  const screen = useScreenSize();
  const ref = useRef<Dropdown>(null);

  const handleOnCreate = () => {
    ref.current?.hide();
    onCreate();
  };

  return (
    <Dropdown
      ref={ref}
      className="max-w-72 noShadow noBackground noBorder"
      options={options}
      value={value}
      onChange={(e: { value: Option["value"] }) => onSelect(e.value)}
      valueTemplate={({ label }: Option) => (
        <div className="flex items-center gap-2">
          <span className="pi pi-user" />
          <div
            data-testid="profile-selected-name"
            className="flex-1 text-ellipsis overflow-hidden"
          >
            {label}
          </div>
        </div>
      )}
      highlightOnSelect={false}
      dropdownIcon={<></>}
      collapseIcon={<></>}
      scrollHeight={`${screen.height / 2}px`}
      panelFooterTemplate={() => (
        <Button
          label={createLabel}
          className="w-full"
          size="small"
          onClick={handleOnCreate}
        />
      )}
      itemTemplate={itemTemplate}
    />
  );
};
