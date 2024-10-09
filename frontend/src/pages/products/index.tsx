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
        
        const productID = Number.parseInt(paramsProductID);

        GetProduct(productID)
        .then((product) => {
            if(product == null) {
            }
            else {
                setName(product.name);
                setDescription(product.info_description);
                setImage("");
                setPrice(product.price);
                setStock(product.price);
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
            <h1 className="text-3xl font-bold">{name}</h1>
            <div className="py-2">
                <p className="text-sm">{description}</p>
                <p className="text-sm">{dimensions?.depth}x{dimensions?.width}x{dimensions?.height} cm</p>
            </div>
            { GetStock(stock) }
            <p className="text-xl font-bold">{price} :-</p>
        </div>
    </div>;
}