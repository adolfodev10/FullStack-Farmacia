import { MenuVendas } from "@/components/shadcn/menu-vendas"
import axios from "axios";
import { useEffect, useState } from "react"

type Product = {
    id:number;
    nameProduct:string;
    price:number;
    description:string;
    date:string;
}
export const Vendas = () => {
    const [products, setProducts] = useState<Product[]>([])
   

    useEffect(() => {
        axios.get('http://localhost:5000/api/venda')
        .then(response => {
            setProducts(response.data)
        })
        .catch(error => console.error('Erro ao buscar produtos',error))
    },[])


    const handleRemoveProduct = async (id:number) => {
        try {
            await axios.delete(`http://localhost:5000/api/venda/${id}`)
            const updateProducts = products.filter(p => p.id !== id)
            setProducts(updateProducts)
        } catch (error) {
            console.error('Erro ao eliminar produto')
        }
    }
    return(
        <>
        <MenuVendas />
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
            <h2 className="text-lg font-semibold mb-4 text-center">Produtos Vendidos</h2>
            <table className="min-w-full divide-y divide-gray-200" >
                <thead className="bg-gray-100" >
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data da venda</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acções</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" >
                    {products.map(p => 
                        <tr key={p.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" >{p.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" >{p.nameProduct}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.price.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.date}</td>
                            <td className="flex m-auto py-4 text-center justify-center items-center space-x-2">
                                <button
                                type="button"
                                onClick={() => handleRemoveProduct(p.id)}
                                className="bg-red-500 text-white p-1 rounded-md text-sm"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </>
    )
}