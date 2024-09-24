import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';

export const BeginMenu = () => {
    const { userName } = useUser();
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const href = target.getAttribute("href");

            if (href && (href === "#about" || href === "#contactos" || href === "#")) {
                event.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                    });
                }
            }
        };

        document.addEventListener("click", handleScroll);
        return () => {
            document.removeEventListener("click", handleScroll);
        };
    }, []);

    return (
        <header className="bg-transparent h-20 relative px-5 font-sans flex items-center justify-between w-full">
            <h1>
                {userName && (
                    '' ? <span className="text-green-700">{`Bem-vindo, ${userName}`}</span> : 'Vender Produto'
                )}
            </h1>
            <div className="flex gap-5 ml-[-300px]">
                <button onClick={() => navigate('/auth/registerProduct')} className='w-full text-center  md:w-[210px] items-center justify-center flex hover:bg-violet-700 transition-all p-2 m-auto bg-violet-600 rounded-md text-white' >Cadastrar produtos</button>
                <button onClick={() => navigate('/auth/RegisterClient')} className='w-full md:w-[160px] text-center items-center justify-center flex hover:bg-cyan-700 transition-all p-2 m-auto bg-cyan-600 rounded-md text-white' >Todos Clientes</button>
                <button onClick={() => navigate('/auth/venda')} className='w-full text-center  md:w-[160px] items-center justify-center flex hover:bg-zinc-700 transition-all p-2 m-auto bg-zinc-600 rounded-md text-white' >Vendidos</button>
                <button onClick={() => navigate('/auth/stock')} className='w-full text-center  md:w-[160px] items-center justify-center flex hover:bg-blue-700 transition-all p-2 m-auto bg-blue-600 rounded-md text-white' >Ver Estoque</button>
                <button onClick={() => navigate('/auth/login')} className="w-1/5  hover:bg-red-800 transition-all p-2 m-auto bg-red-700 rounded-md text-white">
                    Sair
                </button>
            </div>
        </header>
    );
};
