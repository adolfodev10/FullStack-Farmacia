import { Outlet } from "react-router-dom"
import { MenuHeader } from "../tools/menu-header"
import { ScreenBackground } from "../tools/screen-background"



export const AuthLayout = () =>{
    return(
        <main className="relative">
            <div>
                <ScreenBackground />
            </div>

            <div className="relative z-10">
                <MenuHeader />
            </div>

            <div>
                <Outlet />
            </div>
        </main>
    )
}