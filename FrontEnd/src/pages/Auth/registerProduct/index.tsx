import axios from "axios";
import { useForm } from "react-hook-form";
import { BeginMenu } from "@/components/shadcn/platform/menu";
import { useEffect, useState } from "react";
import { ProductRegister } from "./registerProduct";
 
type Product = {
    id:number;
    name: string;
    price: number;
    quantity:number;
    description: string;
};

type FormData = {
    productId:number;
    name:string;
    price:number;
    quantity:number;
    description:string;
    clientId:number;
}

export const ProductRegisterPage = () => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const [product, setProduct] = useState<Product[]>([])

    const [isModalsuccess, setModalsuccess] = useState(false)

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/registerProduct");
            setProduct(response.data);
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
            reset()
            // setModalsuccess(true)
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
            <div className="p-5 w-full flex m-auto justify-around rounded-md mt-10">
                <form onSubmit={handleSubmit(onSubmit)} className="flex shadow-lg flex-col gap-6 md:gap-8 p-4 md:p-6">
                    <div className="block md:flex-row gap-4 md:gap-6">
                        <input
                            type="text"
                            {...register('name', { required: "Nome do produto é obrigatório" })}
                            className="block m-auto bg-gray-200 p-2 w-full box-border border-none rounded-md outline-none"
                            placeholder="Nome do Produto"
                        />
                        <input
                            type="number"
                            min={0.00}
                            {...register('price', { required: "Preço é obrigatório" })}
                            className="block m-auto bg-gray-200 mt-2 p-2 w-full box-border border-none rounded-md outline-none"
                            placeholder="Preço"
                        />

                        <input
                            type="text"
                            {...register('description', { required: "Descrição é obrigatória" })}
                            className="block m-auto bg-gray-200 mt-2 p-2 w-full  box-border border-none rounded-md outline-none"
                            placeholder="Descrição"
                            />
                          <button
                        type="submit"
                        className="w-full block mt-2 m-auto p-2 border-none hover:scale-105 transition-all rounded-md bg-green-700 text-white cursor-pointer"
                        >
                        Cadastrar Produto
                    </button>
                        </div>
                </form>
                <div className="bg-white max-h-max p-4 rounded-md shadow-md" >
                    <ProductRegister products={product} onUpdate={fetchProducts} />
                </div>
                {isModalsuccess && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50" >
                       <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                        <div className="mb-8 mt-5" >
                            <h1 className="text-xl text-green-600 font-semibold text-center" >Produto registrado com sucesso!</h1>
                        </div>

                        <div className="flex justify-end space-x-2">
                        <button 
                        onClick={() => setModalsuccess(false)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 transition-all hover:bg-green-600">OK</button>
                        </div>

                       </div>
                    </div>
                )

                }
            </div>
        </>
    );
};
