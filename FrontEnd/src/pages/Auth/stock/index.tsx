import { MenuStock } from "@/components/shadcn/menu-stock";
import axios from "axios";
import { ArrowDownCircleIcon, ArrowUpCircleIcon, DollarSignIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { RegisterStock } from "./register";
import { useForm } from "react-hook-form";

type Product = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
};

type Venda = {
    id: number;
    nameProduct: string;
    price: number;
    description: string;
    date: string;
};

type FormData = {
    name: string;
    price: number;
    quantity: number;
    description: string;
};

export const StockPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [, setVenda] = useState<Venda[]>([]);

    const { register, handleSubmit, reset } = useForm<FormData>();
    const [totalValue, setTotalValue] = useState(0); // Total de entradas (valor em KZ)
    const [totalSaidaValue, setTotalSaidaValue] = useState(0); // Total de saídas (valor em KZ)
    const [totalOverall, setTotalOverall] = useState(0); // Total geral (valor de entradas - saídas)

    // Função para buscar produtos no backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/stock");
            setProducts(response.data);
            calculateTotals(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos', error);
        }
    };

    // Função para buscar vendas no backend
    const fetchVendas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/venda');
            setVenda(response.data);
            calculateSaidaTotals(response.data);
            calculateTotalEntrada(response.data)
        } catch (error) {
            console.error('Erro ao buscar vendas', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchVendas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Calcula o total de saídas (vendas)
    const calculateSaidaTotals = (vendas: Venda[]) => {
        const totalSaida = vendas.reduce((acc, venda) => acc + venda.price, 0);
        setTotalSaidaValue(totalSaida);
    };

    const calculateTotalEntrada = (products: Product[]) => {
        return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    };

    // Calcula os totais de entrada e saldo geral
    const calculateTotals = (products: Product[]) => {
        const totalEntrada = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
        setTotalValue(totalEntrada);
        setTotalOverall(totalEntrada + totalSaidaValue); // Saldo total
    };

    const onSubmit = async (data: FormData) => {
        const existingProduct = products.find(p => p.name === data.name);

        if (existingProduct) {
            const newQuantity = existingProduct.quantity + data.quantity; // Aumenta a quantidade em 1
            const newTotalPrice = existingProduct.price; // Mantém o preço original do produto

            try {
                await axios.put(`http://localhost:5000/api/stock/${existingProduct.id}`, {
                    quantity: newQuantity,
                    price: newTotalPrice,
                });

                const updatedProducts = products.map(p =>
                    p.id === existingProduct.id ? { ...p, quantity: newQuantity } : p
                );
                setProducts(updatedProducts);
                calculateTotals(updatedProducts);
            } catch (error) {
                console.error('Erro ao atualizar produto', error);
            }
        } else {
            try {
                await axios.post('http://localhost:5000/api/stock', {
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    quantity: data.quantity || 1, // Novo produto com quantidade 1
                });

                const newProduct = {
                    id: Date.now(), // Temporário até o backend fornecer o ID
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    quantity: data.quantity || 1
                };

                const updatedProducts = [...products, newProduct];
                setProducts(updatedProducts);
                calculateTotals(updatedProducts);

                reset(); // Limpa o formulário
            } catch (error) {
                console.error('Erro ao adicionar produto', error);
            }
        }
    };

    return (
        <>
            <MenuStock />
            <div className="p-6">
                <div className="flex m-auto justify-center gap-4">
                    <div className="bg-blue-400 p-8 w-full m-auto rounded-xl">
                        <div className="flex justify-between">
                            <h1 className="text-xl font-semibold -mb-28 -mt-5 text-blue-800">Entradas</h1>
                            <ArrowDownCircleIcon className="text-blue-800 size-11" />
                        </div>
                        <p className="text-white text-xl font-bold">{totalValue} KZ</p>
                    </div>

                    <div className="bg-red-400 p-8 w-full m-auto rounded-xl">
                        <div className="flex justify-between">
                            <h1 className="text-xl font-semibold -mb-28 -mt-5 text-red-800">Saídas</h1>
                            <ArrowUpCircleIcon className="text-red-800 size-11" />
                        </div>
                        <p className="text-white text-xl font-bold">{totalSaidaValue} KZ</p>
                    </div>

                    <div className="bg-zinc-600 p-8 w-full m-auto rounded-xl">
                        <div className="flex justify-between">
                            <h1 className="text-xl  font-semibold -mb-28 -mt-5 text-zinc-800">Total</h1>
                            <DollarSignIcon className="text-zinc-800 size-11" />
                        </div>
                        <p className="text-white text-xl font-bold">{totalOverall} KZ</p>
                    </div>
                </div>

                <div className="p-5 w-full flex m-auto justify-around gap-5 mt-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex shadow-md rounded-md flex-col gap-6 md:gap-8 p-4 md:p-6">
                        <div className="block md:flex-row gap-4 md:gap-6">
                            <h1 className="text-center text-xs">Adicionar produtos no estoque</h1>
                            <input
                                placeholder="Nome do Produto"
                                type="text"
                                {...register('name', { required: 'Nome é obrigatório' })}
                                className="block m-auto bg-gray-200 mt-2 p-2 w-full box-border border-none rounded-md outline-none"
                            />
                            <input
                                {...register("price", { required: "Preço é obrigatório" })}
                                placeholder="Preço (KZ)"
                                type="number"
                                min="0"
                                className="block m-auto bg-gray-200 mt-2 p-2 w-full box-border border-none rounded-md outline-none"
                            />
                                <input
                                {...register("quantity", { required: "Quantidade é obrigatório" })}
                                placeholder="Quantidade"
                                type="number"
                                min="1"
                                className="block m-auto bg-gray-200 mt-2 p-2 w-full box-border border-none rounded-md outline-none"
                            />
                            <input
                                {...register("description", { required: "Descrição é necessária" })}
                                placeholder="Descrição"
                                type="text"
                                className="block m-auto bg-gray-200 mt-2 p-2 w-full box-border border-none rounded-md outline-none"
                            />
                            <button
                                type="submit"
                                className="w-full block mt-2 m-auto p-2 border-none hover:scale-105 transition-all rounded-md bg-blue-400 text-white cursor-pointer"
                            >
                                Adicionar
                            </button>
                        </div>
                    </form>
                    <div className="bg-white p-4 max-h-max rounded-md shadow-md">
                        <RegisterStock products={products} onUpdate={fetchProducts} />
                    </div>
                </div>
            </div>
        </>
    );
};
