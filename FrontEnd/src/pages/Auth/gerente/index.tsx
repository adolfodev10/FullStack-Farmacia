import foto from "../../../assets/logo.png";

export const GerentePage = () => {
  return (
    <div className="block w-[15%] justify-center gap-5 h-screen shadow-green-600 shadow m-0 top-0 box-border absolute sm:w-[90%] p-4">
      {/* Seção de Perfil */}
      <div className="text-center mb-5">
        <img
          src={foto}
          alt="Foto do Gerente"
          className="w-20 h-20 rounded-full mx-auto mb-3"
        />
        <h1 className="text-lg font-bold">Olá, Adolfo Monteiro</h1>
        <input
          type="file"
          alt="Upload de Foto"
          className="block mx-auto mt-3 p-2 bg-gray-200 rounded-lg"
        />
      </div>

      {/* Indicadores de Desempenho */}
      <div className="text-center mb-8">
        <h2 className="text-sm font-semibold">Resumo de Hoje</h2>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="bg-blue-100 p-3 rounded-lg">
            <h3 className="font-semibold text-blue-600">Vendas</h3>
            <p className="text-lg font-bold">120</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <h3 className="font-semibold text-green-600">Estoque</h3>
            <p className="text-lg font-bold">350</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg">
            <h3 className="font-semibold text-yellow-600">Medicamentos Críticos</h3>
            <p className="text-lg font-bold">5</p>
          </div>
          <div className="bg-red-100 p-3 rounded-lg">
            <h3 className="font-semibold text-red-600">Clientes Atendidos</h3>
            <p className="text-lg font-bold">75</p>
          </div>
        </div>
      </div>

      {/* Ações de Gerenciamento */}
      <div className="block justify-center gap-5">
        <button className="block m-auto text-center mt-3 p-3 w-full font-semibold text-white rounded-md bg-black transition-all">
          Meu perfil
        </button>
        <button className="block m-auto text-center mt-3 p-3 w-full font-semibold text-white rounded-md bg-blue-600 transition-all">
          Controle de Estoque
        </button>
        <button className="block m-auto text-center mt-3 p-3 w-full font-semibold text-white rounded-md bg-violet-600 transition-all">
          Gerenciamento de Produtos
        </button>
        <button className="block m-auto text-center mt-3 p-3 w-full font-semibold text-white rounded-md bg-cyan-600 transition-all">
          Clientes
        </button>
        <button className="block m-auto text-center mt-3 p-3 w-full font-semibold text-white rounded-md bg-green-700 transition-all">
          Relatórios de Vendas
        </button>
        <button className="block m-auto text-center mt-3 p-3 w-full font-semibold text-white rounded-md bg-red-700 transition-all">
          Sair
        </button>
      </div>
    </div>
  );
};
