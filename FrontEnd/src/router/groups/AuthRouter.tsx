import { IRouteProps } from "../../utils/types/router";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Login } from "../../pages/Auth/login";
import { SignUp } from "../../pages/Auth/signup";
import { Politic } from "../../pages/Auth/politic";
import { Profile } from "../../pages/Auth/profile";
import { BeginPage } from "@/pages/begin";
import { RegisterClients } from "@/pages/Auth/registerClient"
import { StockPage } from "@/pages/Auth/stock";
import { ProductRegisterPage } from "@/pages/Auth/registerProduct";
import List from "@/pages/Auth/list";
import { Vendas } from "@/pages/Auth/venda";


export const AuthRoutes: IRouteProps = {
    path: "/auth",
    element: AuthLayout,
    visibility: "auth",
    children: [
        {
            path: "/auth/login",
            element: Login,
            visibility: "auth",
        },
        {
            path: "/auth/signup",
            element: SignUp,
            visibility: "auth",
        },
        {
            path: "/auth/politic",
            element: Politic,
            visibility: "auth",
        },
        {
            path: "/auth/profile",
            element: Profile,
            visibility: "auth",
        },
        {
            path: "/auth/registerClient",
            element: RegisterClients,
            visibility: "auth",
        },
        {
            path: "/auth/begin",
            element: BeginPage,
            visibility: "auth",
        },
        {
            path: "/auth/stock",
            element: StockPage,
            visibility: "auth"
        },
        {
            path:"/auth/venda",
            element:Vendas,
            visibility:"auth"
        },
        {
            path: "/auth/registerProduct",
            element: ProductRegisterPage,
            visibility: "auth"
        },
        {
            path: "/auth/list",
            element: List,
            visibility: "auth",
        },
    ]
}