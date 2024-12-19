import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FC, Suspense } from "react";

import paths from "./groups";
import RouteWrapper from "./wrapper";
import { IRouteProps } from "@/utils/types/router";

const RouterWrapper = () => (

    <BrowserRouter>
        <Suspense fallback={<p>Carregando...</p>}>
            <Routes>{paths().map((path) => build(path))}</Routes>
        </Suspense>
    </BrowserRouter>

);
const build: FC<IRouteProps> = (router) => {
    if (!router.children) {
        return (
            <Route
                key={router.path}
                path={router.path}
                element={
                    <RouteWrapper
                        visibility={router.visibility}
                        element={router.element}
                    />
                }
            />
        );
    }
    return (
        <Route
            key={router.path}
            path={router.path}
            element={
                <RouteWrapper
                    visibility={router.visibility}
                    element={router.element}
                />
            }
        >
            {router.children?.map((outlet) => build(outlet))}
        </Route>
    );
};
export default RouterWrapper;