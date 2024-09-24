import { Funcionarios } from "../funcionarios";
import foto from '../../assets/Gerente.png'


export const About = () => {
  return (
    <main id="about" className="mt-5 m-7">
      {/* Seção Sobre Nós */}
      <p className="font-semibold text-3xl text-green-800">Sobre Nós</p>
      <p className="text-sm text-gray-700">Somos uma empresa confiável e de trato fácil!</p>

      {/* Seção Gerente */}
      <div className="mt-5 p-2 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="flex flex-col items-center m-auto justify-center">
            <img
              className="font-semibold w-[250px] md:w-[350px] lg:w-[450px] p-3 rounded-full"
              src={foto}
              alt="gerente"
            />
            <p className="text-xl text-gray-800 mt-2 md:mt-0 text-center">Gerente</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl font-semibold mb-4 text-[#434343] text-center md:text-left">
              Mateus E. L. Manuel
            </h1>
            <p className="text-xs md:text-sm text-gray-700 italic mb-5 text-center md:text-left">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate recusandae
              laboriosam ex cum magnam ab nesciunt iste ratione eaque in, minima vero. Dolorum iusto,
              molestiae perferendis amet minus in natus!
            </p>
            <h2 className="text-lg text-gray-700 text-center md:text-left">
              Lic. em Enfermagem
            </h2>
          </div>
        </div>
      </div>

      {/* Seção Clientes Satisfeitos */}
      <div className="mt-5 p-2">
        <p className="text-2xl text-center text-green-700 font-semibold mb-6">Clientes Satisfeitos</p>
        <div className="flex flex-col md:flex-row justify-between gap-5 items-center">
          <div className="border rounded-lg p-8 max-w-sm md:w-1/3">
            <p className="italic mb-5 text-gray-700 text-center md:text-end">
              Gostei muito de visitar a farmácia, fui bem atendido e recomendo a vistarem a mesma!
            </p>
            <span className="text-center md:text-end m-auto italic text-green-700">
              Adolfo Manuel
            </span>
          </div>

          <div className="border rounded-lg p-8 max-w-sm md:w-1/3">
            <p className="italic mb-5 text-gray-700 text-center md:text-end">
              A princípio, não gostava de ir a farmácia, porque pensava muito nos preços... até
              encontrar esta com preços acessíveis!
            </p>
            <span className="text-center md:text-end m-auto italic text-green-700">
              Nyingika Paulo
            </span>
          </div>

          <div className="border rounded-lg p-8 max-w-sm md:w-1/3">
            <p className="italic mb-5 text-gray-700 text-center md:text-end">
              Um autentico baratucho! Recomendo aos que gostam de economizar e também aos que gostam
              de bons produtos e bons serviços!
            </p>
            <span className="text-center md:text-end m-auto italic text-green-700">
              Lausio Watela
            </span>
          </div>
        </div>
      </div>

      {/* Seção Feedback */}
      <div className="mt-5 p-2">
        <p className="text-2xl text-center text-green-700 font-semibold mb-6">Feedback</p>

        <div className="flex flex-col md:flex-row justify-around gap-5 items-center">
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            <input
              className="border rounded-md p-2 mb-2 w-full"
              type="text"
              placeholder="Nome Completo"
            />
            <input
              className="border rounded-md p-2 w-full"
              type="tel"
              placeholder="Telefone"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <textarea
              className="border h-20 w-full p-2 rounded-md mb-2"
              placeholder="O que achou da farmácia?"
            />
            <button className="bg-green-700 hover:bg-green-600 transition-all hover:scale-105 p-2 w-full rounded-md text-white">
              Enviar
            </button>
          </div>
        </div>
      </div>

      {/* Seção Funcionários */}
      <Funcionarios />
    </main>
  );
};
