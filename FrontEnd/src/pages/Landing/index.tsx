import foto from "@/assets/people.png";
import { About } from "../about";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <main
      className="w-full justify-between overflow-hidden bg-fixed bg-white bg-cover bg-center m-auto p-5"
      style={{ backgroundImage: "url('../../src/assets/fundo.svg')" }}
    >
      {/* Container Principal */}
      <div className="mt-6 font-sans flex flex-col-reverse md:flex-row justify-around items-center">
        {/* Texto e Botão */}
        <div className="block items-center text-center md:text-left">
          <h1 className="m-7 text-2xl md:text-4xl font-semibold mb-4">
            Seja bem-vindo à sua plataforma
            <br />
            de <span className="text-green-800 font-bold">controle</span> e{" "}
            <span className="text-green-800 font-bold">suporte</span> para
            <br />a sua farmácia.
          </h1>
          <p className="text-gray-700 m-7 text-sm md:text-base">
            Aqui você vai poder gerir a sua farmácia.
            <br />
            Inovação, clareza e dinamismo, tudo em apenas uma plataforma.
            <br />
            Comece usando o sistema com apenas um clique!
          </p>
          <Link to={"/auth/login"}>
            <button className="m-7 p-2 hover:bg-green-800 w-32 md:w-40 transition-all bg-green-700 rounded-md text-white">
              Começar
            </button>
          </Link>
        </div>

        {/* Imagem */}
        <img
          src={foto}
          className="w-[250px] md:w-[450px] rounded-full m-auto max-[320px]:w-[200px] cursor-pointer transition ease-in-out hover:scale-[1.08]"
          alt="Imagem de Apresentação"
        />
      </div>

      {/* Seção "About" */}
      <About />
    </main>
  );
};
