import { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export const MenuClient = () => {
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
                ) }
            </h1>
            <div className="flex gap-5 ml-[-300px]">
                <button onClick={() => navigate('/auth/RegisterClient')} className='w-full text-center md:w-[90px] items-center justify-center flex hover:bg-cyan-700 transition-all p-2 m-auto bg-cyan-600 rounded-md text-white' >Clientes</button>
                <button onClick={() => navigate('/auth/registerProduct')} className='w-full md:w-[90px] text-center items-center justify-center flex hover:bg-violet-700 transition-all p-2 m-auto bg-violet-600 rounded-md text-white ' >Produtos</button>
                <button onClick={() => navigate('/auth/venda')} className='w-full text-center  md:w-[90px] items-center justify-center flex hover:bg-zinc-700 transition-all p-2 m-auto bg-zinc-600 rounded-md text-white'>Vendidos</button>
                <button onClick={() => navigate('/auth/stock')} className='w-full text-center md:w-[90px] items-center justify-center flex hover:bg-cyan-700 transition-all p-2 m-auto bg-blue-600 rounded-md text-white' >Estoque</button>
                <button onClick={() => navigate('/auth/begin')} className="w-full text-center md:w-[90px] hover:bg-green-800 transition-all p-2 m-auto bg-green-700 rounded-md text-white">Vender</button>
                <button onClick={() => navigate('/auth/login')} className="w-full md:w-[90px] hover:bg-red-800 transition-all p-2 m-auto flex bg-red-700 items-center justify-center rounded-md text-white">Sair</button>
            </div>
        </header>
    );
};
