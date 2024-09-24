import axios from "axios";
import { useForm } from "react-hook-form";
import { BeginMenu } from "@/components/shadcn/platform/menu";
import { useEffect, useState } from "react";
 
type Product = {
    id:number;
    nameProduct: string;
    price: number;
    description: string;
};

type FormData = {
    productId:number;
    nameProduct:string;
    price:number;
    description:string;
    clientId:number;
}

export const ProductRegisterPage = () => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const [product, setProduct] = useState<Product[]>([])

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/registerProduct");
            setProduct(response.data);
            console.group(product)
        } catch (error) {
            console.error('Erro ao listar produtos',error)
        }
    }

    useEffect(() => {
        fetchProducts()
    },[])
 

    const onSubmit = async (data: FormData) => {
        try {
            await axios.post("http://localhost:5000/api/registerProduct",{
                ...data
            })
            alert("Produto cadastrado com sucesso!");
            reset()
            await fetchProducts()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message || 'Erro ao cadastrar produto');
            } else {
                console.error('Erro ao cadastrar produto', error);
            }
    }
}

    return (
        <>
        <BeginMenu />
            <h1 className="text-center text-xl items-center font-semibold mt-8" >Cadastrar Produto</h1>
            <div className="flex m-auto px-10 py-2 max-w-3xl  bg-gray-50 items-center mt-4 justify-around gap-2">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 md:gap-8 p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <input
                            type="text"
                            {...register('nameProduct', { required: "Nome do produto é obrigatório" })}
                            className="block bg-gray-200 p-2 w-full md:w-1/2 box-border border-none rounded-md outline-none"
                            placeholder="Nome do Produto"
                        />
                        <input
                            type="number"
                            step="0.01"
                            {...register('price', { required: "Preço é obrigatório" })}
                            className="block bg-gray-200 p-2 w-full md:w-1/2 box-border border-none rounded-md outline-none"
                            placeholder="Preço"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <input
                            type="text"
                            {...register('description', { required: "Descrição é obrigatória" })}
                            className="block bg-gray-200 p-2 w-full md:w-1/2 box-border border-none rounded-md outline-none"
                            placeholder="Descrição"
                        />
                          <button
                        type="submit"
                        className="w-full md:w-1/2 p-2 border-none hover:scale-105 transition-all rounded-md bg-green-700 text-white cursor-pointer"
                    >
                        Cadastrar Produto
                    </button>
                    </div>
                </form>
            </div>
        </>
    );
};
