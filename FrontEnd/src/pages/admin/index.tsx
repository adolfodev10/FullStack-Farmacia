import { CitationChefe } from "@/components/tools/citation-chefe";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Admin = () => {
    const [dados, setDados] = useState<{name:string; password:string}>({name:"", password:""})
    const navigate = useNavigate()

    const handleLoginAdmin = (event: React.FormEvent) => {
        event.preventDefault()

        if(!dados.name || !dados.password){
            toast.error("Preencha toods os campos!")
        }
        else if(dados.name && dados.password){
            navigate("/")
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setDados(prev => ({...prev, [name]:value}) )
    }
    return (
        <div className="w-full justify-between animate-fadeIn items-center p-[30px] " style={{backgroundImage:"url('../../src/assets/fundo.svg')"}}>
        <div className="flex justify-around m-auto w-full">
        <div className="p-[10px] items-center w-[66vh] flex flex-col">
                    <CitationChefe />
                    <p className="mb-8 text-gray-400">
                        Caso não tenhas uma conta na nossa plataforma, averigue ou então faça cadastro na plataforma pressionando o botão abaixo!
                    </p>
                    <Link to="/auth/signup" className="text-[14px] m-auto">
                    <button className="text-green-700 hover:scale-105 transition-all font-sans font-bold p-3 border rounded-md">Criar conta</button>
                    </Link>
            </div>
            <div className="p-5 items-center bg-gray-300 rounded-md">
                <div className="font-sans">
                <div className="p-[10px] items-center">
                    <form className="flex flex-col gap-2">
                        <input
                            type="text"
                            name="name"
                            value={dados.name}
                            onChange={handleChange}
                            placeholder="Nome"
                            className="m-auto block p-[10px] w-[95%] mt-[15px] mb-[8px] box-border border-none rounded-md outline-none"
                        />

                        <input
                            type="password"
                            name="password"
                            value={dados.password}
                            onChange={handleChange}
                            placeholder="Senha"
                            className="m-auto block p-[10px] w-[95%] mt-[15px] mb-[8px] box-border border-none rounded-md outline-none"
                        />
                        <div className="flex flex-col w-[100%] items-center justify-center gap-4 mt-2">
                            <button type="submit" onClick={handleLoginAdmin} className="w-[95%] mt-[5px] border-none hover:scale-105 transition-all rounded-[4px] bg-green-700 text-white  cursor-pointer m-auto p-[10px] font-[600]">
                                Entrar
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
          
        </div>
    </div>
    )
}