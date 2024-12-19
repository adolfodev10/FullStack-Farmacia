import { FC } from "react";

type IRouteProps = {
    path: string;
    element: FC;
    visibility: "public" | "private" | "auth";
    children?: IRouteProps[];
};

type IRouteWrapperProps = {
    visibility: "public" | "private" | "auth";
    element: FC
}
export type IFunctionProps = {
    funcao: "Farmacêutico(a)" | "Gerente" | "Balconista" | "Limpeza"
}