import axios from "axios";
import { useEffect, useState } from "react";
import { Register } from "./register";
import { MenuClient } from "@/components/shadcn/menu-client";
import { useForm } from "react-hook-form";

type Client = {
    id: number;
    nameClient: string;
    telefone: number;
};

type FormData = {
    clientId: number;
    nameClient: string;
    telefone: number;
}



export const RegisterClients = () => {
    const [clientes, setClients] = useState<Client[]>([]);
    const { register, handleSubmit, reset } = useForm<FormData>()

    const fetchClients = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/clients");
            setClients(response.data);
            console.log(clientes)
        } catch (error) {
            console.error('Erro ao buscar clientes', error);
        }
    }

    useEffect(() => {
        fetchClients();
    }, []);

    const onSubmit = async (data: FormData) => {
        try {
            await axios.post('http://localhost:5000/api/clients', {
                ...data
            })
            reset()
            await fetchClients()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message || 'Erro ao cadastrar cliente')
            }
            else {
                console.error("Erro ao Cadastrar Cliente", error)
            }
        }
    }

    return (
        <>
            <MenuClient />
            <div className="p-5 w-full max-w-4xl mx-auto bg-gray-300 rounded-md" >
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 md:gap-8 p-4 md:p-6" >
                    <div className="block md:flex-row gap-4 md:gap-6" >
                        <input
                            {...register('nameClient', { required: 'Nome é obrigatório' })}
                            type="text"
                            placeholder="Nome"
                            className="block m-auto p-2 w-full md:w-1/2 box-border border-none rounded-md outline-none"
                        />
                        <input
                            {...register("telefone")}
                            type="tel"
                            placeholder="Telefone (Opcional)"
                            className="block m-auto mt-2 p-2 w-full md:w-1/2 box-border border-none rounded-md outline-none"
                        />
                        <button
                            type="submit"
                            className="w-full block mt-2 m-auto md:w-1/2 p-2 border-none hover:scale-105 transition-all rounded-md bg-green-700 text-white cursor-pointer"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
                <div className="bg-white mt-6 p-4 rounded-md shadow-md" >
                    <Register clientes={clientes} onUpdate={fetchClients} />
                </div>
            </div>
        </>
    );
}
