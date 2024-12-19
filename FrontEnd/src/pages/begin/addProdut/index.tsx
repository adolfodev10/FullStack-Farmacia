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

type FormData = {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    clientId: number;
};

type ListProductProps = {
    products: Product[];
    onUpdate: () => void;
};

export const Begin = ({ products, onUpdate }: ListProductProps) => {
    const { handleSubmit, reset } = useForm<FormData>();
    const [localProducts, setLocalProducts] = useState<Product[]>(products);
    const [searchText, setSearchText] = useState("")
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para modal de edição
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [, setProdutos] = useState<Product[]>([]);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null)
    const [editedName, setEditedName] = useState("")
    const [editedPrice, setEditedPrice] = useState<number | null>(null)
    const [editedQuantity, setEditedQuantity] = useState<number | null>(null)
    const [editedDescription, setEditedDescription] = useState("")

    useEffect(() => {
        setLocalProducts(products);
    }, [products]);
    const filteredProducts = localProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) || product.description.toLowerCase().includes(searchText.toLowerCase())
    )

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        axios.get("http://localhost:5000/api/registerProduct")
            .then(response => setProdutos(response.data))
            .catch(error => console.error(error));
    }, [])


    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/registerProduct/${id}`);
            onUpdate();
        } catch (error) {
            console.error(error);
            console.log("Erro na função")
        }
    };

    const handleEdit = (prod: Product) => {
        setProductToEdit(prod)
        setEditedName(prod.name)
        setEditedPrice(prod.price)
        setEditedQuantity(prod.quantity)
        setEditedDescription(prod.description)
        setIsEditModalOpen(true);
    }

    const handleSaveEdit = async () => {
        if (productToEdit) {
            try {
                await axios.put(`http://localhost:5000/api/registerProduct/${productToEdit.id}`, {
                    nameProduct: editedName,
                    price: editedPrice,
                    quantity: editedQuantity,
                    description: editedDescription,
                });
                onUpdate()
                setIsEditModalOpen(false);
            } catch (error) {
                alert("Erro ao atualizar produto");
            }
        }
    };


    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/venda");
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao listar Produtos", error);
        }
    };


    const handleModalVender = (prod: Product) => {
        setSelectedProduct(prod);
        setIsProductModalOpen(true);
    };


    const onSubmit = async () => {
        if (!selectedProduct) return;
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const newQuantity = selectedProduct.quantity - 1;

            await axios.post("http://localhost:5000/api/venda", {
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity: 1,
                description: selectedProduct.description,
            });
            toast.success("Produto vendido com sucesso!");

            if (newQuantity < 0) {
                toast.error("Não existe mais este produto!");
                setIsProductModalOpen(false);
                return
            }
            if (newQuantity <= 0) {
                await axios.delete(`http://localhost:5000/api/registerProduct/${selectedProduct.id}`);
                toast.error("Produtos Esgotado e removido do estoque!")
                setLocalProducts((prev) => prev.filter((prod) => prod.id !== selectedProduct.id))
            }
            else {
                await axios.put(`http://localhost:5000/api/registerProduct/${selectedProduct.id}`, {
                    ...selectedProduct,
                    quantity: newQuantity,
                })
                setLocalProducts((prev) =>
                    prev.map((prod) =>
                        prod.id === selectedProduct.id ? { ...prod, quantity: newQuantity } : prod
                    )
                )
            }
            reset();
            setIsProductModalOpen(false);
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message || "Erro ao vender Produto");
            } else {
                console.error("Erro ao vender produto", error);
            }
        }
    };






    return (
        <div className="overflow-x-auto">
            <div className="flex flex-wrap justify-end m-auto items-center mb-4">
                <input
                    type="search"
                    className="border p-2 rounded-md border-gray-300 w-full max-w-xs sm:w-60  outline-none m-auto"
                    placeholder="Pesquisar Medicamentos"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Nome</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Preço</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Quantidade</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Descrição</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y text-center divide-gray-200">
                    {filteredProducts.map((p) => (
                        <tr key={p.id}>
                            <td className="px-4 py-2 text-xs font-medium text-gray-900">{p.name}</td>
                            <td className="px-4 py-2 text-xs text-gray-500">{p.price || "Não tem preço"}</td>
                            <td className="px-4 py-2 text-xs text-gray-500">{p.quantity || 1}</td>
                            <td className="px-4 py-2 text-xs text-gray-500">{p.description}</td>
                            <td className="px-4 py-2 text-xs text-gray-500 flex justify-center space-x-2">
                                <button
                                    className="bg-green-500 text-white p-1 rounded-md text-sm"
                                    onClick={() => handleModalVender(p)}
                                >
                                    Vender
                                </button>
                                <button
                                    title="Editar"
                                    className="bg-yellow-500 text-[10px] text-white p-1 rounded-md"
                                    onClick={() => handleEdit(p)}
                                >
                                    <Edit2Icon className="w-5 h-5" />
                                </button>
                                <button
                                    title="Eliminar"
                                    className="bg-red-500 text-[10px] text-white p-1 rounded-md text-sm"
                                    onClick={() => handleDelete(p.id)}
                                >
                                    <Trash2Icon className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {/* Modal de venda */}
            {isProductModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="p-6 shadow-lg -mt-14 transition-all w-11/12 max-w-md mx-auto bg-white rounded-lg">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 md:gap-8 p-4 md:p-6">
                            <div className="flex gap-4 md:gap-6">
                                <div className="block justify-around gap-2">
                                    <h1 className="block gap-2 m-auto">
                                        <span className="font-bold"> Nome do Produto: </span>
                                        {selectedProduct?.name}
                                    </h1>
                                    <h1 className="block gap-2 m-auto">
                                        <span className="font-bold"> Preço: </span>
                                        {selectedProduct?.price}
                                    </h1>
                                    <h1 className="block gap-2 m-auto">
                                        <span className="font-bold"> Quantidade: </span>
                                        {selectedProduct?.quantity}
                                    </h1>
                                    <h1 className="block gap-2 m-auto">
                                        <span className="font-bold"> Descrição: </span>
                                        {selectedProduct?.description}
                                    </h1>
                                </div>
                            </div>
                            <div className="flex flex-col justify-end md:flex-row gap-4 md:gap-6">
                                <button
                                    type="submit"
                                    className="w-full md:w-1/2 p-2 border-none hover:scale-105 transition-all rounded-md bg-green-700 text-white cursor-pointer"
                                >
                                    Vender
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsProductModalOpen(false)}
                                    className="w-full md:w-1/2 p-2 border-none hover:scale-105 transition-all inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de edição */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="p-6 shadow-lg -mt-14 transition-all w-11/12 max-w-md bg-white rounded-lg">
                        <form className="flex flex-col gap-6 md:gap-8 p-4 md:p-6">
                            <h2 className="text-xl font-bold text-center">Editar Produto</h2>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="nameProduct" className="block text-sm font-medium text-gray-700">
                                        Nome do Produto
                                    </label>
                                    <input
                                        type="text"
                                        id="nameProduct"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Preço
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        value={editedPrice || 150}
                                        onChange={(e) => setEditedPrice(Number(e.target.value))}
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                        Quantidade
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        value={editedQuantity || 1}
                                        onChange={(e) => setEditedQuantity(Number(e.target.value))}
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Descrição
                                    </label>
                                    <input
                                        type="text"
                                        id="description"
                                        value={editedDescription}
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-end md:flex-row gap-4 md:gap-6">
                                <button
                                    onClick={() => {
                                        handleSaveEdit()
                                        setIsEditModalOpen(false)
                                    }
                                    }
                                    className="w-full md:w-1/2 p-2 border-none hover:scale-105 transition-all rounded-md bg-blue-700 text-white cursor-pointer"
                                >
                                    Salvar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="w-full md:w-1/2 p-2 border-none hover:scale-105 transition-all inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
