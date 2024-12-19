import { ReactNode } from "react";

export const Paper = ({
    children
}: {children:ReactNode}) =>{
    return(
        <section className="w-[700px] bg-white shadow mt-8 ml-[-250px] rounded-lg p-4 min-w-[500px]">
            {children}
        </section>
    )
}