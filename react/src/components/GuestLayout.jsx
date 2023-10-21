import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function GuestLayout() {
    const { authorized } = useStateContext();

    if (authorized) {
        return <Navigate to="/" />;
    }

    return (
        <div id="guestLayout">
            <Outlet />
        </div>
    );
}
