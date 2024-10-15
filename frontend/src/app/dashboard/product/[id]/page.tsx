'use client';

import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";

import { Dimensions, Product_Long } from "@/src/lib/definitions";
import { GetProduct } from "@/src/lib/BackendConnection";
import Questions from "./_productComponents/questions";

export default function Products({params} : {
    readonly params: {id: string}
}) {
    const [product, setProduct] = useState<Product_Long>();
    const [dimensions, setDimensions] = useState<Dimensions>();

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const paramsProductID = params.id;
        
        if(paramsProductID == null)
            return;

        const productID = Number.parseInt(paramsProductID);

        GetProduct(productID)
        .then((product) => {
            if(product == null) {
                // Reset or go back to the main page
            }
            else {
                // Get all data from the product
                setProduct(product);
                setDimensions(product as Dimensions);

                // Load the elements in the site
                setIsLoaded(true);
            }
        });
        
    }, [params]);

    return <div>
        {/* Image */}
        <Skeleton isLoaded={isLoaded} className="p-3 m-2">
            <img alt={product?.description} src={product?.image}></img>
        </Skeleton>

        {/* Description */}
        <div className="p-5">
            <Skeleton isLoaded={isLoaded} className="text-3xl font-bold rounded-md m-2">{product?.name}</Skeleton>
            <Skeleton isLoaded={isLoaded} className="py-2 m-2">
                <p className="text-md">{product?.category}, {product?.materials}</p>
                <p className="text-md">{dimensions?.depth}x{dimensions?.width}x{dimensions?.height} cm</p>
            </Skeleton>
            <Skeleton isLoaded={isLoaded} className="m-2">
                <p className={"before:inline-block before:mr-1 before:rounded-full before:w-3 before:h-3 before:" + ((product?.stock != null && product?.stock > 0) ? "bg-green-500" : "bg-red-500")}>
                    {product?.stock} in stock
                </p>
                <p className="text-xl font-bold">{product?.price} kr</p>
            </Skeleton>
        </div>

        <Skeleton isLoaded={isLoaded} className="max-h-full">
            <Accordion>
                <AccordionItem title="Description">
                    {product?.description}
                </AccordionItem>
                <AccordionItem title="Product Information">
                    <h2 className="text-lg font-bold">Good to know</h2>
                    <p className="text-md">{product?.info}</p>
                    
                    <Divider className="my-2" />
                    
                    <h2 className="text-lg font-bold">Designer</h2>
                    <p className="text-md">{product?.designer}</p>
                    
                    <Divider className="my-2" />
                    
                    <h2 className="text-lg font-bold">Packaging</h2>
                    <p className="text-md">{product?.packaging}</p>
                </AccordionItem>
                <AccordionItem title="Manuals and Safety">
                    <h2 className="text-lg font-bold">Manual(s)</h2>
                    <p className="text-md">You can find the manual <Link href={product?.manuals}>here</Link></p>
                    
                    <Divider className="my-2" />
                    
                    <h2 className="text-lg font-bold">Safety</h2>
                    <p className="text-md">{product?.safety}</p>
                </AccordionItem>
                <AccordionItem title="Q&A">
                    <Questions productID={product?.articleID}></Questions>
                </AccordionItem>
            </Accordion>
        </Skeleton>
    </div>;
}