'use client';

import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { GetMaterial } from "@/src/lib/BackendConnection"; // Assuming you have a GetMaterial function
import { Material } from "@/src/lib/definitions"; // Assuming you have a Material type defined

export default function Products({params} : {
    readonly params: {id: string}
}) {
    const [material, setMaterial] = useState<Material>();

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const materialID = params.id;
        
        if(materialID == null)
            return;

        const materialID = Number.parseInt(materialID);

        GetMaterial(materialID)
        .then((m) => {
            if(m == null) {
                // Reset or go back to the main page
            }
            else {
                // Get all data from the product
                setMaterial(m);

                // Load the elements in the site
                setIsLoaded(true);
            }
        });
        
    }, [params]);

    return <div>
        {/* Image */}
        <Skeleton isLoaded={isLoaded} className="p-3 m-2 w-full">
            <img className="w-full" alt={material?.description} src={material?.image}></img>
        </Skeleton>

        {/* Description */}
        <div className="p-5">
            <Skeleton isLoaded={isLoaded} className="text-3xl font-bold rounded-md m-2">{material?.name}</Skeleton>
        </div>

        <Skeleton isLoaded={isLoaded} className="max-h-full">
            <Accordion>
                <AccordionItem title="Description">
                    {material?.description}
                </AccordionItem>
                <AccordionItem title="Material Information">
                </AccordionItem>
                <AccordionItem title="Shipping Information">

                </AccordionItem>
                <AccordionItem title="Sustainability Information">
                    {material?.emissions} {material?.emission_unit}
                </AccordionItem>
            </Accordion>
        </Skeleton>
    </div>;
}