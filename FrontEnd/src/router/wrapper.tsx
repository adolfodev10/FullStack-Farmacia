import { IRouteWrapperProps } from "@/utils/types/router";
import { Navigate, useLocation } from "react-router-dom";


const RouteWrapper = ({
    element: Element, visibility
}: IRouteWrapperProps) => {
    const token = false;

    const location: any = useLocation();

    const from = location.state?.from?.pathname || "/";

    if (!token && visibility === "private") {
        return <Navigate
            to="/auth/login"
            state={{ from: location }} />
    }
    if (token && visibility === "auth") {
        return <Navigate to={from} replace />
    }
    return <Element />
};
export default RouteWrapper;