import { Outlet } from "react-router-dom"
import { DashboardMenu } from "../shadcn/dashboard/menu"
import Footer from "../shadcn/dashboard/Footer"


export const MainLayout = () =>{
    return(
        <main className="font-sans">
            <DashboardMenu />
            <section className="w-full font-sans">
              <Outlet />
            </section>
            <Footer />
        </main>
    )
}