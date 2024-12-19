import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import {Menu, X} from "lucide-react";

export const BeginMenu = () => {
    const { userName } = useUser();
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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

    const buttons = [
        { label: "Vender", route: "/auth/begin", color: "green" },
        { label: "Produtos", route: "/auth/registerProduct", color: "violet" },
        { label: "Clientes", route: "/auth/RegisterClient", color: "cyan" },
        { label: "Vendidos", route: "/auth/venda", color: "zinc" },
        { label: "Estoque", route: "/auth/stock", color: "blue" },
        { label: "Sair", route: "/auth/login", color: "red" },
      ];

    return (
        <header className="bg-transparent h-20 relative px-5 font-sans flex items-center justify-between w-full">
            <h1>
                {userName && (
                    <span className="text-green-700">{`Bem-vindo, ${userName}`}</span>
                )}
            </h1>
            <div className='md:hidden'>
                <button
                onClick={()=>setIsMenuOpen(!isMenuOpen)}
                className='p-2 rounded-md text-gray-700 hover:bg-gray-700 hover:text-white transition-all'
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <nav className={`${
                isMenuOpen ? "flex" : "hidden" 
            } absolute top-20 left-0 w-full md:max-w-screen-sm mb-4 bg-white flex-col md:flex md:flex-row md:static md:bg-transparent`}
            >
                {buttons.map((button, index)=>(
                    <button 
                    key={index}
                    onClick={() => {
                        navigate(button.route)
                        setIsMenuOpen(false)
                    }} 
                    className={`w-72 md:w-[90px] text-center items-center justify-center flex hover:bg-${button.color}-700 transition-all py-3 mt-2 m-auto bg-${button.color}-600 rounded-md text-white`}>
                        {button.label}
                    </button>
                ))}
            </nav>
        </header>
    );
};
