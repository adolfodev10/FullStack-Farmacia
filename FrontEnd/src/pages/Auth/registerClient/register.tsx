import axios from 'axios';
// import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { useEffect, useState } from 'react';

type Client = {
    id: number;
    nameClient: string;
    telefone: number;
}

type ListClientProps = {
    clientes: Client[];
    onUpdate: () => void;
}

export const Register = ({ clientes, onUpdate }: ListClientProps) => {
    const [localClients, setLocalClients] = useState<Client[]>(clientes);
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
    const [editedName, setEditedName] = useState("");
    const [editedTelefone, setEditedTelefone] = useState<number | null>(null);




    useEffect(() => {
        setLocalClients(clientes);
    }, [clientes]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/clients')
            .then(response => setClients(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/clients/${id}`);
            onUpdate();
        } catch (error) {
            console.error(error);
        }
    }

    const handleSelectClient = () => {
        const selectedClient = clients.find(client => client.id === selectedClientId);
        if (selectedClient) {
            setIsClientModalOpen(false);
        } else {
            alert("Selecione um cliente válido.");
        }
    }

    // const generatePDF = () => {
    //     const today = new Date();
    //     const date = today.toLocaleDateString('pt-BR');
    //     const time = today.toLocaleTimeString('pt-BR');

    //     const doc = new jsPDF({
    //         unit: 'mm',
    //         format: 'a5'
    //     });

    //     doc.setFontSize(20);
    //     doc.text("Logo da Farmácia", 10, 10);
    //     doc.setFontSize(16);
    //     doc.text("Judy Farma", 10, 20);

    //     doc.setFontSize(14);
    //     doc.text(`Data: ${date}`, 10, 30);
    //     doc.text(`Hora: ${time}`, 10, 40);

    //     doc.setFontSize(14);
    //     doc.text("Fatura", 10, 60);

    //     (doc as any).autoTable({
    //         startY: 70,
    //         head: [['Nome']],
    //         body: localClients.map(client => [
    //             client.nameClient,
    //         ]),
    //         margin: { horizontal: 10 },
    //     });

    //     doc.output('dataurlnewwindow');
    //     setIsClientModalOpen(false);
    // }


 

    const handleEdit = (client: Client) => {
        setClientToEdit(client);
        setEditedName(client.nameClient);
        setEditedTelefone(client.telefone);
        setIsEditModalOpen(true);
    }

    const handleSaveEdit = async () => {
        if (clientToEdit) {
            try {
                await axios.put(`http://localhost:5000/api/clients/${clientToEdit.id}`, {
                    nameClient: editedName,
                    telefone: editedTelefone,
                });
                onUpdate();
                setIsEditModalOpen(false);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Nome</th>
                        <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Telefone</th>
                        <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Ações</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y items-center text-center divide-gray-200'>
                    {localClients.map(client => (
                        <tr key={client.id}>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{client.nameClient}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{client.telefone || 'Não tem telefone'}</td>
                            <td className='flex m-auto py-4 text-center justify-center items-center space-x-2'>
                                <button
                                    className='bg-yellow-500 text-white p-1 rounded-md text-sm'
                                    onClick={() => handleEdit(client)}
                                >
                                    Editar
                                </button>
                                <button
                                    type='button'
                                    className='bg-red-500 text-white p-1 rounded-md text-sm'
                                    onClick={() => handleDelete(client.id)}
                                >
                                    Eliminar
                                </button>
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
                                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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

            {/* Modal de edição */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Editar Cliente</h2>
                        <div className="mb-4">
                            <label htmlFor="editName" className="block text-sm font-medium text-gray-700">Nome</label>
                            <input
                                id="editName"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="editTelefone" className="block text-sm font-medium text-gray-700">Telefone</label>
                            <input
                                id="editTelefone"
                                type="number"
                                value={editedTelefone || ''}
                                onChange={(e) => setEditedTelefone(Number(e.target.value))}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setIsEditModalOpen(false)}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveEdit}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
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
