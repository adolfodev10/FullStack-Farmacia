import * as z from "zod";

export const LoginValidation = z.object({
    name: z.string({
        required_error: "Informe o seu nome",
        invalid_type_error: "O Nome precisa ser uma String",
    }),
    password: z.string({
        required_error:"Informe a sua senha",
        invalid_type_error:"A password precisa ser uma string",
    })
})