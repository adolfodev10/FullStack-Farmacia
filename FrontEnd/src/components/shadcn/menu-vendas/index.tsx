import { useUser } from "@/components/context/UserContext";
import { useNavigate } from "react-router-dom";

export const MenuVendas = () => {
    const { userName } = useUser();
    const navigate = useNavigate()

    return (
        <header className="bg-transparent h-20 relative px-5 font-sans flex items-center justify-between w-full">
            <h1>
                {userName && (
                    '' ? <span>{`Bem-vindo, ${userName}`}</span> : 'Produtos Vendidos'
                )}
            </h1>
            <div className="flex gap-5 ml-[-300px]" >
                <button onClick={() => navigate('/auth/venda')} className="w-full md-[90px] text-center justify-center flex hover:bg-zinc-700 transition-all p-2 m-auto bg-zinc-600 rounded-md text-white">Vendidos</button>
                <button onClick={() => navigate('/auth/RegisterClient')} className="w-full md-[90px] text-center justify-center flex hover:bg-cyan-700 transition-all p-2 m-auto bg-cyan-600 rounded-md text-white">Clientes</button>
                <button onClick={() => navigate('/auth/registerProduct')} className="w-full md-[90px] text-center justify-center flex hover:bg-violet-700 transition-all p-2 m-auto bg-violet-600 rounded-md text-white">Produtos</button>
                <button onClick={() => navigate('/auth/stock')} className="w-full md-[90px] text-center justify-center flex hover:bg-cyan-700 transition-all p-2 m-auto bg-blue-600 rounded-md text-white">Estoque</button>
                <button onClick={() => navigate('/auth/begin')} className="w-full md-[90px] text-center justify-center flex hover:bg-green-700 transition-all p-2 m-auto bg-green-600 rounded-md text-white">Vender</button>
                <button onClick={() => navigate('/auth/login')} className="w-full md-[90px] text-center justify-center flex hover:bg-red-800 transition-all p-2 m-auto bg-red-700 rounded-md text-white" >Sair</button>
            </div>
        </header>
    )
}