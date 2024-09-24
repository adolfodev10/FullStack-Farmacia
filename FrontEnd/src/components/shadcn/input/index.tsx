import { IInputProps } from "./types"
import { Controller } from "react-hook-form"

export const Input = ({
    label,
    error,
    mandatory,
    name,
    control,
    type,
    ...rest
} : IInputProps) =>{
    return(
     <div className="w-full" >
     {label && <label 
     htmlFor="nome"
     className="block ml-[40px] rounded-lg p-1  text-gray-800 font-semibold">{label}{mandatory && <span></span>}
     </label>}
        
        <Controller
        control={control}
        name={name}
        render={({field:{onChange, onBlur, value, ref} })=>(
            type === "file" ? (
                <div className="w-full" >
                    <label className="block rounded-lg p-1 text-gray-400 w-full border-2 border-dashed border-neutral-200" htmlFor={name}>Carregue aqui uma foto</label>
                <input
                className="m-auto block mt-[15px] p-[10px] w-[95%] border-none rounded-[5px] outline-none"
                onChange={onChange}
                id={name}
                onBlur={onBlur}
                 type="file"
                 value={value || ""}
                 ref={ref}
                 {...rest} />
                </div>
            ) : <input
            className="m-auto block mt-[15px] p-[10px] w-[95%] mb-[8px] box-border border-none rounded-[5px] outline-none"
            onChange={onChange}
            onBlur={onBlur}
            type={type} 
            value={value || ""}
            ref={ref}
            {...rest} 
            />
        )}
         />
         
         {error &&
         <p className="text-red-700">{error}</p>
         }
     </div>

    )
}