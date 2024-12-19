import { MenuItems } from "@/utils/constants/menuItems";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const DashboardMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (evento: MouseEvent) => {
      const target = evento.target as HTMLElement;
      const href = target.getAttribute("href");

      if (href === "#about" || href === "#contactos" || href === "#") {
        evento.preventDefault();
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
      {/* Menu de Hambúrguer para Mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-green-800 focus:outline-none">
          {/* Ícone de Menu de Hambúrguer */}
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-green-800"></div>
            <div className="w-6 h-0.5 bg-green-800"></div>
            <div className="w-6 h-0.5 bg-green-800"></div>
          </div>
        </button>
      </div>

      {/* Menu */}
      <nav
        className={`w-full md:flex items-center justify-between ${isMenuOpen ? "flex bg-white relative top-[57px] p-20 w-[950px]" : "hidden"} md:flex`}
      >
        <ul className="flex flex-col relative top-7 md:flex-row items-center m-auto">
          {MenuItems.map((item) => (
            <a
              key={item.path}
              className="font-bold text-lg max-[520px]:text-sm cursor-pointer text-green-800 px-4 py-2 hover:underline hover:underline-offset-8"
              href={item.path}
            >
              {item.title}
            </a>
          ))}

          {/* Botões de Ação */}
          <div className={`flex justify-between bg-white mb-6 items-center m-auto md:flex-row gap-2 mt-4 md:mt-0 ${isMenuOpen ? "m-auto": "left-[300px] relative"}`}>
            <Link to={"/auth/signup"}>
              <button className="w-[108px] hover:bg-green-800 transition-all p-2 bg-green-700 rounded-md text-white">
                Criar conta
              </button>
            </Link>
            <Link to={"/auth/login"}>
              <button className="text-green-700 hover:bg-green-700 transition-all hover:text-white border border-green-700 p-2 rounded-md">
                Entrar
              </button>
            </Link>
          </div>
        </ul>
      </nav>
    </header>
  );
};
