import { FC, Fragment } from "react";
import cn from "classnames";
import { Listbox } from "@headlessui/react";

import Chevron from "src/icons/Chevron";

type ListBoxValue = {
  id: string;
  label: string;
};

type Props = {
  label: string;
  values: ListBoxValue[];
  selectedValues: ListBoxValue[];
  setSelectedValues: (values: never[]) => void;
  multiple?: boolean | undefined;
};

const ListBoxFilter: FC<Props> = ({ label, values, selectedValues, setSelectedValues, multiple }) => {
  return (
    <div className="flex flex-col">
      <label className="text-light-purple/66 text-xs-upper mb-3.5">{label}</label>
      <Listbox value={selectedValues} onChange={setSelectedValues} multiple={multiple}>
        {({ open }) => (
          <div className="relative flex flex-col">
            <Listbox.Button className="w-full">
              <div
                className={cn(
                  "w-full h-[40px] flex flex-row items-center border border-light-purple/20 leading-[40px] bg-black/66 backdrop-blur-[10px]",
                  open && "border-b-0"
                )}
              >
                <div className="ml-4 flex-grow line-clamp-2 text-start text-xs uppercase">
                  {selectedValues.length === 0 ? "All" : selectedValues.map(value => value.label).join(", ")}
                </div>
                <div className="w-[12px] mx-4">
                  <Chevron size={12} className="fill-white rotate-90" />
                </div>
              </div>
            </Listbox.Button>
            <Listbox.Options>
              <div className="absolute z-30 w-full border border-light-purple/20 border-t-0 bg-black/66 backdrop-blur-[10px]">
                {values.map(value => (
                  <Listbox.Option key={value.id} value={value} as={Fragment}>
                    {({ active, selected }) => (
                      <div
                        className={cn(
                          "px-4 h-[40px] flex flex-row items-center text-xs uppercase cursor-pointer",
                          selected ? "bg-white/20 text-white" : active ? "bg-white/10 text-white/80" : "text-white/50"
                        )}
                      >
                        {value.label}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </div>
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default ListBoxFilter;
