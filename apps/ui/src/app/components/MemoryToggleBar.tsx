import { useState } from "react";
import { ToggleButton } from "@/shared/components/atoms/ToggleButton";
import { Carousel } from "@/shared/components/organisms/Carousel";

const MEMORIES = [
  "1",
  "2",
  "3",
  "4",
  "un élément 5 très long mais alors vraiment long, il est si long qu'il dépasse de l'écran",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "100",
];

export const MemoryToggleBar = () => {
  const [memoryEnabled, setMemoryEnabled] = useState("1");

  return (
    <div className="h-20 md:h-24 lg:h-30 xl:h-34 2xl:h-40">
      <Carousel>
        {MEMORIES.map((memory) => (
          <div
            key={memory}
            className="h-full inline-block w-30 sm:w-40 md:w-50 px-0.5 text-wrap"
          >
            <ToggleButton
              label={memory}
              value={memory === memoryEnabled}
              onToggle={() => setMemoryEnabled(memory)}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
