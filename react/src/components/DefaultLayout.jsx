import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";

export default function DefaultLayout() {
    const { authorized, setAuthorized, notification } = useStateContext();

    if (!authorized) {
        return <Navigate to="/login" />;
    }

    const onLogout = async (ev) => {
        ev.preventDefault();

        await axiosClient.post("/logout");
        setAuthorized(false);
    };

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>Header</div>

                    <div>
                        {/* {user.name} &nbsp; &nbsp; */}
                        <a onClick={onLogout} className="btn-logout" href="#">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
                {notification && (
                    <div className="notification">{notification}</div>
                )}
            </div>
        </div>
    );
}
