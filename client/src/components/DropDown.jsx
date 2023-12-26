import { useState } from "react";
import { cn } from "@/lib/utils.js";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command.jsx";
import PropTypes from "prop-types";

const DropDown = ({ data, placeholder, value, setValue, widthInPx }) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[${widthInPx}px] justify-between`}
        >
          {value ? data.find((data) => data.value === value)?.label : `Select a ${placeholder}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[${widthInPx}px] border-background p-0`}>
        <Command>
          <CommandInput
            placeholder={`Search a ${placeholder}`}
            parentClassName={"border-background"}
          />
          <CommandEmpty>{"No results found."}</CommandEmpty>
          <CommandGroup>
            {data.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
                className={"aria-selected:bg-background"}
              >
                <Check
                  className={cn("mr-2 h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

DropDown.propTypes = {
  data: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  setValue: PropTypes.func.isRequired,
  widthInPx: PropTypes.number.isRequired
};

export default DropDown;
