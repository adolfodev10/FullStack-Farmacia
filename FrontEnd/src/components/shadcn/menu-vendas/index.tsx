import { useUser } from "@/components/context/UserContext";
import { useNavigate } from "react-router-dom";

export const MenuVendas = () => {
    const {userName} = useUser();
    const navigate = useNavigate()


    const handleModalExit = () => {
        alert("Não podes ainda sair")
    }
    return (
        <header className="bg-transparent h-20 relative px-5 font-sans flex items-center justify-between w-full">
            <h1>
                {userName && (
                    '' ? <span>{`Bem-vindo, ${userName}`}</span> : 'Produtos Vendidos'
                ) }
            </h1>

            <div className="flex gap-5 ml-[-300px]" >
                <button onClick={() => navigate('/auth/stock')} className="w-full text-center justify-center flex hover:bg-cyan-700 transition-all p-2 m-auto bg-blue-600 rounded-md text-white">Ver estoque</button>
                <button onClick={() => navigate('/auth/begin')} className="w-1/2 gap-2 flex hover:bg-green-700 transition-all p-2 m-auto bg-green-600 rounded-md text-white">Vender</button>
                <button onClick={() => handleModalExit()} >Sair</button>
            </div>
        </header>
    )
}