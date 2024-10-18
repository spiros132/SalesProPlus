import { Filter } from "@/src/lib/definitions";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Slider } from "@nextui-org/slider";
import { useState } from "react";

export default function FilterComponent({
    name,
    minValue,
    maxValue,
    options,
    addFilter,
    removeFilter
}: {
    readonly name: string,
    readonly minValue: number,
    readonly maxValue: number,
    readonly options: Intl.NumberFormatOptions | undefined,
    readonly addFilter: (filter: Filter) => void,
    readonly removeFilter: (name: string) => void
}) {
    const [currentMinValue, setCurrentMinValue] = useState<number>(minValue);
    const [currentMaxValue, setCurrentMaxValue] = useState<number>(maxValue);
    
    const minName = `min_${name.toLowerCase()}`;
    const maxName = `max_${name.toLowerCase()}`;

    function onValueChange(values: number | number[]) {
        if(Array.isArray(values)) {
            setCurrentMinValue(values[0]);
            setCurrentMaxValue(values[1]);
        }
    }

    function onValueChangeEnd(values: number | number[]) {
        if(Array.isArray(values)) {
            // If the value of the slider is the same as the minimum just remove the filter as it won't be used
            if(values[0] == minValue)
                removeFilter(minName);
            else // Otherwise add a custom filter
                addFilter({name: minName, value: values[0]});

            // If the value of the slider is the same as the maximum just remove the filter as it won't be used
            if(values[1] == maxValue)
                removeFilter(maxName);
            else // Otherwise add a custom filter
                addFilter({name: maxName, value: values[1]});
        }
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button>{name}</Button>
            </DropdownTrigger>
            <DropdownMenu closeOnSelect={false}>
                <DropdownItem textValue={name}>
                    <Slider 
                    minValue={minValue} 
                    maxValue={maxValue} 
                    label={name}
                    formatOptions={options}
                    onChange={onValueChange}
                    onChangeEnd={onValueChangeEnd}
                    value={[currentMinValue, currentMaxValue]}
                    />
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}