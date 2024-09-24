import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
};

export const StockPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState(0);
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductQuantity, setNewProductQuantity] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [valueTotal, setValueTotal] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:5000/api/stock')
            .then(response => {
                setProducts(response.data);
                calculateTotals(response.data);
            })
            .catch(error => console.error('Erro ao buscar produtos', error));
    }, []);

    const calculateTotals = (products: Product[]) => {
        const TotalDeEntrada = products.reduce((acc) => acc + 1, 0);
        const productCount = products.length;
        const valueTotal = products.reduce((acc, product) => acc + (product.price), 0);

        setTotalQuantity(TotalDeEntrada);
        setProductCount(productCount);
        setValueTotal(valueTotal);
    };

    const handleAddOrUpdateProduct = async () => {
        const product = products.find(p => p.name === newProductName);
        if (product) {
            // Atualizar produto existente
            const newTotalQuantity = totalQuantity + 1;
            const newTotalPrice = product.price + (newProductPrice * newProductQuantity); // Atualiza o preço

            try {
                await axios.put(`http://localhost:5000/api/stock/${product.id}`, {
                    quantidade: newTotalQuantity,
                    price: newTotalPrice,
                });
                const updatedProducts = products.map(p =>
                    p.id === product.id ? { ...p, quantidade: newTotalQuantity, price: newTotalPrice } : p
                );
                setProducts(updatedProducts);
                calculateTotals(updatedProducts);
            } catch (error) {
                console.error('Erro ao atualizar produto', error);
            }
        } else {
            // Adicionar novo produto
            try {
                await axios.post('http://localhost:5000/api/stock', {
                    name: newProductName,
                    price: newProductPrice,
                    description: newProductDescription,
                    quantidade: newProductQuantity
                });
                const newProduct = {
                    id: Date.now(), // Temporário, idealmente o id seria retornado pelo backend
                    name: newProductName,
                    quantidade: newProductQuantity,
                    price: newProductPrice,
                    description: newProductDescription
                };
                const updatedProducts = [...products, newProduct];
                setProducts(updatedProducts);
                calculateTotals(updatedProducts);
                // Limpar campos após adição
                setNewProductName('');
                setNewProductPrice(0);
                setNewProductDescription('');
                setNewProductQuantity(0);
            } catch (error) {
                console.error('Erro ao adicionar produto', error);
            }
        }
    };

    const handleRemoveProduct = async (productId: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/stock/${productId}`);
            const updatedProducts = products.filter(p => p.id !== productId);
            setProducts(updatedProducts);
            calculateTotals(updatedProducts);
        } catch (error) {
            console.error('Erro ao remover produto', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Página de Estoque</h1>

            {/* Formulário de Adição e Retirada de Produtos */}
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                <h2 className="text-lg font-semibold mb-4">Adicionar ou Atualizar Produto</h2>
                <div className="mb-4">
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                    <input
                        id="productName"
                        type="text"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Preço (KZ)</label>
                    <input
                        id="productPrice"
                        type="number"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(Number(e.target.value))}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Descrição</label>
                    <input
                        id="productDescription"
                        type="text"
                        value={newProductDescription}
                        onChange={(e) => setNewProductDescription(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleAddOrUpdateProduct}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
                >
                    Adicionar/Atualizar
                </button>
            </div>

            {/* Exibição dos Produtos em Estoque */}
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                <h2 className="text-lg font-semibold mb-4">Produtos em Estoque</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço (KZ)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price.toFixed(2)} KZ</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveProduct(product.id)}
                                        className="bg-red-500 text-white p-1 rounded-md text-sm"
                                    >
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Resumo do Estoque */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Resumo do Estoque</h2>
                <div className="text-sm font-medium text-gray-900">Total de Produtos Cadastrados: {productCount}</div>
                <div className="text-sm font-medium text-gray-900">Total de Quantidade em Estoque: {totalQuantity}</div>
                <div className="text-sm font-medium text-gray-900">Valor Total do Estoque: KZ {valueTotal.toFixed(2)}</div>
            </div>
        </div>
    );
};
