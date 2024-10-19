'use client';

import { Filter } from "@/src/lib/definitions";
import FilterComponent from "./filter";
import "../../../../styles/scrollbar.css";

export default function FiltersComponent({
    addFilter,
    removeFilter
}: {
    readonly addFilter: (Filter: Filter)=>void,
    readonly removeFilter: (name: string)=>void
}) {
    return (
        <div className="flex flex-row space-x-2 overflow-x-auto scrollbar-show p-2 m-4">
            <FilterComponent 
            name="Price" minValue={0} maxValue={10000} 
            options={{style:"currency", currency:"SEK"}}
            addFilter={addFilter} removeFilter={removeFilter}
            />

            <FilterComponent
            name="Width" minValue={0} maxValue={1000}
            options={{style:"unit", unit:"centimeter"}}
            addFilter={addFilter} removeFilter={removeFilter}
            />
            
            <FilterComponent 
            name="Height" minValue={0} maxValue={1000}
            options={{style:"unit", unit:"centimeter"}}
            addFilter={addFilter} removeFilter={removeFilter}
            />
            
            <FilterComponent
            name="Depth" minValue={0} maxValue={1000}
            options={{style:"unit", unit:"centimeter"}}
            addFilter={addFilter} removeFilter={removeFilter}
            />

            <FilterComponent
            name="Length" minValue={0} maxValue={1000}
            options={{style:"unit", unit:"centimeter"}}
            addFilter={addFilter} removeFilter={removeFilter}
            />

        </div>
    );
}