import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Product = {
    id: number;
    nameProduct: string;
    price: number;
    description: string;
    date: string;
};

type FormData = {
    productId: number;
    nameProduct: string;
    price: number;
    description: string;
    clientId: number;
};

type ListProductProps = {
    products: Product[];
    onUpdate: () => void;
};

export const Begin = ({ products, onUpdate }: ListProductProps) => {
    const { handleSubmit, reset, register, setValue } = useForm<FormData>();
    const [localProducts, setLocalProducts] = useState<Product[]>(products);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para modal de edição
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [produtos, setProdutos] = useState<Product[]>([]);

    // Função para buscar os produtos
    const fetchProducts = async () => {
        console.log(produtos)
        try {
            const response = await axios.get("http://localhost:5000/api/venda");
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao listar Produtos", error);
        }
    };

    useEffect(() => {
        setLocalProducts(products);
    }, [products]);

    useEffect(() => {
        fetchProducts();
    }, []);

    // Função para deletar produto
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/venda/${id}`);
            onUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    // Função para abrir modal de venda
    const handleModalVender = (prod: Product) => {
        setSelectedProduct(prod);
        setIsProductModalOpen(true);
    };

    // Função para abrir modal de edição
    const handleModalEdit = (prod: Product) => {
        setSelectedProduct(prod);
        // Preencher os valores no formulário de edição
        setValue("nameProduct", prod.nameProduct);
        setValue("price", prod.price);
        setValue("description", prod.description);
        setIsEditModalOpen(true);
    };

    // Função para lidar com a venda
    const onSubmit = async () => {
        if (!selectedProduct) return;
        try {
            await axios.post("http://localhost:5000/api/venda", {
                nameProduct: selectedProduct.nameProduct,
                price: selectedProduct.price,
                description: selectedProduct.description,
            });

            alert("Produto vendido com sucesso!");
            reset();
            await fetchProducts();
            setIsProductModalOpen(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message || "Erro ao vender Produto");
            } else {
                console.error("Erro ao vender produto", error);
            }
        }
    };

    // Função para lidar com a edição
    const onEditSubmit = async (data: FormData) => {
        if (!selectedProduct) return;

        try {
            await axios.put(`http://localhost:5000/api/venda/${selectedProduct.id}`, {
                nameProduct: data.nameProduct,
                price: data.price,
                description: data.description,
            });

            alert("Produto atualizado com sucesso!");
            reset();
            await fetchProducts();
            setIsEditModalOpen(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message || "Erro ao atualizar Produto");
            } else {
                console.error("Erro ao atualizar produto", error);
            }
        }
    };

    return (
        <div className="overflow-x-auto animate-fadeIn">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y items-center text-center divide-gray-200">
                    {localProducts.map((p) => (
                        <tr key={p.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.nameProduct}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.price || "Não tem preço"}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.description}</td>
                            <td className="flex m-auto py-4 text-center justify-center items-center space-x-2">
                                <button
                                    type="button"
                                    className="bg-green-500 text-white p-1 rounded-md text-sm"
                                    onClick={() => handleModalVender(p)}
                                >
                                    Vender
                                </button>
                                <button
                                    type="button"
                                    className="bg-yellow-500 text-white p-1 rounded-md text-sm"
                                    onClick={() => handleModalEdit(p)}
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 text-white p-1 rounded-md text-sm"
                                    onClick={() => handleDelete(p.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de venda */}
            {isProductModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="p-6 shadow-lg -mt-14 transition-all w-11/12 max-w-md mx-auto bg-white rounded-lg">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 md:gap-8 p-4 md:p-6">
                            <div className="flex gap-4 md:gap-6">
                                <div className="block justify-around gap-2">
                                    <h1 className="block gap-2 m-auto">
                                        <span className="font-bold"> Nome do Produto: </span>
                                        {selectedProduct?.nameProduct}
                                    </h1>
                                    <h1 className="block gap-2 m-auto">
                                        <span className="font-bold"> Preço: </span>
                                        {selectedProduct?.price}
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
                    <div className="p-6 shadow-lg -mt-14 transition-all w-11/12 max-w-md mx-auto bg-white rounded-lg">
                        <form onSubmit={handleSubmit(onEditSubmit)} className="flex flex-col gap-6 md:gap-8 p-4 md:p-6">
                            <h2 className="text-xl font-bold text-center">Editar Produto</h2>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="nameProduct" className="block text-sm font-medium text-gray-700">
                                        Nome do Produto
                                    </label>
                                    <input
                                        type="text"
                                        id="nameProduct"
                                        {...register("nameProduct")}
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
                                        {...register("price")}
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
                                        {...register("description")}
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-end md:flex-row gap-4 md:gap-6">
                                <button
                                    type="submit"
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
