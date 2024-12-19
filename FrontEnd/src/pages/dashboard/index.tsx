import { MenuClient } from "@/components/shadcn/menu-client"
import { Clientes } from "./clientes"
import { Homens } from "./homens"
import { Mulheres } from "./mulheres"

export const Dashboard = () => {
    return (
        <>
        <MenuClient />
        <div className="p-8 justify-around flex " >
        <div className="block border w-72 rounded-md p-8 shadow m-auto">
            <Clientes />
        </div>
        <div className="border -mt-4 p-8 shadow flex w-96 gap-3 text-center rounded-md m-auto">
            <Homens />
            <Mulheres />
        </div>
        </div>
        </>
    )
}