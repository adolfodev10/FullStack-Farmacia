import { MenuVendas } from "@/components/shadcn/menu-vendas"
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react"

type Product = {
    id:number;
    name:string;
    price:number;
    description:string;
    date:string;
}

export const Vendas = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [searchText, setSearchText] = useState("")

    const [localProducts, setLocalProducts] = useState<Product[]>(products);


    useEffect(() => {
        axios.get('http://localhost:5000/api/venda')
        .then(response => {
            setProducts(response.data)
        })
        .catch(error => console.error('Erro ao buscar produtos',error))
    },[])

    
    useEffect(() => {
        setLocalProducts(products);
    }, [products]);
    const filteredProducts = localProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) 
    || product.description.toLowerCase().includes(searchText.toLowerCase())
    || product.date.toLowerCase().includes(searchText.toLowerCase())
    )


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
        <div className="overflow-x-auto">
        <div className="flex justify-end m-auto items-center">
        <h2 className="text-lg font-semibold mb-4 text-center ml-5">Produtos Vendidos</h2>
                <input
                    type="search"
                    className="border mr-4  items-center outline-none m-auto p-2 rounded-md border-gray-300 mb-4  w-60"
                    placeholder="Pesquisar Medicamentos"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            <table className="m-auto min-w-full divide-y divide-gray-200" >
                <thead className="bg-gray-200" >
                    <tr>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Preço</th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Descrição</th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Data da venda</th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Acções</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-50 divide-y items-center text-center divide-gray-200" >
                    {filteredProducts.map(p => 
                        <tr key={p.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" >{p.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.price.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.date}</td>
                            <td className="flex m-auto py-4 text-center justify-center items-center space-x-2">
                                <button
                                type="button"
                                onClick={() => handleRemoveProduct(p.id)}
                                className="bg-red-500 text-white p-1 rounded-md text-sm"
                                >
                                    <Trash2Icon className="m-auto w-5" />
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