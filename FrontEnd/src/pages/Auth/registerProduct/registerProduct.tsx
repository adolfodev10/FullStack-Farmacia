import axios from "axios";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";


type Product = {
    id: number;
    name: string;
    price: number;
    quantity:number;
    description: string;
};

type ListProductProps = {
    products: Product[];
    onUpdate: () => void;
}


export const ProductRegister = ({ products, onUpdate }: ListProductProps) => {
    const [localProducts, setLocalProducts] = useState<Product[]>(products);
    // const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [, setProduts] = useState<Product[]>([])
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState<number | null>(null);
    const [editQuantity, setEditQuantity] = useState<number | null>(null)
    const [editDescription, setEditDescription] = useState("");

    useEffect(() => {
        setLocalProducts(products)
        onUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    useEffect(() => {
        axios.get('http://localhost:5000/api/registerProduct')
            .then(response => setProduts(response.data))
            .catch(error => console.error(error));
    }, [])

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/registerProduct/${id}`)
            onUpdate()
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = (product: Product) => {
        setProductToEdit(product)
        setEditName(product.name)
        setEditPrice(product.price)
        setEditQuantity(product.quantity)
        setEditDescription(product.description)
        setIsEditModalOpen(true);
    }

    const handleSaveEdit = async () => {
        if (productToEdit) {
            try {
                await axios.put(`http://localhost:5000/api/registerProduct/${productToEdit.id}`, {
                    name: editName,
                    price: editPrice,
                    quantity:editQuantity,
                    description: editDescription
                })
                onUpdate()
                setIsEditModalOpen(false)
            } catch (error) {
                console.error("Erro ao atualizar: ",error)
            }
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
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'  >{p.name}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' >{p.price}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' >{p.description}</td>
                        <td className="flex m-auto py-4 text-center justify-center items-center space-x-2" >
                            <button
                                onClick={() => handleEdit(p)}
                                title="Editar"
                                className="bg-yellow-500 text-white p-1 rounded-md text-sm"
                            >
                                <EditIcon className="w-5 m-auto" />
                            </button>
                            <button
                                type="button"
                                title="Eliminar"
                                className="bg-red-500 text-white p-1 rounded-md text-sm"
                                onClick={() => handleDelete(p.id)}
                            >
                                <Trash2Icon className="w-5 m-auto" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>

            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md">
                        <h2 className="text-lg font-semibold mb-4">Editar Produto</h2>
                        <input
                            className="border p-2 mb-2 w-full"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Nome"
                        />
                        <input
                            className="border p-2 mb-2 w-full"
                            value={editPrice || ""}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            placeholder="Preço"
                            type="number"

                        />
                        <input
                            className="border p-2 mb-2 w-full"
                            value={editDescription || ""}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Descrição"

                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    handleSaveEdit()
                                    // setIsEditModalOpen(false)
                                }
                                }
                                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </table>

    )
} 