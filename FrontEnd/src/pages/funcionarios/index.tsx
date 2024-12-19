import foto1 from "../../assets/graphic.avif";
import foto2 from "../../assets/img.avif";
import foto3 from "../../assets/s.avif";
import foto4 from "../../assets/c3.jpg";

export const Funcionarios = () => {
  return (
    <>
      <div className="mt-5 p-2">
        <p className="text-2xl text-center text-green-700 font-semibold mb-6">Funcionários</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <div className="border p-6 md:p-8 rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="block">
            <img src={foto4} className="border-green-700 w-36 h-36 p-3 border rounded-full mb-3" alt="funcionario image" />
            <h1 className="text-lg text-green-950 text-center font-semibold">{"Adolfo Manuel"}</h1>
            <p className="text-xs text-gray-700 text-center">{"Farmacêutico"}</p>
          </div>
        </div>

        <div className="border p-6 md:p-8 rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="block">
            <img src={foto1} className="border-green-700 w-36 h-36 p-3 border rounded-full mb-3" alt="funcionario image" />
            <h1 className="text-lg text-green-950 text-center font-semibold">{"Nyingika Watela"}</h1>
            <p className="text-xs text-gray-700 text-center">{"Balconista"}</p>
          </div>
        </div>

        <div className="border p-6 md:p-8 rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="block">
            <img src={foto2} className="border-green-700 w-36 h-36 p-3 border rounded-full mb-3" alt="funcionario image" />
            <h1 className="text-lg text-green-950 text-center font-semibold">{"Maria João"}</h1>
            <p className="text-xs text-gray-700 text-center">{"Limpeza"}</p>
          </div>
        </div>

        <div className="border p-6 md:p-8 rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="block">
            <img src={foto3} className="border-green-700 w-36 h-36 p-3 border rounded-full mb-3" alt="funcionario image" />
            <h1 className="text-lg text-green-950 text-center font-semibold">{"Afonsina Eduardo"}</h1>
            <p className="text-xs text-gray-700 text-center">{"Limpeza"}</p>
          </div>
        </div>

        {/* Repetir cartões conforme necessário */}
        <div className="border p-6 md:p-8 rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="block">
            <img src={foto4} className="border-green-700 w-36 h-36 p-3 border rounded-full mb-3" alt="funcionario image" />
            <h1 className="text-lg text-green-950 text-center font-semibold">{"Adolfo Manuel"}</h1>
            <p className="text-xs text-gray-700 text-center">{"Farmacêutico"}</p>
          </div>
        </div>

        <div className="border p-6 md:p-8 rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="block">
            <img src={foto1} className="border-green-700 w-36 h-36 p-3 border rounded-full mb-3" alt="funcionario image" />
            <h1 className="text-lg text-green-950 text-center font-semibold">{"Nyingika Watela"}</h1>
            <p className="text-xs text-gray-700 text-center">{"Balconista"}</p>
          </div>
        </div>

        <div className="border p-6 md:p-8 rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="block">
            <img src={foto2} className="border-green-700 w-36 h-36 p-3 border rounded-full mb-3" alt="funcionario image" />
            <h1 className="text-lg text-green-950 text-center font-semibold">{"Maria João"}</h1>
            <p className="text-xs text-gray-700 text-center">{"Limpeza"}</p>
          </div>
        </div>

        <div className="border p-6 md:p-8 rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="block">
            <img src={foto3} className="border-green-700 w-36 h-36 p-3 border rounded-full mb-3" alt="funcionario image" />
            <h1 className="text-lg text-green-950 text-center font-semibold">{"Afonso Eduardo"}</h1>
            <p className="text-xs text-gray-700 text-center">{"Limpeza"}</p>
          </div>
        </div>
      </div>
    </>
  );
};
