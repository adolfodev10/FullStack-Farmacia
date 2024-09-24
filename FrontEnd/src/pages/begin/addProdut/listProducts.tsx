import axios from "axios";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import logo from '../../../assets/logo.png';

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    quantidade: number;
};

type Client = {
    id: number;
    nameClient: string;
};

type ListProductsProps = {
    products: Product[];
    onUpdate: () => void;
};

export const ListProducts = ({ products, onUpdate }: ListProductsProps) => {
    const [localProducts, setLocalProducts] = useState<Product[]>(products);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

    useEffect(() => {
        setLocalProducts(products);
    }, [products]);

    useEffect(() => {
        // Fetch clients from API
        axios.get('http://localhost:5000/api/clients')
            .then(response => setClients(response.data))
            .catch(error => console.error('Erro ao buscar clientes', error));
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            onUpdate();
        } catch (error) {
            console.error('Erro ao apagar produto', error);
        }
    };

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
        setIsClientModalOpen(true);
    };

    const handleSelectClient = () => {
        if (selectedClientId === null) {
            alert("Selecione um cliente válido.");
            return;
        }
        setIsClientModalOpen(false);
        setIsProductModalOpen(true);
    };

    const handleGenerateInvoice = () => {
        if (!selectedClientId || !selectedProduct) {
            alert("Selecione um cliente e um produto antes de gerar a fatura.");
            return;
        }
        setIsConfirmOpen(true);
    };

    const generatePDF = () => {
        if (!selectedProduct || selectedClientId === null) return;

        const today = new Date();
        const date = today.toLocaleDateString('pt-BR');
        const time = today.toLocaleTimeString('pt-BR');

        const doc = new jsPDF({
            unit: 'mm',
            format: 'a5'
        });

        doc.setFontSize(20);
        doc.addImage(logo, 15, 10, 10, 10);
        doc.setFontSize(14);
        doc.text("Judy Farma", 10, 25);

        doc.setFontSize(12);
        doc.text(`Data: ${date}`, 10, 40);
        doc.text(`Hora: ${time}`, 10, 45);
        const selectedClient = clients.find(client => client.id === selectedClientId);
        if (selectedClient) {
            doc.text(`Cliente: ${selectedClient.nameClient}`, 10, 50);
        }

        doc.setFontSize(12);
        doc.text("Fatura", 10, 60);

        (doc as any).autoTable({
            startY: 70,
            head: [['Nome', 'Preço', 'Descrição', 'Quantidade']],
            body: [
                [selectedProduct.name, selectedProduct.price.toFixed(2), selectedProduct.description, selectedProduct.quantidade]
            ],
            margin: { horizontal: 10 },
        });

        doc.output('dataurlnewwindow');
        setIsProductModalOpen(false);
    };

    const handleConfirmYes = async () => {
        if (selectedProduct && selectedClientId) {
            await updateProductStock(selectedProduct.id, selectedProduct.quantidade - 1);
            generatePDF();
            setIsConfirmOpen(false);
            onUpdate(); // Atualiza a lista de produtos após a venda
        }
    };

    const updateProductStock = async (productId: number, newQuantity: number) => {
        try {
            await axios.patch(`http://localhost:5000/api/products/${productId}`, {
                quantidade: newQuantity
            });
        } catch (error) {
            console.error('Erro ao atualizar o estoque', error);
        }
    };

    const handleConfirmNo = () => {
        setIsConfirmOpen(false);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {localProducts.map(product => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantidade}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-2">
                                    <button className="bg-yellow-500 text-white p-1 rounded-md text-sm">
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white p-1 rounded-md text-sm"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white p-1 rounded-md text-sm"
                                        onClick={() => handleSelectProduct(product)}
                                    >
                                        Gerar Fatura
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para selecionar cliente */}
            {isClientModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Selecionar Cliente</h2>
                        <div className="mb-4">
                            <label htmlFor="clientSelect" className="block text-sm font-medium text-gray-700">Selecione um Cliente</label>
                            <select
                                id="clientSelect"
                                value={selectedClientId || ''}
                                onChange={(e) => setSelectedClientId(Number(e.target.value))}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="" disabled>Escolha um cliente</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>{client.nameClient}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setIsClientModalOpen(false)}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600"
                            >
                                Fechar
                            </button>
                            <button
                                type="button"
                                onClick={handleSelectClient}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
                            >
                                Selecionar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para gerar fatura */}
            {isProductModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Gerar Fatura</h2>
                        <p className="mb-4">Produto: {selectedProduct?.name}</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setIsProductModalOpen(false)}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleGenerateInvoice}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
                            >
                                Gerar Fatura
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmação */}
            {isConfirmOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Confirmação</h2>
                        <p>Tem certeza que deseja gerar a fatura?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={handleConfirmNo}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600"
                            >
                                Não
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmYes}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
                            >
                                Sim
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
