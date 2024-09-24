import { MottoFarma } from "../../../components/tools/motto-farma";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUser } from '../../../components/context/UserContext'; // Ajuste o caminho conforme necessário

type FormData = {
  name: string;
  senha: string;
  funcao: string;
}

export const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();
  const { setUserName } = useUser(); // Obtém a função para definir o nome do usuário
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', data);

      if (response.status === 200) {
        setUserName(data.name); // Define o nome do usuário no contexto
        navigate("/auth/begin"); // Redireciona para a página inicial ou para onde desejar
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError('Nome ou senha incorretos'); // Exibe mensagem de erro
      } else {
        setError('Erro ao processar o login'); // Exibe mensagem de erro geral
      }
    }
  }

  return (
    <div
      className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center p-6 md:p-12 bg-cover bg-center"
      style={{ backgroundImage: "url('../../src/assets/fundo.svg')" }}
    >
      <div className="flex flex-col md:flex-row justify-around m-auto w-full max-w-4xl gap-8">
        {/* Seção de informações */}
        <div className="p-4 items-center w-full md:w-1/2 flex flex-col">
          <MottoFarma />
          <p className="mb-8 text-gray-400 text-center md:text-left">
            Caso não tenhas uma conta na nossa plataforma, averigue ou então faça cadastro na plataforma pressionando o botão abaixo!
          </p>
          <Link to="/auth/signup" className="text-[14px] m-auto">
            <button className="text-green-700 hover:scale-105 transition-all font-sans font-bold p-3 border rounded-md">
              Criar conta
            </button>
          </Link>
        </div>

        {/* Formulário de login */}
        <div className="p-5 items-center bg-gray-300 rounded-md w-full md:w-1/2">
          <div className="font-sans">
            <div className="p-[10px] items-center">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input
                  type="text"
                  {...register('name', { required: 'Nome é obrigatório' })}
                  placeholder="Nome"
                  className={`block p-3 w-full mt-4 box-border border-none rounded-md outline-none ${error ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-center -mb-7">{errors.name.message}</p>
                )}
                <input
                  type="password"
                  {...register("senha", { required: "Senha é obrigatória" })}
                  placeholder="Senha"
                  className={`block p-3 w-full mt-4 box-border border-none rounded-md outline-none ${error ? 'border-red-500' : ''}`}
                />
                {errors.senha && (
                  <p className="text-red-500 text-center -mb-7">{errors.senha.message}</p>
                )}
                <div className="flex flex-col w-full items-center justify-center gap-4 mt-2">
                  <button
                    type="submit"
                    className="w-full mt-4 border-none hover:scale-105 transition-all rounded-md bg-green-700 text-white cursor-pointer p-3 font-semibold"
                  >
                    Entrar
                  </button>
                </div>
                {error && (
                  <div className="text-red-500 text-center -mb-7">{error}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
