import * as z from "zod"


export const RegisterValidation = z.object({
    name: z.string({
        required_error: "Informe o seu nome",
        invalid_type_error: "O Nome precisa ser uma string"
    }),
    password: z.string({
        required_error: "Informe a sua senha",
        invalid_type_error: "A password precisa ser uma string"
    }),
    email: z.string({
        required_error: "Informe o seu email",
        invalid_type_error: "Email invalido!"
    }).email({
        message: "Email Invalido!"
    }),
    phoneNumber: z.string({
        required_error :"Informe o seu Número",
        invalid_type_error :"Número Inválido"
    })
})