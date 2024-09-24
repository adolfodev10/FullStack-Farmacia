import axios from "axios";
import { useEffect, useState } from "react";
import { BeginMenu } from "@/components/shadcn/platform/menu";
import { Begin } from "./addProdut";

type Product = {
    id:number;
    nameProduct:string;
    price:number;
    description:string;
    date:string;
}

export const BeginPage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/registerProduct");
            setProducts(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos', error);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <>
            <BeginMenu />
                <Begin products={products} onUpdate={fetchProducts} />
        </>
    );
}
