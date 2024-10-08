import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { dimensions, Product } from "@/src/lib/definitions";
import { products } from "@/src/lib/fakeDB";
import { CheckBackend } from "@/src/lib/BackendConnection";

export default function Products() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [image, setImage] = useState<string>();
    const [price, setPrice] = useState<number>();
    const [stock, setStock] = useState<number>();
    const [dimensions, setDimensions] = useState<dimensions>();
    
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
        CheckBackend().then((b) => {
            console.log(b);
        });

        const productID = searchParams?.get("id");
        
        // Check that there is a productID and that it is an integer
        if(productID === null || !Number.parseInt(productID)) {
            // Navigate to the home page
            router.push("/");
            return;
        }

        // Get all the product information from the database
        const product: Product | undefined = products.find((product: Product) => product.id == Number.parseInt(productID));
        
        // If the productID doesn't exist in our database just return to the home page
        if(product === undefined) {
            return;            
        }

        setName(product.name);
        setDescription(product.shortdescription);
        setImage(product.image);
        setPrice(product.price);
        setStock(product.stock);
        setDimensions(product.dimensions);
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
                <p className="text-sm">{dimensions?.length}x{dimensions?.width}x{dimensions?.height} cm</p>
            </div>
            { GetStock(stock) }
            <p className="text-xl font-bold">{price} :-</p>
        </div>
    </div>;
}