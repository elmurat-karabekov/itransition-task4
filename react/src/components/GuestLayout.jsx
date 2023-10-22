import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function GuestLayout() {
    const { auth } = useStateContext();

    if (auth) {
        return <Navigate to="/" />;
    }

    return (
        <div id="guestLayout">
            <Outlet />
        </div>
    );
}
