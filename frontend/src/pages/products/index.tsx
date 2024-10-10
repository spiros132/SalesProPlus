import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Dimensions, Product } from "@/src/lib/definitions";
import { GetProduct } from "@/src/lib/BackendConnection";

export default function Products() {
    const searchParams = useSearchParams();
    console.log(searchParams);

    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [image, setImage] = useState<string>();
    const [price, setPrice] = useState<number>();
    const [stock, setStock] = useState<number>();
    const [dimensions, setDimensions] = useState<Dimensions>();
    
    function GetStock(stock: number | undefined) {
        if(stock == undefined)
            return <></>;
        else {
            return <p className={"before:inline-block before:mr-1 before:rounded-full before:w-3 before:h-3 before:" + ((stock > 0) ? "bg-green-500" : "bg-red-500")}>
                    {stock} in stock
                </p>;
        }
    }

    useEffect(() => {
        // Check if the useeffect change is because searchparams exist
        if(!searchParams)
            return;

        const paramsProductID = searchParams.get("id");
        
        if(paramsProductID == null)
            return;

        const productID = Number.parseInt(paramsProductID);

        GetProduct(productID)
        .then((product) => {
            if(product == null) {
                // Reset or go back to the main page
            }
            else {
                setName(product.name);
                setDescription(product.info_description);
                setImage(product.image);
                setPrice(product.price);
                setStock(product.stock);
                setDimensions(product as Dimensions);
            }
        });
        
    }, [searchParams]);

    return <div>
        {/* Image */}
        <div className="p-5">
            <img src={image}></img>
        </div>

        {/* Description */}
        <div className="p-5">
            <h1 className="text-3xl font-bold mx-auto">{name}</h1>
            <div className="py-2">
                <p className="text-md">{description}</p>
                <p className="text-md">{dimensions?.depth}x{dimensions?.width}x{dimensions?.height} cm</p>
            </div>
            <p className={"before:inline-block before:mr-1 before:rounded-full before:w-3 before:h-3 before:" + ((stock != null && stock > 0) ? "bg-green-500" : "bg-red-500")}>
                {stock} in stock
            </p>
            <p className="text-xl font-bold">{price} kr</p>
        </div>
    </div>;
}