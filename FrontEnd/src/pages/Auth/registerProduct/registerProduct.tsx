import axios from "axios";
import { useEffect, useState } from "react";


type Product = {
    id:number;
    nameProduct: string;
    price: number;
    description: string;
};

type ListProductProps = {
    products: Product[];
    onUpdate: () => void;
}


export const ProductRegister = ({products, onUpdate}:ListProductProps) => {
    const [localProducts, setLocalProducts] = useState<Product[]>(products);
    const [produtos, setProduct] = useState<Product[]>([]);

    useEffect(() => {
        setLocalProducts(products)
    },[products])
    console.log(produtos)

    useEffect(() => {
        axios.get('http://localhost:5000/api/registerProduct')
        .then(response => setProduct(response.data))
        .catch(error => console.error(error))
    },[])


    const handleDelete = async (id:number) => {
        try {
            await axios.delete(`http://localhost:5000/api/registerProduct/${id}`)
            onUpdate()
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <table className="min-w-full divide-y divide-gray-200" >
        <thead className="bg-gray-100">
            <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" >Nome</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" >Preço</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" >Descrição</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" >Acções</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y items-center text-center divide-gray-200" >
            {localProducts.map(p => (
                <tr key={p.id} >
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'  >{p.nameProduct}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' >{p.price}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' >{p.description}</td>
                    <td className="flex m-auto py-4 text-center justify-center items-center space-x-2" >
                        <button 
                        className="bg-yellow-500 text-white p-1 rounded-md text-sm"
                        >Editar</button>
                        <button
                        type="button"
                        className="bg-red-500 text-white p-1 rounded-md text-sm"
                        onClick={() => handleDelete(p.id)}
                        >Eliminar</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    )
} 