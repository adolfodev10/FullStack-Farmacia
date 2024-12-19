import { AuthFinish } from "../../../components/tools/auth-finish"
import { MottoFarma } from "../../../components/tools/motto-farma"


export const Profile = () => {
    return(
        <>
             <div className="flex flex-col justify-center items-center m-auto h-[100%]">
                <label className="flex flex-col items-center justify-center mb-8" >
                    <p className="font-normal text-[#262525] text-[20px]" >Seja bem-vindo a PAYWALL</p>
                    <MottoFarma/>
                </label>
                <AuthFinish LineOne1="EMAIL VERIFICADO COM SUCESSO!"
                         LineThree="ACESSAR A PLATAFORMA"/>
             </div>
        </>
    )
}