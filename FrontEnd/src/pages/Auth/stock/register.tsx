import axios from "axios";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Product = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
};

type ListProductProps = {
    products: Product[];
    onUpdate: () => void;
}

type FormData = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
}

export const RegisterStock = ({ products, onUpdate }: ListProductProps) => {
    const { reset, handleSubmit} = useForm<FormData>();
    const [localProducts, setLocalProducts] = useState<Product[]>(products);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState<number | null>(null);
    const [editQuantity, setEditQuantity] = useState<number | null>(null)
    const [editDescription, setEditDescription] = useState("");
    const [, setProduct] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/registerProduct");
            setProduct(response.data);
        }
        catch (error) {
            console.log('Erro ao listar produtos', error);
        }
    }


    useEffect(() => {
        fetchProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        setLocalProducts(products);
        onUpdate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/stock/${id}`);
            toast.success("Produto removido com sucesso!")
            onUpdate();
        } catch (error) {
            console.error("Erro ao remover produto",error);
        }
    };

    const handleEdit = (product: Product) => {
        setProductToEdit(product);
        setEditName(product.name);
        setEditPrice(product.price);
        setEditQuantity(product.quantity)
        setEditDescription(product.description);
        setIsEditModalOpen(true);
    };



    const onSubmit = async (product:Product) => {
        try {
            const newQuantity = product.quantity - 1;

            if(newQuantity <= 0) {
                await axios.delete(`http://localhost:5000/api/stock/${product.id}`)
                toast.success("Produto esgotado e removido do estoque!")
            }
            else{
                await axios.put(`http://localhost:5000/api/stock/${product.id}`,{
                    ...product,
                    quantity: newQuantity,
                })
                // toast.success("Produto actualizado com sucesso!")
            }
            onUpdate();
            const payload = {
                id:product.id,
                name:product.name,
                price:product.price,
                quantity:product.quantity,
                description:product.description,
            }
            await axios.post(`http://localhost:5000/api/registerProduct`, payload)
            toast.success("Produto Adicionado com sucesso!")
            reset()
            await fetchProducts()
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message || "Erro ao adicionar produto na farmácia");
            }
            else {
                console.error("Erro ao colocar produto na farmácia: ", error)
            }
        }
    }

    const handleSaveEdit = async () => {
        if (productToEdit) {
            try {
                await axios.put(`http://localhost:5000/api/stock/${productToEdit.id}`, {
                    name: editName,
                    price: editPrice,
                    quantity: editQuantity,
                    description: editDescription
                });
                onUpdate();
                setIsEditModalOpen(false);
            } catch (error) {
                console.error(error);
            }
        }
    };


    return (
        <div className="overflow-x-auto">
            <h2 className="text-xs mb-4">Produtos em Estoque</h2>
            <table className="min-w-full divide-y gap-3 divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {localProducts.map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.price} KZ</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap flex">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <button
                                        type="button"
                                        onClick={()=>onSubmit(product)}
                                        className="text-white bg-green-500 rounded-md p-1 mr-2"
                                    >
                                        Colocar na Farmácia
                                    </button>
                                    </form>
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="text-white bg-yellow-500 rounded-md p-1 mr-2"
                                >
                                    <Edit2Icon className="m-auto w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-white bg-red-500 rounded-md p-1 mr-2"
                                >
                                    <Trash2Icon className="m-auto w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
                            value={editPrice || 100}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            placeholder="Preço"
                            type="number"
                        />
                          <input
                            className="border p-2 mb-2 w-full"
                            value={editQuantity || ""}
                            onChange={(e) => setEditQuantity(Number(e.target.value))}
                            placeholder="Descrição"
                        />
                        <input
                            className="border p-2 mb-2 w-full"
                            value={editDescription}
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
                                    setIsEditModalOpen(false)
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
        </div>
    );
};
