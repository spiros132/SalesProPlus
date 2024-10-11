'use client';

import { useEffect, useState } from "react";
import { Dimensions } from "@/src/lib/definitions";
import { GetProduct } from "@/src/lib/BackendConnection";
import { Skeleton } from "@nextui-org/skeleton";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";

export default function Products({params} : {
    readonly params: {id: string}
}) {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [image, setImage] = useState<string>();
    const [price, setPrice] = useState<number>();
    const [stock, setStock] = useState<number>();
    const [dimensions, setDimensions] = useState<Dimensions>();
    const [safety, setSafety] = useState<string>();
    const [manuals, setManuals] = useState<string>();
    const [materials, setMaterials] = useState<string>();
    const [packaging, setPackaging] = useState<string>();
    const [category, setCategory] = useState<string>();
    const [info, setInfo] = useState<string>();
    const [designer, setDesigner] = useState<string>();

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
                setName(product.name);
                setDescription(product.info_description);
                setImage(product.image);
                setPrice(product.price);
                setStock(product.stock);
                setDimensions(product as Dimensions);
                setSafety(product.safety);
                setManuals(product.manuals);
                setMaterials(product.materials);
                setPackaging(product.packaging);
                setCategory(product.category);
                setInfo(product.info);
                setDesigner(product.designer);

                // Load the elements in the site
                setIsLoaded(true);
            }
        });
        
    }, [params]);

    return <div>
        {/* Image */}
        <Skeleton isLoaded={isLoaded} className="p-3 m-2">
            <img alt={description} src={image}></img>
        </Skeleton>

        {/* Description */}
        <div className="p-5">
            <Skeleton isLoaded={isLoaded} className="text-3xl font-bold rounded-md m-2">{name}</Skeleton>
            <Skeleton isLoaded={isLoaded} className="py-2 m-2">
                <p className="text-md">{category}, {materials}</p>
                <p className="text-md">{dimensions?.depth}x{dimensions?.width}x{dimensions?.height} cm</p>
            </Skeleton>
            <Skeleton isLoaded={isLoaded} className="m-2">
                <p className={"before:inline-block before:mr-1 before:rounded-full before:w-3 before:h-3 before:" + ((stock != null && stock > 0) ? "bg-green-500" : "bg-red-500")}>
                    {stock} in stock
                </p>
                <p className="text-xl font-bold">{price} kr</p>
            </Skeleton>
        </div>

        <Skeleton isLoaded={isLoaded} className="max-h-full">
            <Accordion>
                <AccordionItem title="Description">
                    {description}
                </AccordionItem>
                <AccordionItem title="Product Information">
                    <h2 className="text-lg font-bold">Good to know</h2>
                    <p className="text-md">{info}</p>
                    
                    <Divider className="my-2" />
                    
                    <h2 className="text-lg font-bold">Designer</h2>
                    <p className="text-md">{designer}</p>
                    
                    <Divider className="my-2" />
                    
                    <h2 className="text-lg font-bold">Packaging</h2>
                    <p className="text-md">{packaging}</p>
                </AccordionItem>
                <AccordionItem title="Manuals and Safety">
                    <h2 className="text-lg font-bold">Manual(s)</h2>
                    <p className="text-md">You can find the manual <Link href={manuals}>here</Link></p>
                    
                    <Divider className="my-2" />
                    
                    <h2 className="text-lg font-bold">Safety</h2>
                    <p className="text-md">{safety}</p>
                </AccordionItem>
            </Accordion>
        </Skeleton>
    </div>;
}