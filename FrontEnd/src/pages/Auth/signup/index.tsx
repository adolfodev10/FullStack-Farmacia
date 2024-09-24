import { Link, useNavigate } from "react-router-dom";
import { CitationFarma } from '@/components/tools/citation-farma';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { XCircleIcon } from "lucide-react";

type User = {
  id: number;
  name: string;
  funcao: string;
  senha: string;
};

type FormData = {
  name: string;
  funcao: string;
  senha: string;
};

export const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [users, setUsers] = useState<User[]>([]);
  const [isUserExisting, setIsUserExisting] = useState(false);
  const navigate = useNavigate();  // Importar e usar o hook useNavigate

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (data: FormData) => {
    const existingUser = users.find(user => user.name.toLowerCase() === data.name.toLowerCase());
    if (existingUser) {
      setIsUserExisting(true);
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/users", data);
      reset();
      await fetchUsers();
      setIsUserExisting(false);
      navigate("/auth/login");  // Redirecionar após o registro
    } catch (error) {
      console.error('Erro ao cadastrar', error);
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center p-6 md:p-12 bg-cover bg-center"
      style={{ backgroundImage: "url('../../src/assets/fundo.svg')" }}
    >
      <div className="flex flex-col md:flex-row justify-around m-auto w-full max-w-4xl">

        {/* Conteúdo que deve ficar no topo */}
        <div className="p-4 items-center w-full md:w-1/2 mt-8 md:mt-0 md:order-1">
          <CitationFarma />
          <p className="mb-8 text-gray-400">
            Caso já tenhas criado uma conta na nossa plataforma, averigue ou então faça login na plataforma pressionando o botão abaixo!
          </p>
          <Link to="/auth/login" className="text-[14px] m-auto">
            <button className="text-green-700 hover:scale-105 transition-all font-sans font-bold p-3 border rounded-md">
              Já tenho uma conta
            </button>
          </Link>
        </div>

        {/* Conteúdo do formulário que deve ficar na parte inferior */}
        <div className="items-center p-5 bg-gray-300 rounded-md w-full md:w-1/2 md:order-2">
          <div className="font-sans">
            <div className="p-[10px] items-center">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input
                  type="text"
                  {...register('name', { required: 'Coloque nome' })}
                  placeholder="Nome"
                  className="m-auto block p-3 w-full mt-4 box-border border-none rounded-md outline-none"
                />
                {errors.name && (
                  <h1 className="text-red-500 -mb-5 flex gap-2"><XCircleIcon className="w-4 flex items-center" /> {errors.name.message}</h1>
                )
                }
                <select
                  className="text-gray-400 m-auto block mt-4 p-3 w-full box-border border-none rounded-md outline-none cursor-pointer"
                  id="funcao"
                  {...register('funcao', { required: 'Coloque função' })}
                >
                  <option value="Farmacêutico(a)">Farmacêutico(a)</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Balconista">Balconista</option>
                  <option value="Limpeza">Limpeza</option>
                </select>
                {errors.funcao && (
                  <h1 className="text-red-500 -mb-5 flex gap-2"><XCircleIcon className="w-4 flex items-center" />{errors.funcao.message}</h1>
                )
                }
                <input
                  type="password"
                  {...register('senha', { required: 'Coloque senha' })}
                  placeholder="Senha"
                  className="m-auto block p-3 w-full mt-4 box-border border-none rounded-md outline-none"
                />
                {errors.senha && (
                  <h1 className="text-red-500 -mb-5 flex gap-2"> <XCircleIcon className="w-4 flex items-center" /> {errors.senha.message}</h1>
                )
                }
                <div className="flex flex-col w-full items-center justify-center gap-4 mt-2">
                  <button
                    type="submit"
                    className="w-full mt-4 border-none hover:scale-105 transition-all rounded-md bg-green-700 text-white cursor-pointer p-3 font-semibold"
                  >
                    Criar conta
                  </button>
                  {isUserExisting && (
                    <h1 className="text-red-500 text-center flex -mb-5 gap-2"> <XCircleIcon className="w-4 flex items-center" /> Usuário já registrado!</h1>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
